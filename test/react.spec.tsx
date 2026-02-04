import * as React from 'react';
import { render } from '@testing-library/react';

import equal from '../src';

const renderCount = { current: 0 };

class Child extends React.Component<React.PropsWithChildren<any>> {
  shouldComponentUpdate(nextProps: any) {
    // this.props.children is a h1 with a circular reference to its owner, Container

    return !equal(this.props, nextProps);
  }

  render() {
    const { children } = this.props;

    renderCount.current++;

    return <div>{children}</div>;
  }
}

function Container(props: any) {
  const { subtitle, title } = props;

  return (
    <Child>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </Child>
  );
}

const mockWarn = vi.spyOn(console, 'warn');

describe('react', () => {
  beforeEach(() => {
    renderCount.current = 0;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('compares without warning or errors', () => {
    const { rerender } = render(<Container />);

    rerender(<Container />);

    expect(mockWarn).toHaveBeenCalledTimes(0);
    expect(renderCount.current).toBe(1);
  });

  it('elements of same type and props are equal', () => {
    const { rerender } = render(<Container />);

    rerender(<Container />);
    expect(renderCount.current).toBe(1);
  });

  it('elements of same type with different props are not equal', () => {
    const { rerender } = render(<Container />);

    rerender(<Container title="New" />);
    expect(renderCount.current).toBe(2);
  });
});
