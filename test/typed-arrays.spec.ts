import equal from '../src';

describe('typed arrays', () => {
  test.each([
    {
      description: 'two empty arrays of the same class are equal',
      value1: new Int32Array([]),
      value2: new Int32Array([]),
      expected: true,
    },
    {
      description: 'two empty arrays of the different class are not equal',
      value1: new Int32Array([]),
      value2: new Int16Array([]),
      expected: false,
    },
    {
      description: 'equal arrays',
      value1: new Int32Array([1, 2, 3]),
      value2: new Int32Array([1, 2, 3]),
      expected: true,
    },
    {
      description: 'equal BigUint64Array arrays',
      value1: new BigUint64Array([1n, 2n, 3n]),
      value2: new BigUint64Array([1n, 2n, 3n]),
      expected: true,
    },
    {
      description: 'not equal BigUint64Array arrays',
      value1: new BigUint64Array([1n, 2n, 3n]),
      value2: new BigUint64Array([1n, 2n, 4n]),
      expected: false,
    },
    {
      description: 'not equal arrays (same items, different class)',
      value1: new Int32Array([1, 2, 3]),
      value2: new Int16Array([1, 2, 3]),
      expected: false,
    },
    {
      description: 'not equal arrays (different item)',
      value1: new Int32Array([1, 2, 3]),
      value2: new Int32Array([1, 2, 4]),
      expected: false,
    },
    {
      description: 'not equal arrays (different length)',
      value1: new Int32Array([1, 2, 3]),
      value2: new Int32Array([1, 2]),
      expected: false,
    },
    {
      description: 'pseudo array and equivalent typed array are not equal',
      value1: { '0': 1, '1': 2, length: 2, constructor: Int32Array },
      value2: new Int32Array([1, 2]),
      expected: false,
    },
  ])('$description', ({ expected, value1, value2 }) => {
    expect(equal(value1, value2)).toBe(expected);
  });
});
