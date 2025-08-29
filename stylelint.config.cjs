module.exports = {
  customSyntax: 'postcss-less',
  extends: ['stylelint-config-standard'],
  rules: {
    'at-rule-no-unknown': null,
    'no-empty-source': null,
    // TODO: 后续所有的样式名统一为 [shot-开头] 并遵循BEM命名规范
    // 强制使用 shotz- 前缀的 BEM 命名
    // 'selector-class-pattern': [
    //   '^shotz-[a-z0-9]+(__[a-z0-9]+)?(--[a-z0-9]+)?$',
    //   {
    //     message:
    //       'Class name must follow BEM and start with "shotz-" prefix',
    //   },
    // ],
  },
  ignoreFiles: ['**/dist/**', '**/node_modules/**', '**/build/**'],
};
