import equal from '../src';

function function1() {}

function function2() {}

describe('functions', () => {
  it.each([
    {
      description: 'same function is equal',
      value1: function1,
      value2: function1,
      expected: true,
    },
    {
      description: 'different functions are not equal',
      value1: function1,
      value2: function2,
      expected: false,
    },
  ])('$description', ({ expected, value1, value2 }) => {
    expect(equal(value1, value2)).toBe(expected);
  });
});
