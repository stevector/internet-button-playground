const graphqlGot = require('graphql-got');
const util = require('util');

const query = `{
    organization(login: "nasa") {
      name
      url
    }
  }`;


const query2 = `
  query {
   
    search(query: "stevector/stevector-composer", type: REPOSITORY, first: 100) {
      edges {
        node {
         ... on Repository {
           name,
           url,
           ... RepoStatus
         }
       }
      }
    }
}
fragment RepoStatus on Repository  {
  name,
  defaultBranchRef {
    name,
    target {
      ... on Commit {
        id,
        messageBody,
        author {
          avatarUrl
          date
          email
          name
        },
        ... CommitStatus
      }
    }
  }
}
fragment CommitStatus on Commit {
  status {
    state,
    contexts {
      ... StatusContextInfo
    }
  }
}
fragment StatusContextInfo on StatusContext {
  state,
  context,
  createdAt,
  targetUrl
}   
  `
  
graphqlGot('https://api.github.com/graphql', {"query": query2, "token": process.env.GITHUB_TOKEN}).then(response => {
   // console.log(response.body);
    console.log(util.inspect(response.body, {showHidden: false, depth: null}))
	/*
	{
		unicorn: {
			id: 0,
			name: 'Foo Bar'
		}
	}
	*/
});