import esbuild  from 'esbuild'
import chalk from 'chalk'
import http  from 'http'
import { WebSocketServer, WebSocket } from "ws";
import fs  from 'fs'
import path  from 'path'
import detect from 'detect-port';
import { setEnv, transfile } from './plugins.js'

const watchDir = 'src';
const outDir = 'build';
const serverPort = 8000;
const wsPort = 3000;

const onRequest = (args) => {
  const { remoteAddress, remoteHost, method, path, status, timeInMS } = args;
  console.log(`${remoteAddress} (${remoteHost}) - "${method} ${path}" ${(status === 404 || status === 500) ? chalk.red(status) : chalk.green(status)} [${timeInMS}ms]`);
}

let lastBuildError = null; // save last build status 
let wss = null 

// set web socket server 
detect(wsPort).then(async _port => { // detect if port is available first 
  if (_port === wsPort) {
      wss = new WebSocketServer({ port: wsPort });
    } else {
      wss = new WebSocketServer({ port: _port });
    }
})

// send message to clients
function broadcast(message) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// copy html file to build folder 
esbuild
    .build({
        entryPoints: ['public/index.html'],
        outfile: 'build/index.html',
        loader: { '.html': 'copy' }
    })
    .then(() => console.log('⚡ Bundle build complete ⚡'))
    .catch(e => {
        console.log('❌Failed to bundle ❌')
        console.log(e)
        process.exit(1)
    })

const onBuildEnd = async result => {
    await transfile(path.join(outDir, 'bundle.js')) // transfile bundle.js whenever source code changes and build again
    console.log('Done... transfile into ES5')

    let errors = [];
    let warnings = [];

    if (result.errors.length) {  // format error message
      console.error('Build failed:', result.errors);
      errors = await esbuild.formatMessages(result.errors, {
        kind: 'error',
        color: true,
        terminalWidth: 100,
      });
    }

    if (result.warnings.length) { // format warning message
      console.warn('Build warnings:', result.warnings);
      warnings = await esbuild.formatMessages(result.warnings, {
        kind: 'warning',
        color: true,
        terminalWidth: 100,
      });
    }
    lastBuildError = JSON.stringify({ type: 'error', errors: errors.concat(warnings) });
    broadcast(lastBuildError); // send error message to client via web socket 

    if (!result.errors.length && !result.warnings.length) {
      console.log('Build succeeded:');
      lastBuildError = null
      broadcast(JSON.stringify({ type: 'reload' }));
    }
  }

// ESBuild configuration
const ctx = await esbuild.context({
  entryPoints: [path.join(watchDir, 'index.js')],
  bundle: true, 
  minify: false,
  outfile: path.join(outDir, 'bundle.js'),
  loader: { '.js': 'jsx', '.png': 'file', '.jpg': 'file', '.svg': 'file'},
  format: 'cjs',
  sourcemap: true,
  logLevel: 'info',
  define: setEnv(),
  plugins: [
    {
        name: 'restart',
        setup(build){ // whenever build ends 
            build.onEnd(onBuildEnd)
        }
    },
  ]
})

// send the current build status whenever connection established with client
wss.on('connection', (ws) => {
    if (lastBuildError) {
      ws.send(lastBuildError);
    }
  });

await ctx.watch()

// set HTTP Server 
detect(serverPort, (err, port) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  const httpServer = http.createServer((req, res) => {
    // upgrade http server into web socket server 
    if (req.url === '/ws' && req.headers.upgrade) {
      wss.handleUpgrade(req, req.socket, Buffer.alloc(0), ws => {
        wss.emit('connection', ws, req);
      });
    } else {
      // 정적 파일 제공
      const filePath = path.join(outDir, req.url === '/' ? 'index.html' : req.url);
      fs.readFile(filePath, (err, data) => {
        if (err) {
          // send index.html when requested file dose not exist 
          fs.readFile(path.join(outDir, 'index.html'), (error, indexData) => {
            if (error) { // index.html does not exist 
              res.writeHead(404);
              res.end('Not Found');
            } else { // No error while reading index.html 
              res.writeHead(200, { 'Content-Type': 'text/html' });
              res.end(indexData);
            }
          });
        } else { // requested file exists 
          const ext = path.extname(filePath);
          const mimeTypes = {
            '.html': 'text/html',
            '.js': 'application/javascript',
            '.css': 'text/css',
            '.svg': 'image/svg+xml',
            // add another mime types if needed 
          };
          res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
          res.end(data);
        }
      });
    }
    // onRequest 콜백 호출
    const remoteAddress = req.socket.remoteAddress; 
    const { method, url } = req;
    const status = res.statusCode;
    const startTime = Date.now();
    
    if (remoteAddress === '::1' || remoteAddress === '127.0.0.1') { // in case of local IP address 
      const remoteHost = 'localhost';
      res.on('finish', () => {
        const timeInMS = Date.now() - startTime;
        onRequest({ remoteAddress, remoteHost, method, path: url, status, timeInMS });
      });
    } 
  });
  
  httpServer.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
})


