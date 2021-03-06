module.exports = {
  root: true,
  plugins: ["jest"],

  env: {
    node: true,
    "jest/globals": true
  },

  extends: ["plugin:vue/essential", "@vue/prettier", "@vue/typescript"],

  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  },

  parserOptions: {
    parser: "typescript-eslint-parser"
  }
};
