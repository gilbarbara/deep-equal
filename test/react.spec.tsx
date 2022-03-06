/* eslint-disable max-classes-per-file */
import * as React from 'react';
import { create } from 'react-test-renderer';

import equal from '../src';

class Child extends React.Component {
  shouldComponentUpdate(nextProps: any) {
    // this.props.children is a h1 with a circular reference to its owner, Container

    return !equal(this.props, nextProps);
  }

  render() {
    const { children } = this.props;

    return <div>{children}</div>;
  }
}

function Container(props: any): JSX.Element {
  const { subtitle, title } = props;

  return (
    <Child>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </Child>
  );
}

const mockChild = jest.spyOn(Child.prototype, 'render');
const mockWarn = jest.spyOn(console, 'warn');

describe('react', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('compares without warning or errors', () => {
    const testRenderer = create(React.createElement(Container));

    testRenderer.update(React.createElement(Container));

    expect(mockWarn).toHaveBeenCalledTimes(0);
    expect(mockChild).toHaveBeenCalledTimes(1);
  });

  it('elements of same type and props are equal', () => {
    const testRenderer = create(React.createElement(Container));

    testRenderer.update(React.createElement(Container));
    expect(mockChild).toHaveBeenCalledTimes(1);
  });
  it('elements of same type with different props are not equal', () => {
    const testRenderer = create(React.createElement(Container));

    testRenderer.update(React.createElement(Container, { title: 'New' }));
    expect(mockChild).toHaveBeenCalledTimes(2);
  });
});
