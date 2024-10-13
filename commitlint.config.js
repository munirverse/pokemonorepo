module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-line-length': [2, 'always', 200], // Increase the body line length to 200
  },
};
