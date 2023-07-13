const fs = require('fs')
const chalk = require('chalk')

global.owner = ['62895622182398'] // ganti nomor wa lu
global.bugrup = ['62895622182398'] // ganti nomor wa lu
global.packname = 'SOHEH OFFICIAL' 
global.author = 'YT : SOHEH OFFICIAL'

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.yellowBright(`Update File Terbaru ${__filename}`))
delete require.cache[file]
require(file)
})

// SILAHKAN SETTING SESUAI PERINTAH //