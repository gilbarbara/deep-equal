import { AnyObject, Primitive } from './types';

export function arrayBufferEqual(left: ArrayBufferView, right: ArrayBufferView) {
  if (left.byteLength !== right.byteLength) {
    return false;
  }

  const view1 = new DataView(left.buffer);
  const view2 = new DataView(right.buffer);

  let index = left.byteLength;

  while (index--) {
    if (view1.getUint8(index) !== view2.getUint8(index)) {
      return false;
    }
  }

  return true;
}

// eslint-disable-next-line @typescript-eslint/ban-types
function isOfType<T extends Primitive | Function>(type: string) {
  return (value: unknown): value is T => typeof value === type;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = isOfType<Function>('function');

export const isNull = (value: unknown): value is null => {
  return value === null;
};

export const isRegex = (value: unknown): value is RegExp => {
  return Object.prototype.toString.call(value).slice(8, -1) === 'RegExp';
};

export const isObject = (value: unknown): value is AnyObject => {
  return !isUndefined(value) && !isNull(value) && (isFunction(value) || typeof value === 'object');
};

export const isUndefined = isOfType<undefined>('undefined');
