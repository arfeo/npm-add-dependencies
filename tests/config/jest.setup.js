beforeEach(() => {
  console.log = jest.fn();
  process.exit = jest.fn();
  console.error = jest.fn();
  console.warn = jest.fn();
});

afterEach(() => {
  console.log = jest.fn();
  process.exit = jest.fn();
  console.error = jest.fn();
  console.warn = jest.fn();
});
