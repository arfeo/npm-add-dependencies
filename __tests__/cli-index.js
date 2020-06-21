const argv = require('../__mocks__/argv');

test('test argv mock', () => {
  expect(argv(['--arg1', 'value1'])).toEqual(['--arg1', 'value1']);
});
