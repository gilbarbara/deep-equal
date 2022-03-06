import equal from '../src';

describe('regex', () => {
  test.each([
    {
      description: 'equal RegExp objects',
      value1: /foo/,
      value2: /foo/,
      expected: true,
    },
    {
      description: 'not equal RegExp objects (different pattern)',
      value1: /foo/,
      value2: /bar/,
      expected: false,
    },
    {
      description: 'not equal RegExp objects (different flags)',
      value1: /foo/,
      value2: /foo/i,
      expected: false,
    },
    {
      description: 'RegExp and string are not equal',
      value1: /foo/,
      value2: 'foo',
      expected: false,
    },
    {
      description: 'RegExp and object are not equal',
      value1: /foo/,
      value2: {},
      expected: false,
    },
  ])('$description', ({ expected, value1, value2 }) => {
    expect(equal(value1, value2)).toBe(expected);
  });
});
