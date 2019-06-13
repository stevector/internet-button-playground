const graphqlGot = require('graphql-got');
const util = require('util');

const query = `
  query {
   
    search(query: "repo:stevector/stevector-composer repo:stevector/nerdologues-d8 repo:stevector/migrate_pantheon", type: REPOSITORY, first: 100) {
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
  
graphqlGot('https://api.github.com/graphql', {"query": query, "token": process.env.GITHUB_TOKEN}).then(response => {
    //console.log(util.inspect(response.body.search.edges, {showHidden: false, depth: null}))
    const simplified = {}
    response.body.search.edges.forEach(function (edge) {
        simplified[edge.node.nameWithOwner] = edge.node.defaultBranchRef.target.status.state;
      });
      console.table(simplified);
});