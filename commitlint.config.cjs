module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'perf',
        'revert',
        'ci',
        'test',
        'refactor',
        'build',
        'style',
        'chore'
      ]
    ],
    'type-case': [0], //type 的输入格式,默认为小写‘lower-case’
    'type-empty': [0], //type 是否可为空
    'scope-empty': [0], //scope 是否为空
    'scope-case': [0], //scope 的格式,默认为小写‘lower-case’
    'subject-full-stop': [0, 'never'], //subject 结尾符,默认为.
    'subject-case': [0, 'never'], //subject 的格式，默认其中之一：['sentence-case', 'start-case', 'pascal-case', 'upper-case']
    'header-max-length': [0, 'always', 72] //header 最大长度，默认为72字符
  }
}
/**
 * feature：新功能
 * update：更新某功能
 * perf：不改变结构只改变逻辑上的优化
 * fixbug：修补某功能的bug
 * refactor：重构某个功能
 * optimize: 优化构建工具或运行时性能
 * style：仅样式改动
 * docs：仅文档新增/改动
 * chore：构建过程或辅助工具的变动
 * release：打包
 * 冒号后面要加空格
 */
