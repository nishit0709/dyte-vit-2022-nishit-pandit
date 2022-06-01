exports.createPr = function(csv_file, tool, version, branch){
    const data = []
    const fs = require('fs')
    const csv = require('fast-csv')
    const fetch = require('node-fetch')
    const semver = require('semver')
    const chalk = require("chalk")
    const git = require('simple-git')
    const pullRequest = require('./pullReq')
    const readLine = require('prompt-sync')()
    fs.createReadStream(csv_file)
        .pipe(csv.parse({headers: true}))
        .on('error', error => console.log(error))
        .on('data', row => data.push(row))
        .on('end', () =>{
            var id = readLine("Enter your GitHub ID: ")
            var token = readLine("Enter your Personal-Access-Token: ")
            data.forEach(repo => {
                let url =  "https://raw.githubusercontent.com/" + (repo.repo).slice(20).trim() + "/main/package.json"
                fetch( url)
                .then(response => response.json())
                .then(result => {
                    rVersion = (result.dependencies[tool]).slice(1)
                    if(semver.gte(rVersion, version))
                        console.log(chalk.green("✓ " + rVersion + " - " + repo.name))
                    else{
                       git
                        .clone("https://github.com/nishit0709/SDK-Tool", './temp')
                        .then(() => {
                            let data = fs.readFileSync("./temp/package.json", "utf-8")
                            data = JSON.parse(data)
                            console.log(data.dependencies.chalk)
                            data.dependencies.chalk = "^" + "4.4.0"
                            data = JSON.stringify(data, null, 2)
                            try {
                                fs.writeFileSync("./temp/package.json", data, 'utf-8')
                            } catch (error) {
                                console.log(error)
                            }

                            git
                            .addRemote('https://'+token+'github.com/'+id,repo.name+'.git/')
                            .add("./package.json")
                            .commit(tool+" version changed to" +version)
                            .push('origin', 'main', () =>{
                                let link = pullRequest(token, user, repo.name, tool, version)
                                console.log(chalk.yellow("✘ " + rVersion + " - " + repo.name +' - '+ link))
                            })
                        })
                    }              
                })
            });
        })
}
