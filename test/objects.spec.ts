import equal from '../src';

describe('objects', () => {
  test.each<any>([
    {
      description: 'empty objects are equal',
      value1: {},
      value2: {},
      expected: true,
    },
    {
      description: 'equal objects (same properties "order")',
      value1: { a: 1, b: '2' },
      value2: { a: 1, b: '2' },
      expected: true,
    },
    {
      description: 'equal objects (different properties "order")',
      value1: { a: 1, b: '2' },
      value2: { b: '2', a: 1 },
      expected: true,
    },
    {
      description: 'not equal objects (extra property)',
      value1: { a: 1, b: '2' },
      value2: { a: 1, b: '2', c: [] },
      expected: false,
    },
    {
      description: 'not equal objects (different property values)',
      value1: { a: 1, b: '2', c: 3 },
      value2: { a: 1, b: '2', c: 4 },
      expected: false,
    },
    {
      description: 'not equal objects (different properties)',
      value1: { a: 1, b: '2', c: 3 },
      value2: { a: 1, b: '2', d: 3 },
      expected: false,
    },
    {
      description: 'equal objects (same sub-properties)',
      value1: { a: [{ b: 'c' }] },
      value2: { a: [{ b: 'c' }] },
      expected: true,
    },
    {
      description: 'not equal objects (different sub-property value)',
      value1: { a: [{ b: 'c' }] },
      value2: { a: [{ b: 'd' }] },
      expected: false,
    },
    {
      description: 'not equal objects (different sub-property)',
      value1: { a: [{ b: 'c' }] },
      value2: { a: [{ c: 'c' }] },
      expected: false,
    },
    {
      description: 'empty array and empty object are not equal',
      value1: {},
      value2: [],
      expected: false,
    },
    {
      description: 'object with extra undefined properties are not equal #1',
      value1: {},
      value2: { foo: undefined },
      expected: false,
    },
    {
      description: 'object with extra undefined properties are not equal #2',
      value1: { foo: undefined },
      value2: {},
      expected: false,
    },
    {
      description: 'object with extra undefined properties are not equal #3',
      value1: { foo: undefined },
      value2: { bar: undefined },
      expected: false,
    },
    {
      description: 'nulls are equal',
      value1: null,
      value2: null,
      expected: true,
    },
    {
      description: 'null and undefined are not equal',
      value1: null,
      value2: undefined,
      expected: false,
    },
    {
      description: 'null and empty object are not equal',
      value1: null,
      value2: {},
      expected: false,
    },
    {
      description: 'undefined and empty object are not equal',
      value1: undefined,
      value2: {},
      expected: false,
    },
    {
      description: 'objects with different `toString` functions returning same values are equal',
      value1: { toString: () => 'Hello world!' },
      value2: { toString: () => 'Hello world!' },
      expected: true,
    },
    {
      description: 'objects with `toString` functions returning different values are not equal',
      value1: { toString: () => 'Hello world!' },
      value2: { toString: () => 'Hi!' },
      expected: false,
    },
  ])('$description', ({ expected, value1, value2 }) => {
    expect(equal(value1, value2)).toBe(expected);
  });
});
