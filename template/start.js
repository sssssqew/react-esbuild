import * as esbuild from 'esbuild'
import detect from 'detect-port'

const port = 8000

// html 
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

// js, css, files 
esbuild
    .context({
        entryPoints: ['src/index.js'],
        bundle: true, 
        minify: true,
        outfile: 'build/bundle.js',
        loader: { '.js': 'jsx',  '.css': 'local-css', '.png': 'file', '.jpg': 'file', '.svg': 'file'},
        format: 'cjs',
        define: {
            'process.env.REACT_APP_BASE_URL': '"set-your-environment-variable"'
        },
        sourcemap: true
    })
    .then(async (ctx) => {
        console.log('⚡ Bundle build complete ⚡')
        await ctx.watch().then(() => console.log('watching...'))
        
        detect(port).then(async _port => { // detect if port is available first 
            if (port == _port) {
                console.log(`port: ${port} was not occupied`)
                await ctx.serve({ servedir: 'build' }).then(() => console.log(`serve at http://127.0.0.1:${port}/`))
              } else {
                console.log(`port: ${port} was occupied, try port: ${_port}`)
                await ctx.serve({ servedir: 'build', port: _port }).then(() => console.log(`serve at http://127.0.0.1:${_port}/`))
              }
        })
    })
    .catch(e => {
        console.log('❌Failed to bundle ❌')
        console.log(e)
        process.exit(1)
    })