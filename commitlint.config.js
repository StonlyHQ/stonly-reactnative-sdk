module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'stonly-header': [2, 'always'],
    'header-max-length': [2, 'always', 140],
    'body-max-line-length': [2, 'always', 140],
  },
  plugins: [
    {
      rules: {
        // Same rule as .githooks/commit-msg: a Jira ticket after the scope; version bumps are exempt.
        'stonly-header': ({ header }) => {
          const isValid =
            /^[a-z]+\([^)]+\): \[STON-\d+\] .+/.test(header) ||
            /^chore\(release\): .+/.test(header);
          return [
            isValid,
            'Commit message must be: type(scope): [STON-1234] message (bumps: chore(release): message)',
          ];
        },
      },
    },
  ],
};
