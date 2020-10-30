module.exports = {
  extends: ['eslint:recommended', 'prettier'], // extending recommended config and config derived from eslint-config-prettier
  plugins: ['prettier'], // extending recommended config and config derived from eslint-config-prettier
  env: {
    browser: true,
    node: true,
    amd: true,
    es6: true,
    commonjs: true,
    jest: true,
  },
  parser: 'babel-eslint',
  rules: {
    'prettier/prettier': [
      // customizing prettier rules (unfortunately not many of them are customizable)
      'error',
      {
        singleQuote: true,
        tabWidth: 2,
      },
    ],
    eqeqeq: ['error', 'always'], // adding some custom ESLint rules
  },
};
