import * as esbuild from 'esbuild'

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
        loader: { '.js': 'jsx',  '.png': 'file', '.jpg': 'file', '.svg': 'file'},
        format: 'cjs',
        define: {
            'process.env.REACT_APP_BASE_URL': '"set-your-environment-variable"'
        },
        sourcemap: true
    })
    .then(async (ctx) => {
        console.log('⚡ Bundle build complete ⚡')
        await ctx.watch().then(() => console.log('watching...'))
        await ctx.serve({ servedir: 'build' }).then(() => console.log('serve at http://127.0.0.1:8000/'))
    })
    .catch(e => {
        console.log('❌Failed to bundle ❌')
        console.log(e)
        process.exit(1)
    })