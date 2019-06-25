'use strict'

const config = require('./config.json')
const graphqlGot = require('graphql-got')
const query = require('./query.js')
// const util = require('util')
const repos = require('./repos.js')

const searchString = repos.map(repoSlug => 'repo:' + repoSlug).join(' ')
// console.log(searchString);

module.exports = async () => {
  const githubResponse = await graphqlGot('https://api.github.com/graphql', { 'query': query, variables: { 'searchstring': searchString }, 'token': config.GITHUB_TOKEN })
  // console.log(util.inspect(response.body.search.edges, {showHidden: false, depth: null}))
  const simplifiedRepoStatuses = {}
  const sortedRepoStatuses = {}
  const sortedColorCodes = []
  githubResponse.body.search.edges.forEach(function (edge) {
    simplifiedRepoStatuses[edge.node.nameWithOwner] = edge.node.defaultBranchRef.target.status.state
  })
  // console.table(simplifiedRepoStatuses);

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
  // console.table(sortedRepoStatuses)
  // console.table(sortedColorCodes)
  // console.log(colorList)
  return colorList
}
