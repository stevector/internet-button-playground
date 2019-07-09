'use strict'

const graphqlGot = require('graphql-got')
const query = require('./query.js')
// const util = require('util')
const repos = require('./repos.js')
const config = require('./config.json')

const getGitHubResponse = async (searchString, githubToken) => {
  const githubResponse = await graphqlGot('https://api.github.com/graphql', { 'query': query, variables: { 'searchstring': searchString }, 'token': githubToken })
  console.log(JSON.stringify(githubResponse.body) )
  return githubResponse
}

const simplifyRepoStatuses = (githubResponseBody) => {
  const simplifiedRepoStatuses = {}
  githubResponseBody.search.edges.forEach(function (edge) {
    simplifiedRepoStatuses[edge.node.nameWithOwner] = edge.node.defaultBranchRef.target.status.state
  })
  return simplifiedRepoStatuses
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

const getColorCodes = async () => {
  const searchString = repos.map(repoSlug => 'repo:' + repoSlug).join(' ')
  const githubToken = config.GITHUB_TOKEN
  const githubResponse = await getGitHubResponse(searchString, githubToken)
  // The response from GitHub is deeply nested. Boil down
  // to key/values.
  const simplifiedRepoStatuses = simplifyRepoStatuses(githubResponse.body)
  return convertStatusesToColorList(simplifiedRepoStatuses)
}
module.exports.simplifyRepoStatuses = simplifyRepoStatuses
module.exports.getColorCodes = getColorCodes
