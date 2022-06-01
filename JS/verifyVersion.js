exports.verifyFile = function (csv_file, tool, version, branch){
    const data = []
    const fs = require('fs')
    const csv = require('fast-csv')
    const fetch = require('node-fetch')
    const semver = require('semver')
    const chalk = require("chalk")
    fs.createReadStream(csv_file)
        .pipe(csv.parse({headers: true}))
        .on('error', error => console.log(error))
        .on('data', row => data.push(row))
        .on('end', () =>{
            data.forEach(repo => {
                let url =  "https://raw.githubusercontent.com/" + (repo.repo).slice(20).trim() + '/' + branch + "/package.json"
                fetch( url)
                .then(response => response.json())
                .then(result => {
                    rVersion = (result.dependencies[tool]).slice(1)
                    if(semver.gte(rVersion, version))
                        console.log(chalk.green("✓ " + rVersion + " - " + repo.name))
                    else
                        console.log(chalk.red("✘ " + rVersion + " - " + repo.name))
                                
                })
            });
        })
}

exports.verifyLink = function (link, tool, version, branch){
    const fetch = require('node-fetch')
    const semver = require('semver')
    const chalk = require("chalk")
    let name = link.slice(19)
    let url =  "https://raw.githubusercontent.com/" + link.slice(19).trim() + '/' + branch +"/package.json"
    fetch( url)
    .then(response => response.json())
    .then(result => {
        rVersion = (result.dependencies[tool]).slice(1)
        if(semver.gte(rVersion, version))
            console.log(chalk.green("✓ " + rVersion + " - " + name))
        else
            console.log(chalk.red("✘ " + rVersion + " - " + name))
                    
    })
}