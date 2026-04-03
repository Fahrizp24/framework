// jest.config.mjs
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

const config = {
  testEnvironment: 'jsdom',
  modulePaths: ['<rootDir>/src/'],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/coverage/**',
    '!**/jest.config.mjs',
    '!**/next.config.mjs',
    '!**/types/**',
    '!**/views/**',
    '!**/pages/api/**',
    '!**/*.d.ts',
  ],
}

export default createJestConfig(config)