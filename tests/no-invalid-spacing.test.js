// tests/no-invalid-spacing.test.js

const rule = require('../lib/rules/no-invalid-spacing');
const { RuleTester } = require('eslint');

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
});

ruleTester.run('no-invalid-spacing', rule, {
  valid: [
    {
      code: '<div className="mx-2 p-4" />',
    },
    {
      code: '<span className="gap-8" />',
    },
    {
      code: '<section className="p-0 m-64" />',
    },
  ],

  invalid: [
    {
      code: '<div className="mx-3 p-4" />',
      errors: [{ messageId: 'invalidSpacing', data: { className: 'mx-3' } }],
    },
    {
      code: '<div className="gap-10" />',
      errors: [{ messageId: 'invalidSpacing', data: { className: 'gap-10' } }],
    },
    {
      code: '<div className="p-15 mx-2" />',
      errors: [{ messageId: 'invalidSpacing', data: { className: 'p-15' } }],
    },
  ],
});
