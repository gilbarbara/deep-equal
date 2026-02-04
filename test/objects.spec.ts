import equal from '../src';

describe('objects', () => {
  describe('errors', () => {
    it.each([
      {
        description: 'errors with same message are equal',
        value1: new Error('a'),
        value2: new Error('a'),
        expected: true,
      },
      {
        description: 'errors with different message are not equal',
        value1: new Error('a'),
        value2: new Error('b'),
        expected: false,
      },
      {
        description: 'TypeError and Error with same message are not equal',
        value1: new TypeError('a'),
        value2: new Error('a'),
        expected: false,
      },
      {
        description: 'errors with same cause are equal',
        value1: new Error('a', { cause: 'x' }),
        value2: new Error('a', { cause: 'x' }),
        expected: true,
      },
      {
        description: 'errors with different cause are not equal',
        value1: new Error('a', { cause: 'x' }),
        value2: new Error('a', { cause: 'y' }),
        expected: false,
      },
      {
        description: 'errors with deep cause are equal',
        value1: new Error('a', { cause: { n: 1 } }),
        value2: new Error('a', { cause: { n: 1 } }),
        expected: true,
      },
    ])('$description', ({ expected, value1, value2 }) => {
      expect(equal(value1, value2)).toBe(expected);
    });
  });

  describe('circular references', () => {
    it('should handle self-referential objects', () => {
      const a: any = { value: 1 };

      a.self = a;
      const b: any = { value: 1 };

      b.self = b;

      expect(equal(a, b)).toBe(true);
    });

    it('should handle cross-referential objects', () => {
      const x: any = { value: 'x' };
      const y: any = { value: 'y' };

      x.ref = y;
      y.ref = x;

      const p: any = { value: 'x' };
      const q: any = { value: 'y' };

      p.ref = q;
      q.ref = p;

      expect(equal(x, p)).toBe(true);
    });

    it('should return false when only one side has circular reference', () => {
      const circular: any = { value: 1 };

      circular.self = circular;
      const nonCircular = { value: 1, self: { value: 1 } };

      expect(equal(circular, nonCircular)).toBe(false);
    });
  });

  it.each<any>([
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
