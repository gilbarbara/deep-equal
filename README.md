# @gilbarbara/deep-equal

[![npm version](https://badge.fury.io/js/%40gilbarbara%2Fdeep-equal.svg)](https://badge.fury.io/js/%40gilbarbara%2Fdeep-equal) [![CI](https://github.com/gilbarbara/deep-equal/actions/workflows/main.yml/badge.svg)](https://github.com/gilbarbara/deep-equal/actions/workflows/main.yml) [![Maintainability](https://api.codeclimate.com/v1/badges/466ae47e8a9a20955af2/maintainability)](https://codeclimate.com/github/gilbarbara/deep-equal/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/466ae47e8a9a20955af2/test_coverage)](https://codeclimate.com/github/gilbarbara/deep-equal/test_coverage)

Lightweight deep equal comparator.

## Features
- Written in TypeScript
- ESM ready
- Works with Map, Set and Typed Arrays
- Works with React component (avoid circular references)

## Usage

```shell
npm i @gilbarbara/deep-equal
```

```typescript
import equal from '@gilbarbara/deep-equal';

equal({ a: 1 }, { a: 1 }); // true

```

## Credits

Inspired by [fast-deep-equal](https://github.com/epoberezkin/fast-deep-equal) package. Thanks! ❤️

## License

MIT
