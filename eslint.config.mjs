import config from '@gilbarbara/eslint-config';
import testingLibrary from '@gilbarbara/eslint-config/testing-library';
import vitest from '@gilbarbara/eslint-config/vitest';

export default [
  ...config,
  ...vitest,
  ...testingLibrary,
  {
    files: ['**/?(*.)+(spec|test).[jt]s?(x)'],
    rules: {
      'no-console': 'off',
    },
  },
];
