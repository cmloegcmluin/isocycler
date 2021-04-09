module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
    },
    plugins: [
        "@typescript-eslint",
    ],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
    ],
    rules: {
        "@typescript-eslint/no-unused-vars": ["error", {
            "vars": "all",
            "args": "all",
            "ignoreRestSiblings": false,
            "argsIgnorePattern": "^_",
            "caughtErrorsIgnorePattern": "^_",
            "varsIgnorePattern": "^_",
        }],
        "@typescript-eslint/restrict-plus-operands": 0,
    },
}
