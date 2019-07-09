const { getColorCodes } = require('./getColorCodes')

// async/await can be used.
it('works with async/await', async () => {
  expect.assertions(1)
  const colorCodes = await getColorCodes()
  expect(colorCodes).toBe('g,g,r,g,g,g,g,g,r,g,g,')
})
