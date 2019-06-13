const graphqlGot = require('graphql-got');
const util = require('util');







const repos = [
    "stevector/nerdologues-d8",
    "stevector/stevector-composer",
    "stevector/migrate_pantheon",
    "pantheon-systems/terminus-build-tools-plugin",
    "pantheon-systems/circleci-orbs",
    "pantheon-systems/pantheon_advanced_page_cache",
    "pantheon-systems/pantheon-advanced-page-cache",
    "pantheon-systems/example-drops-8-composer",
    "pantheon-systems/example-wordpress-composer",
    "pantheon-systems/drops-8",
    "pantheon-systems/WordPress",
  ];

  const search_string = repos.map(repoSlug => "repo:" + repoSlug).join(' ');
  console.log(search_string);

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
  
graphqlGot('https://api.github.com/graphql', {"query": query, variables: {"searchstring": search_string}, "token": process.env.GITHUB_TOKEN}).then(response => {
    //console.log(util.inspect(response.body.search.edges, {showHidden: false, depth: null}))
    const simplified = {}
    response.body.search.edges.forEach(function (edge) {
        simplified[edge.node.nameWithOwner] = edge.node.defaultBranchRef.target.status.state;
      });
      console.table(simplified);
});