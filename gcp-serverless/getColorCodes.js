'use strict'

const graphqlGot = require('graphql-got')
const query = require('./query.js')
// const util = require('util')
const repos = require('./repos.js')
const config = require('./config.json')

// console.log(searchString);


const getGitHubResponse = async (searchString, githubToken) => {
  const githubResponse = await graphqlGot('https://api.github.com/graphql', { 'query': query, variables: { 'searchstring': searchString }, 'token': githubToken })
  return githubResponse
}

const simplifyRepoStatus = (githubResponse) => {
  const simplifiedRepoStatuses = {}
  githubResponse.body.search.edges.forEach(function (edge) {
    simplifiedRepoStatuses[edge.node.nameWithOwner] = edge.node.defaultBranchRef.target.status.state
  })
  return simplifiedRepoStatuses;
}

const convertStatusesToColorList = (simplifiedRepoStatuses) => {
  const sortedRepoStatuses = {}
  const sortedColorCodes = []
  repos.forEach(function (repo) {
    // console.log(repo)
    var status = simplifiedRepoStatuses[repo]
    // console.log(status)
    sortedRepoStatuses[repo] = status
    var colorCode = 'w'
    if (status === 'SUCCESS') {
      colorCode = 'g'
    } else if (status === 'FAILURE') {
      colorCode = 'r'
    }
    sortedColorCodes.push(colorCode)
  })
  const colorList = sortedColorCodes.join(',') + ','
  return colorList
}


module.exports = async () => {
  const searchString = repos.map(repoSlug => 'repo:' + repoSlug).join(' ')
  const githubToken = config.GITHUB_TOKEN
  const githubResponse = await getGitHubResponse(searchString, githubToken)
  // The response from GitHub is deeply nested. Boil down
  // to key/values.
  const simplifiedRepoStatuses = simplifyRepoStatus(githubResponse)
  return convertStatusesToColorList(simplifiedRepoStatuses)
}
