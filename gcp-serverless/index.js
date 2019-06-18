'use strict'

const graphqlGot = require('graphql-got')
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

const search_string = repos.map(repoSlug => 'repo:' + repoSlug).join(' ')
// console.log(search_string);

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

exports.http = (request, response) => {
  graphqlGot('https://api.github.com/graphql', { 'query': query, variables: { 'searchstring': search_string }, 'token': process.env.GITHUB_TOKEN }).then(github_response => {
    // console.log(util.inspect(response.body.search.edges, {showHidden: false, depth: null}))
    const simplified_repo_statuses = {}
    const sorted_repo_statuses = {}
    const sorted_color_codes = []
    github_response.body.search.edges.forEach(function (edge) {
      simplified_repo_statuses[edge.node.nameWithOwner] = edge.node.defaultBranchRef.target.status.state
    })
    // console.table(simplified_repo_statuses);

    repos.forEach(function (repo) {
      // console.log(repo)
      var status = simplified_repo_statuses[repo]
      // console.log(status)
      sorted_repo_statuses[repo] = status
      if (status === 'SUCCESS') {
        var color_code = 'g'
      } else if (status === 'FAILURE') {
        var color_code = 'r'
      }
      // white as fallback.
      else {
        var color_code = 'w'
      }
      sorted_color_codes.push(color_code)
    })

    const color_list = sorted_color_codes.join(',')
    // conso le.table(sorted_repo_statuses);
    // console.table(sorted_color_codes);
    response.status(200).send(color_list)
  })
}

exports.event = (event, callback) => {
  callback()
}
