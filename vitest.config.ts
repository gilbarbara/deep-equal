import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      all: true,
      include: ['src/**/*'],
      exclude: ['src/types.ts'],
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90,
      reporter: ['text', 'lcov'],
    },
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./test/__setup__/vitest.setup.ts'],
  },
});
