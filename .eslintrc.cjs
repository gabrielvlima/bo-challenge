module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "standard-with-typescript",
        "plugin:react/recommended",
        "prettier"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js, cjs, ts, tsx}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "eslint-config-prettier",
    ],
    "rules": {
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/consistent-type-definitions": "off",
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/strict-boolean-expressions": "off"
    }
}
