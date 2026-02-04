import equal from '../src';

describe('arrays', () => {
  describe('circular references', () => {
    it('should handle arrays with circular references', () => {
      const array1: any[] = [1, 2];

      array1.push(array1);
      const array2: any[] = [1, 2];

      array2.push(array2);

      expect(equal(array1, array2)).toBe(true);
    });
  });

  it.each([
    {
      description: 'two empty arrays are equal',
      value1: [],
      value2: [],
      expected: true,
    },
    {
      description: 'equal arrays',
      value1: [1, 2, 3],
      value2: [1, 2, 3],
      expected: true,
    },
    {
      description: 'not equal arrays (different item)',
      value1: [1, 2, 3],
      value2: [1, 2, 4],
      expected: false,
    },
    {
      description: 'not equal arrays (different length)',
      value1: [1, 2, 3],
      value2: [1, 2],
      expected: false,
    },
    {
      description: 'equal arrays of objects',
      value1: [{ a: 'a' }, { b: 'b' }],
      value2: [{ a: 'a' }, { b: 'b' }],
      expected: true,
    },
    {
      description: 'not equal arrays of objects',
      value1: [{ a: 'a' }, { b: 'b' }],
      value2: [{ a: 'a' }, { b: 'c' }],
      expected: false,
    },
    {
      description: 'pseudo array and equivalent array are not equal',
      value1: { '0': 0, '1': 1, length: 2 },
      value2: [0, 1],
      expected: false,
    },
  ])('$description', ({ expected, value1, value2 }) => {
    expect(equal(value1, value2)).toBe(expected);
  });
});
