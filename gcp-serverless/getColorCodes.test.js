const { getColorCodes, simplifyRepoStatuses, convertStatusesToColorList } = require('./getColorCodes')
const repos = require('./repos.js')

const sampleGitHubResponseBody = { 'search': { 'edges': [{ 'node': { 'nameWithOwner': 'pantheon-systems/WordPress', 'defaultBranchRef': { 'target': { 'status': { 'state': 'SUCCESS' } } } } }, { 'node': { 'nameWithOwner': 'pantheon-systems/drops-8', 'defaultBranchRef': { 'target': { 'status': { 'state': 'SUCCESS' } } } } }, { 'node': { 'nameWithOwner': 'pantheon-systems/example-drops-8-composer', 'defaultBranchRef': { 'target': { 'status': { 'state': 'SUCCESS' } } } } }, { 'node': { 'nameWithOwner': 'pantheon-systems/example-wordpress-composer', 'defaultBranchRef': { 'target': { 'status': { 'state': 'FAILURE' } } } } }, { 'node': { 'nameWithOwner': 'pantheon-systems/terminus-build-tools-plugin', 'defaultBranchRef': { 'target': { 'status': { 'state': 'SUCCESS' } } } } }, { 'node': { 'nameWithOwner': 'pantheon-systems/pantheon-advanced-page-cache', 'defaultBranchRef': { 'target': { 'status': { 'state': 'SUCCESS' } } } } }, { 'node': { 'nameWithOwner': 'stevector/nerdologues-d8', 'defaultBranchRef': { 'target': { 'status': { 'state': 'SUCCESS' } } } } }, { 'node': { 'nameWithOwner': 'stevector/migrate_pantheon', 'defaultBranchRef': { 'target': { 'status': { 'state': 'FAILURE' } } } } }, { 'node': { 'nameWithOwner': 'pantheon-systems/pantheon_advanced_page_cache', 'defaultBranchRef': { 'target': { 'status': { 'state': 'SUCCESS' } } } } }, { 'node': { 'nameWithOwner': 'stevector/stevector-composer', 'defaultBranchRef': { 'target': { 'status': { 'state': 'SUCCESS' } } } } }, { 'node': { 'nameWithOwner': 'pantheon-systems/circleci-orb', 'defaultBranchRef': { 'target': { 'status': { 'state': 'SUCCESS' } } } } }] } }

const expectedSampleSimplifiedStatuses = { 'pantheon-systems/WordPress': 'SUCCESS', 'pantheon-systems/drops-8': 'SUCCESS', 'pantheon-systems/example-drops-8-composer': 'SUCCESS', 'pantheon-systems/example-wordpress-composer': 'FAILURE', 'pantheon-systems/terminus-build-tools-plugin': 'SUCCESS', 'pantheon-systems/pantheon-advanced-page-cache': 'SUCCESS', 'stevector/nerdologues-d8': 'SUCCESS', 'stevector/migrate_pantheon': 'FAILURE', 'pantheon-systems/pantheon_advanced_page_cache': 'SUCCESS', 'stevector/stevector-composer': 'SUCCESS', 'pantheon-systems/circleci-orb': 'SUCCESS' }

it('converts a github response body into simplified status', async () => {
  expect.assertions(1)
  const simplifiedRepoStatuses = simplifyRepoStatuses(sampleGitHubResponseBody)
  // console.log(simplifiedRepoStatuses)
  // console.table(simplifiedRepoStatuses)
  // console.table(expectedSampleSimplifiedStatuses)
  expect(JSON.stringify(simplifiedRepoStatuses)).toBe(JSON.stringify(expectedSampleSimplifiedStatuses))
})

it('converts a status list to a color list', async () => {
  expect.assertions(1)
  const colorList = convertStatusesToColorList(expectedSampleSimplifiedStatuses, repos)
  expect(colorList).toBe('g,g,r,g,g,g,g,g,r,g,g,')
})
