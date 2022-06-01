// Octokit.js
// https://github.com/octokit/core.js#readme

exports.pullRequest = function(auth_token, user, repo, library, ver){
  const { Octokit } = require('@octokit/core');
  const octokit = new Octokit({
    auth: auth_token
  })

  let res = null
  async function test(){
    res = await octokit.request('POST /repos/'+user+'/'+repo+'/pulls', {
      owner: user,
      repo: repo,
      title: 'Library Version Update',
      body:  'library-'+library+' version updated to '+ver,
      head: user+':update',
      base: 'main'
    })
  }

  test()
    .then(() => {
      return res.data.html_url
    })
    .catch((error) =>{
      console.log(error)
    })
}

