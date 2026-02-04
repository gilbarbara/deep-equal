import equal from '../src';

describe('scalars', () => {
  it.each([
    {
      description: 'equal numbers',
      value1: 1,
      value2: 1,
      expected: true,
    },
    {
      description: 'not equal numbers',
      value1: 1,
      value2: 2,
      expected: false,
    },
    {
      description: 'number and array are not equal',
      value1: 1,
      value2: [],
      expected: false,
    },
    {
      description: '0 and null are not equal',
      value1: 0,
      value2: null,
      expected: false,
    },
    {
      description: 'equal strings',
      value1: 'a',
      value2: 'a',
      expected: true,
    },
    {
      description: 'not equal strings',
      value1: 'a',
      value2: 'b',
      expected: false,
    },
    {
      description: 'empty string and null are not equal',
      value1: '',
      value2: null,
      expected: false,
    },
    {
      description: 'null is equal to null',
      value1: null,
      value2: null,
      expected: true,
    },
    {
      description: 'equal booleans (true)',
      value1: true,
      value2: true,
      expected: true,
    },
    {
      description: 'equal booleans (false)',
      value1: false,
      value2: false,
      expected: true,
    },
    {
      description: 'not equal booleans',
      value1: true,
      value2: false,
      expected: false,
    },
    {
      description: '1 and true are not equal',
      value1: 1,
      value2: true,
      expected: false,
    },
    {
      description: '0 and false are not equal',
      value1: 0,
      value2: false,
      expected: false,
    },
    {
      description: 'NaN and NaN are equal',
      value1: NaN,
      value2: NaN,
      expected: true,
    },
    {
      description: '0 and -0 are equal',
      value1: 0,
      value2: -0,
      expected: true,
    },
    {
      description: 'Infinity and Infinity are equal',
      value1: Infinity,
      value2: Infinity,
      expected: true,
    },
    {
      description: 'Infinity and -Infinity are not equal',
      value1: Infinity,
      value2: -Infinity,
      expected: false,
    },
  ])('$description', ({ expected, value1, value2 }) => {
    expect(equal(value1, value2)).toBe(expected);
  });
});
