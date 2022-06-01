exports.createPr = function(){
    const data = []
    const fs = require('fs')
    const csv = require('fast-csv')
    const fetch = require('node-fetch')
    const semver = require('semver')
    const chalk = require("chalk")
    const git = require('simple-git')
    fs.createReadStream(csv_file, pat)
        .pipe(csv.parse({headers: true}))
        .on('error', error => console.log(error))
        .on('data', row => data.push(row))
        .on('end', () =>{
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
                            .addRemote('origin', 'https://'+pat+"@github.com"+(repo.name).trim()+".git")
                            .clone("https://github.com/dyte-in/react-sample-app", './temp')
                            .then(() => {
                                git
                                    .clone("https://github.com/dyte-in/react-sample-app", './test')
                                    .then(() => console.log("finished"))
                                    .catch((err)=>console.log)

                                let deps = fs.readFileSync("./test/package.json", "utf-8")
                                deps = JSON.parse(deps)
                                deps.dependencies.axios = "^" + "0.26.1"
                                deps = JSON.stringify(deps, null, 2)
                                try {
                                    fs.writeFileSync("./test/package.json", deps, 'utf-8')
                                } catch (error) {
                                    console.log(error)
                                }
                            })
                            .then(() => {
                                git
                                    .commit("library-chalk version changed to 4.4.0")
                                    .push('origin', 'main', () =>{
                                        console.log("Push Sucessful")
                                    })
                                const execSync = require('child_process').execSync;
                                let origin =  "https://" + pat + "@github.com/" + (repo.name).trim + ".git/"
                                let command = "cd temp; git remote set-url origin " + origin + "; git request-pull origin main:repo-update"
                                code = execSync(command);
                            })
                            .catch((err)=>console.log)
                    }
                                
                })
            });
        })
}
