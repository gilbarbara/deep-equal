import equal from '../src';

describe('dates', () => {
  it.each([
    {
      description: 'equal date objects',
      value1: new Date('2017-06-16T21:36:48.362Z'),
      value2: new Date('2017-06-16T21:36:48.362Z'),
      expected: true,
    },
    {
      description: 'not equal date objects',
      value1: new Date('2017-06-16T21:36:48.362Z'),
      value2: new Date('2017-01-01T00:00:00.000Z'),
      expected: false,
    },
    {
      description: 'date and string are not equal',
      value1: new Date('2017-06-16T21:36:48.362Z'),
      value2: '2017-06-16T21:36:48.362Z',
      expected: false,
    },
    {
      description: 'date and object are not equal',
      value1: new Date('2017-06-16T21:36:48.362Z'),
      value2: {},
      expected: false,
    },
  ])('$description', ({ expected, value1, value2 }) => {
    expect(equal(value1, value2)).toBe(expected);
  });
});
