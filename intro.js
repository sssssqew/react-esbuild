// const chalk = require('chalk') // use v4 
module.exports = function displayIntro(chalk){
console.log(chalk.yellow(`
    ______                                                       _______            _
   |  ___ \\                                                     |  _____|          | |                    _     _         _
   | |   \\ |                                                    | |                | |                   |_|   | |       | |
   | |___/ /    ___       ____       ___     __                 | |_____    ____   | |____     _    _     _    | |       | |
   |  __  |   /  __ \\    / __ \\     / ___\\ __| |__      _____   |  _____| /  ___\\  |  ____ \\  | |  | |   | |   | |    ___| |
   | |  \\ \\  | |___\\ |  | /  | |   | |     |__  __|    |_____|  | |      |  |___   | |    \\ \\ | |  | |   | |   | |  / ___  |
   | |   \\ \\ \\  ____ /  | \\__|  \\  | |___     | |__             | |______ \\___  |  | |___ / / | |__/  \\  | |   | | | |___| |
   |_|    \\_\\ \\____|     \\___ /\\_\\  \\____|    |____|            |________||____/   |______ /   \\____/\\_\\ |_|   |_|  \\_____/
                   
`))
}