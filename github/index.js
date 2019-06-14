const graphqlGot = require('graphql-got');
// const util = require('util');

const repos = [
    "stevector/nerdologues-d8",
    "stevector/stevector-composer",
    "stevector/migrate_pantheon",
    "pantheon-systems/terminus-build-tools-plugin",
    "pantheon-systems/circleci-orb",
    "pantheon-systems/pantheon_advanced_page_cache",
    "pantheon-systems/pantheon-advanced-page-cache",
    "pantheon-systems/example-drops-8-composer",
    "pantheon-systems/example-wordpress-composer",
    "pantheon-systems/drops-8",
    "pantheon-systems/WordPress",
  ];

  const search_string = repos.map(repoSlug => "repo:" + repoSlug).join(' ');
  //console.log(search_string);

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
    const simplified_repo_statuses = {}
    const sorted_repo_statuses = {};
    const sorted_color_codes = [];
    response.body.search.edges.forEach(function (edge) {
      simplified_repo_statuses[edge.node.nameWithOwner] = edge.node.defaultBranchRef.target.status.state;
    });
    console.table(simplified_repo_statuses);

    repos.forEach(function(repo) {
      var status = simplified_repo_statuses[repo];
      sorted_repo_statuses[repo] = status;
      if (status === 'SUCCESS') {
        var color_code = 'g';
      }
      else if (status === 'FAILURE') {
        var color_code = 'r';
      }
      // white as fallback.
      else {
        var color_code = 'w';
      }
      sorted_color_codes.push(color_code);
    });

    console.table(sorted_repo_statuses);
    console.table(sorted_color_codes);
});
