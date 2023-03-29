/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    extends: [
        //默认推荐的规则
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-typescript',
        '@vue/eslint-config-prettier/skip-formatting',
        'plugin:prettier/recommended'
    ],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    rules: {
        //覆盖前面推荐的规则。例如: 定义的变量没有使用，eslint就会报错
        //然后找到报错的弹框，复制里面的具体规则
        '@typescript-eslint/no-unused-vars': 'off', //关闭检测定义的变量未使用的报错
        'vue/multi-word-component-names': 'off'
    }
};
