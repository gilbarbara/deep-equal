import { isObject, isRegex } from './helpers';

type Seen = WeakMap<object, WeakSet<object>>;

/**
 * Internal comparison with circular reference tracking.
 */
function compareValues(left: unknown, right: unknown, seen: Seen): boolean {
  if (left === right) {
    return true;
  }

  if (left && isObject(left) && right && isObject(right)) {
    // Check for circular reference
    if (hasSeen(seen, left as object, right as object)) {
      return true;
    }

    markSeen(seen, left as object, right as object);

    if (left.constructor !== right.constructor) {
      return false;
    }

    if (Array.isArray(left) && Array.isArray(right)) {
      return equalArray(left, right, seen);
    }

    if (left instanceof Map && right instanceof Map) {
      return equalMap(left, right, seen);
    }

    if (left instanceof Set && right instanceof Set) {
      return equalSet(left, right);
    }

    // WeakMap and WeakSet cannot be compared (not iterable)
    if (left instanceof WeakMap || left instanceof WeakSet) {
      return false;
    }

    if (ArrayBuffer.isView(left) && ArrayBuffer.isView(right)) {
      return equalArrayBuffer(left, right);
    }

    if (isRegex(left) && isRegex(right)) {
      return left.source === right.source && left.flags === right.flags;
    }

    if (left instanceof Error && right instanceof Error) {
      return (
        left.message === right.message &&
        left.name === right.name &&
        compareValues(left.cause, right.cause, seen)
      );
    }

    if (left.valueOf !== Object.prototype.valueOf) {
      return left.valueOf() === right.valueOf();
    }

    if (left.toString !== Object.prototype.toString) {
      return left.toString() === right.toString();
    }

    const leftKeys = Object.keys(left);
    const rightKeys = Object.keys(right);

    if (leftKeys.length !== rightKeys.length) {
      return false;
    }

    for (let index = leftKeys.length; index-- !== 0; ) {
      if (!Object.prototype.hasOwnProperty.call(right, leftKeys[index])) {
        return false;
      }
    }

    for (let index = leftKeys.length; index-- !== 0; ) {
      const key = leftKeys[index];

      // React-specific: avoid comparing React elements' _owner
      // which contains different fiber references between renders
      if (key === '_owner' && left.$$typeof) {
        continue;
      }

      if (!compareValues(left[key], right[key], seen)) {
        return false;
      }
    }

    return true;
  }

  if (Number.isNaN(left) && Number.isNaN(right)) {
    return true;
  }

  return left === right;
}

/**
 * Check if arrays are equal.
 */
function equalArray(left: unknown[], right: unknown[], seen: Seen) {
  const { length } = left;

  if (length !== right.length) {
    return false;
  }

  for (let index = length; index-- !== 0; ) {
    if (!compareValues(left[index], right[index], seen)) {
      return false;
    }
  }

  return true;
}

/**
 * Check if array buffers are equal.
 */
function equalArrayBuffer(left: ArrayBufferView, right: ArrayBufferView) {
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

/**
 * Check if maps are equal.
 */
function equalMap(left: Map<unknown, unknown>, right: Map<unknown, unknown>, seen: Seen) {
  if (left.size !== right.size) {
    return false;
  }

  for (const entry of left.entries()) {
    if (!right.has(entry[0])) {
      return false;
    }
  }

  for (const entry of left.entries()) {
    if (!compareValues(entry[1], right.get(entry[0]), seen)) {
      return false;
    }
  }

  return true;
}

/**
 * Check if sets are equal.
 */
function equalSet(left: Set<unknown>, right: Set<unknown>) {
  if (left.size !== right.size) {
    return false;
  }

  for (const entry of left.entries()) {
    if (!right.has(entry[0])) {
      return false;
    }
  }

  return true;
}

function hasSeen(seen: Seen, left: object, right: object): boolean {
  return seen.get(left)?.has(right) ?? false;
}

function markSeen(seen: Seen, left: object, right: object): void {
  let set = seen.get(left);

  if (!set) {
    set = new WeakSet();
    seen.set(left, set);
  }

  set.add(right);
}

/**
 * Checks if two values are equal.
 */
export default function equal(left: unknown, right: unknown): boolean {
  return compareValues(left, right, new WeakMap());
}
