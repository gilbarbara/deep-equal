# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm build           # Clean and build with tsup (outputs dist/)
pnpm lint            # ESLint with auto-fix
pnpm typecheck       # TypeScript check (noEmit)
pnpm test            # Runs vitest once
pnpm test:watch      # Runs vitest watch mode
pnpm test:coverage   # Runs tests with coverage
pnpm validate        # Full validation: lint + typecheck + test:coverage + build + size
```

Run a single test file:
```bash
pnpm test test/arrays.spec.ts
```

Run tests matching a pattern:
```bash
pnpm test -t "should return true"
```

## Architecture

Single-purpose library exporting one default function `equal(left, right)` that performs deep equality comparison.

**Source structure:**
- `src/index.ts` - Main `equal` function with specialized comparators for arrays, Maps, Sets, ArrayBuffers, and objects
- `src/helpers.ts` - Type guard utilities (`isObject`, `isRegex`, etc.)
- `src/types.ts` - TypeScript type definitions

**Key implementation details:**
- Circular references: Handled via WeakMap/WeakSet tracking to prevent infinite recursion in self-referential or cross-referential structures
- React elements: Skips `_owner` property (contains circular refs) when `$$typeof` is present
- NaN handling: `NaN === NaN` returns true
- Comparison order: Reference equality → constructor match → type-specific comparison → valueOf/toString fallback → key-by-key recursion

**Tests** are organized by data type in `test/*.spec.ts` (scalars, objects, arrays, dates, regex, functions, bigint, maps, sets, typed-arrays).

## Build

Uses `tsup` with dual output (CJS + ESM). Size limit: 1kB per format.
