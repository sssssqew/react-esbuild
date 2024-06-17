#!/usr/bin/env node

const fs = require("fs")
var fse = require('fs-extra')
const path = require("path")
const chalk = require('chalk') // use v4 
const displayIntro = require('./intro')

const src = path.join(__dirname, "template")
const dir = process.argv[2]

function createProject(){
  if (!dir){
    console.error(chalk.red("Please enter project name, run: npx react-esbuild [project-name]"))
    return
  }

  const dest = path.join(process.cwd(), dir)

  if (fs.existsSync(dest)){
    console.error(chalk.red("Directory exists, please choose another name"))
    return
  }

  console.log(chalk.yellow(`\nCreating new project in ${dest} ...`))
  console.log('This might take a couple of milliseconds.')
  console.time('[Build time]')

  fs.mkdirSync(dest, { recursive: true }) // create destination folder 

  fse.copy(src, dest, function (err) { // copy files in template folder 
    if (err) {
      console.error(chalk.red("Error occured in the middle of copying project."), err)
      return
    } else {
      fs.writeFileSync(path.join(dest, '.gitignore'), `node_modules\nbuild\n.env`) // create .gitignore file 

      console.timeEnd('[Build time]')

      displayIntro(chalk)
      console.log(chalk.green("\nDone..."), chalk.yellow("enjoy coding with react & esbuild !"))
      console.log(chalk.green("\nPlease follow this instrunction to start your project: "))
      console.log(`
        - First, type commands bellow.

        ${chalk.yellow("cd") + " [project-name]"}
        Move to new project folder.

        ${chalk.yellow("npm install")} or ${chalk.yellow("bun install (recommended)")}
        Install packages for this project.

        - Then you can choose one of two options.
        
        ${chalk.yellow("npm run start-js")} or ${chalk.yellow("bun run start-js (recommended)")}
        Starts the development server.

        ${chalk.yellow("npm run build-js")} or ${chalk.yellow("bun run build-js (recommended)")}
        Bundles the app into static files for production.

        ${chalk.yellow("npm run test")} or ${chalk.yellow("bun run test (recommended)")}
        Tests the app during your development.
      `)
    }
  })
}

createProject() 


