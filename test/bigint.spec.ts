import equal from '../src';

describe('bigint', () => {
  it.each([
    {
      description: 'equal bigints',
      value1: BigInt(1),
      value2: BigInt(1),
      expected: true,
    },
    {
      description: 'not equal bigints',
      value1: BigInt(1),
      value2: BigInt(2),
      expected: false,
    },
  ])('$description', ({ expected, value1, value2 }) => {
    expect(equal(value1, value2)).toBe(expected);
  });
});
