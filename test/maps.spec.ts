import equal from '../src';

function map(object: any) {
  const a = new Map();

  // eslint-disable-next-line guard-for-in
  for (const key in object) {
    a.set(key, object[key]);
  }

  return a;
}

function myMap(object: any) {
  return map(object);
}

describe('maps', () => {
  test.each([
    {
      description: 'empty maps are equal',
      value1: new Map(),
      value2: new Map(),
      expected: true,
    },
    {
      description: 'equal maps (same key "order")',
      value1: map({ a: 1, b: '2' }),
      value2: map({ a: 1, b: '2' }),
      expected: true,
    },
    {
      description: 'equal maps (different key "order")',
      value1: map({ a: 1, b: '2' }),
      value2: map({ b: '2', a: 1 }),
      expected: true,
    },
    {
      description: 'equal maps (different key "order" - instances of the same subclass)',
      value1: myMap({ a: 1, b: '2' }),
      value2: myMap({ b: '2', a: 1 }),
      expected: true,
    },
    {
      description: 'not equal maps (extra key)',
      value1: map({ a: 1, b: '2' }),
      value2: map({ a: 1, b: '2', c: [] }),
      expected: false,
    },
    {
      description: 'not equal maps (different key value)',
      value1: map({ a: 1, b: '2', c: 3 }),
      value2: map({ a: 1, b: '2', c: 4 }),
      expected: false,
    },
    {
      description: 'not equal maps (different keys)',
      value1: map({ a: 1, b: '2', c: 3 }),
      value2: map({ a: 1, b: '2', d: 3 }),
      expected: false,
    },
    {
      description: 'equal maps (same sub-keys)',
      value1: map({ a: [map({ b: 'c' })] }),
      value2: map({ a: [map({ b: 'c' })] }),
      expected: true,
    },
    {
      description: 'not equal maps (different sub-key value)',
      value1: map({ a: [map({ b: 'c' })] }),
      value2: map({ a: [map({ b: 'd' })] }),
      expected: false,
    },
    {
      description: 'not equal maps (different sub-key)',
      value1: map({ a: [map({ b: 'c' })] }),
      value2: map({ a: [map({ c: 'c' })] }),
      expected: false,
    },
    {
      description: 'empty map and empty object are not equal',
      value1: {},
      value2: new Map(),
      expected: false,
    },
    {
      description: 'map with extra undefined key is not equal #1',
      value1: map({}),
      value2: map({ foo: undefined }),
      expected: false,
    },
    {
      description: 'map with extra undefined key is not equal #2',
      value1: map({ foo: undefined }),
      value2: map({}),
      expected: false,
    },
    {
      description: 'maps with extra undefined keys are not equal #3',
      value1: map({ foo: undefined }),
      value2: map({ bar: undefined }),
      expected: false,
    },
    {
      description: 'null and empty map are not equal',
      value1: null,
      value2: new Map(),
      expected: false,
    },
    {
      description: 'undefined and empty map are not equal',
      value1: undefined,
      value2: new Map(),
      expected: false,
    },
    {
      description: 'map and a pseudo map are not equal',
      value1: map({}),
      value2: {
        constructor: Map,
        size: 0,
        has: () => true,
        get: () => 1,
      },
      expected: false,
    },
  ])('$description', ({ expected, value1, value2 }) => {
    expect(equal(value1, value2)).toBe(expected);
  });
});
