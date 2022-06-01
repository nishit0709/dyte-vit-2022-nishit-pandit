const yargs = require('yargs/yargs')

const {verifyFile, verifyLink} = require('./JS/verifyVersion')

const argv = yargs(process.argv.slice(2))
.scriptName('cvers')
    .example( 
        'cvers -l [repo] -t Axios -v 0.23.1',
        'Checks the particular repository if the version of Axios is greater than or equal to 0.23.1'
    )
    .example(
        "cvers -i file.csv -t Axios -v 0.23.1",
        "Checks the github repositories in file.csv"
    )
    .usage("$0 -t [tool] -v [ver]', 'Check version of libraries in remote repositories") 
    .options({
        t:{
            alias: 'tool',
            type: 'string',
            describe: 'The name of the microservice',
            demandOption: "Name of tool is required",
            nargs: 1
        },
        v:{
            alias: 'ver',
            type: 'string',
            describe: 'The version of the microservice',
            demandOption: "The tool version is required",
            nargs: 1
        },
        l:{
            alias: 'link',
            type:'string',
            describe:'The github repository to be checked'
        },
        f:{
            alias: 'csv-file',
            type: 'string',
            describe: 'The .csv file containing the list of github repos',
            
        },
        u:{
            alias: 'update',
            type: 'string',
            describe: 'Create a PR request if lower version found'
        }
            
    })
    .describe("help", "Show help")
    .describe("version", "Show version number")
    .argv

console.log(argv)


if(argv.l)
    verifyLink(argv.link, argv.tool, argv.ver)
else if(argv.f)
    verifyFile(argv.csvFile, argv.tool, argv.ver)
else if(argv.u){
    
} else
    console.log("Please enter a valid command")