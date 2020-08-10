/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  comment:
    "This config was generated using a preset. Please see the handbook for more information: https://github.com/stryker-mutator/stryker-handbook/blob/master/stryker/guides/react.md#react",
  mutate: ["src/**/*.ts?(x)", "!src/**/*@(.test|.spec|Spec).ts?(x)"],
  mutator: "typescript",
  tsconfigFile: "tsconfig.json",
  testRunner: "jest",
  reporters: ["progress", "clear-text", "html"],
  coverageAnalysis: "off",
  packageManager: "npm",
};
