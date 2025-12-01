// eslint-disable-next-line @typescript-eslint/no-require-imports
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  testMatch: ["**/features/**/tests/**/*.test.{ts,tsx}"],
  collectCoverageFrom: [
    "features/**/components/**/*.{ts,tsx}",
    "!features/**/components/**/*.d.ts",
  ],
};

module.exports = createJestConfig(customJestConfig);
