import opn from 'opn'
import yargs from 'yargs'
import readline from 'readline'
import fs from 'fs'

const checkTime = (args, links) => {
  const now = new Date()
  if (now.getHours() === args.hour && now.getMinutes() === args.minute) {
    openLink()
  } else {
    setTimeout(() => { checkTime(args, links) }, 1000 * 60)
  }
}

const openLink = (links) => {
  const num = Math.floor(Math.random() * links.length)
  opn(links[num]).catch(err => {
    console.log(err)
  })
}
const main = () => {
  const args = yargs
    .usage('Usage: -h <hour (military format)> -m [minutes] -f <path to file with list of links')
    .option('h', { alias: 'hour', describe: 'Hour in military format', type: 'number', demandOption: true })
    .option('m', { alias: 'minute', describe: 'Minutes', type: 'number' })
    .option('f', { alias: 'file', describe: 'Text file with list of youtube video links to randomly play from', type: 'string', demandOption: true })
    .argv

  if (!args.minute) {
    args.minute = 0
  }
  if (!fs.existsSync(args.file)) {
    console.log('Invalid file path. Exiting...')
    process.exit(1)
  }
  if (args.hour < 0 || args.hour >= 24 || args.minute < 0 || args.minute >= 60) {
    console.log('Invalid arguments. Exiting...')
    process.exit(1)
  }

  const readInterface = readline.createInterface({
    input: fs.createReadStream(args.file),
    output: null,
    console: false
  })

  const links = []

  readInterface.on('line', line => {
    if (line) {
      links.push(line)
    }
  })
  readInterface.on('close', () => { checkTime(args, links) })
}
export default main
