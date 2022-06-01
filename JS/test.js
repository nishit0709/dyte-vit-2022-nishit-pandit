const git = require('simple-git')()
// git
//     .clone("https://github.com/nishit0709/SDK-Tool", './temp')
//     .then(() => console.log("finished"))
//     .catch((err)=>console.log)


// const fs = require('fs')
// let data = fs.readFileSync("./temp/package.json", "utf-8")
// data = JSON.parse(data)
// console.log(data.dependencies.chalk)
// data.dependencies.chalk = "^" + "4.4.0"
// data = JSON.stringify(data, null, 2)
// try {
//     fs.writeFileSync("./temp/package.json", data, 'utf-8')
// } catch (error) {
//     console.log(error)
// }

git
    .add("./*")
    .commit("library-chalk version changed to 4.4.0")
    .push('origin', 'master', () =>{
        console.log("Push Sucessful")
    })