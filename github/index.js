const graphqlGot = require('graphql-got');

const query = `{
    organization(login: "nasa") {
      name
      url
    }
  }`;

graphqlGot('https://api.github.com/graphql', {"query": query, "token": process.env.GITHUB_TOKEN}).then(response => {
	console.log(response.body);
	/*
	{
		unicorn: {
			id: 0,
			name: 'Foo Bar'
		}
	}
	*/
});