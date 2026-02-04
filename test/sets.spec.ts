import equal from '../src';

const emptyObject = {};

function set(array: any[]) {
  const a = new Set();

  for (const value of array) {
    a.add(value);
  }

  return a;
}

describe('sets', () => {
  it.each([
    {
      description: 'empty sets are equal',
      value1: new Set(),
      value2: new Set(),
      expected: true,
    },
    {
      description: 'equal sets (same value "order")',
      value1: set(['a', 'b']),
      value2: set(['a', 'b']),
      expected: true,
    },
    {
      description: 'equal sets (different value "order")',
      value1: set(['a', 'b']),
      value2: set(['b', 'a']),
      expected: true,
    },
    {
      description: 'not equal sets (extra value)',
      value1: set(['a', 'b']),
      value2: set(['a', 'b', 'c']),
      expected: false,
    },
    {
      description: 'not equal sets (different values)',
      value1: set(['a', 'b', 'c']),
      value2: set(['a', 'b', 'd']),
      expected: false,
    },
    {
      description: 'not equal sets (different instances of objects)',
      value1: set(['a', {}]),
      value2: set(['a', {}]),
      expected: false,
    },
    {
      description: 'equal sets (same instances of objects)',
      value1: set(['a', emptyObject]),
      value2: set(['a', emptyObject]),
      expected: true,
    },
    {
      description: 'empty set and empty object are not equal',
      value1: {},
      value2: new Set(),
      expected: false,
    },
    {
      description: 'empty set and empty array are not equal',
      value1: [],
      value2: new Set(),
      expected: false,
    },
    {
      description: 'set with extra undefined value is not equal #1',
      value1: set([]),
      value2: set([undefined]),
      expected: false,
    },
    {
      description: 'set with extra undefined value is not equal #2',
      value1: set([undefined]),
      value2: set([]),
      expected: false,
    },
    {
      description: 'set and pseudo set are not equal',
      value1: new Set(),
      value2: {
        constructor: Set,
        size: 0,
        has: () => true,
      },
      expected: false,
    },
  ])('$description', ({ expected, value1, value2 }) => {
    expect(equal(value1, value2)).toBe(expected);
  });
});
