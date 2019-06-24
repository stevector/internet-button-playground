'use strict'

// const { exec } = require('child_process');
var exec = require('child_process').exec
const config = require('./config.json')
const graphqlGot = require('graphql-got')
const got = require('got')
// const util = require('util');

const repos = [
  'stevector/nerdologues-d8',
  'stevector/stevector-composer',
  'stevector/migrate_pantheon',
  'pantheon-systems/terminus-build-tools-plugin',
  'pantheon-systems/circleci-orb',
  'pantheon-systems/pantheon_advanced_page_cache',
  'pantheon-systems/pantheon-advanced-page-cache',
  'pantheon-systems/example-drops-8-composer',
  'pantheon-systems/example-wordpress-composer',
  'pantheon-systems/drops-8',
  'pantheon-systems/WordPress'
]

const searchString = repos.map(repoSlug => 'repo:' + repoSlug).join(' ')
// console.log(searchString);

const query = `
query DashboardQuery($searchstring: String!) {
    search(query: $searchstring, type: REPOSITORY, first: 100) {
      edges {
        node {
         ... on Repository {
           nameWithOwner,
           ... RepoStatus
         }
       }
      }
    }
}
fragment RepoStatus on Repository  {
  defaultBranchRef {
    target {
      ... on Commit {
        status {
            state
          }
      }
    }
  }
}
  `

exports.callparticle = (request, response) => {
  graphqlGot('https://api.github.com/graphql', { 'query': query, variables: { 'searchstring': searchString }, 'token': config.GITHUB_TOKEN }).then(githubResponse => {
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

    const colorList = sortedColorCodes.join(',')
    // conso le.table(sortedRepoStatuses);
    // console.table(sortedColorCodes);
    //exec();

    exec("curl https://api.particle.io/v1/devices/" + config.BALANCE1_ID + "/circleCi -d arg='"  + colorList + "' -d access_token=" + config.PARTICLE_TOKEN);


      
      // got.post("https://api.particle.io/v1/devices/" + config.BALANCE1_ID + "/circleCi",{
      //   body: {
      //     arg: colorList,
      //     access_token: config.PARTICLE_TOKEN
      //   }
      // })
      
      





    response.status(200).send(colorList)
  })
}

exports.event = (event, callback) => {
  callback()
}
