import equal from '../src';

describe('WeakMap and WeakSet', () => {
  it('WeakMaps are never equal (not comparable)', () => {
    expect(equal(new WeakMap(), new WeakMap())).toBe(false);
  });

  it('WeakSets are never equal (not comparable)', () => {
    expect(equal(new WeakSet(), new WeakSet())).toBe(false);
  });

  it('same WeakMap reference is equal', () => {
    const wm = new WeakMap();

    expect(equal(wm, wm)).toBe(true);
  });

  it('same WeakSet reference is equal', () => {
    const ws = new WeakSet();

    expect(equal(ws, ws)).toBe(true);
  });
});
