module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    parserOptions: {
        parser: "babel-eslint",
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-mixed-spaces-and-tabs": 0,
        "no-undef": 2,
        "no-use-before-define": [1, "nofunc"],
        "vue/custom-event-name-casing": 0,
        "no-case-declarations": 0,
        "prettier/prettier": "off"
    },
};