# CodeLint规范（一）之CommitLint配置

Code Lint的工作原理是借助一些lint工具对代码进行静态分析，并在合适的时机触发校验，提示错误。

## Lint种类

随着nodejs和前端工程化的发展，前端产出了很多成熟的Lint工具，主要包括：

* eslint 规范并校验 ECMAScript/JavaScript code的编写
* tslint 规范并校验 TypeScript code的编写
* stylelint 规范并校验css/scss/less code的编写
* commitlint 负责校验commit msg是否符合规范
* prettier 或 beautifyjs 统一代码排版格式

除此之外，我们还需要一些辅助的工具：

* husky 能够监听git hooks的nodejs包，让nodejs开发者处理git hooks任务变得更加容易
* lint-staged 可以将git“已暂存(staged)”的文件作为参数传入你要执行的shell script之中

## Commitlint是什么

在多人协作的背景下，git 仓库和workflow的作用很重要。而对于 commit 提交的信息说明存在一定规范，现使用 commitlint + husky 规范 `git commit -m "msg"` 中的描述信息。

一句话说，当我们运行 `git commmit -m 'xxx'` 时，用来检查 `xxx` 是否满足固定格式的工具。简单来说，就是制定提交规范

## git hooks和husky

正式集成commitlint之前，先要介绍一下[git hooks](https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90), 顾名思义hooks为“钩子”之意，它是“发布订阅模式”的一种实现，和前端中的DOM事件(click、hover等)相似，Git也预先定义了一些“事件钩子”如“commit-msg”、“pre-commit”等，当我们执行对应的Git操作时会触发它们，从而通知订阅该事件的shell script文件处理我们要进行的任务，这些shell脚本文件存放在项目根目录下的 `.git/hooks` 目录中。我们可以通过编写这些shell script文件定制我们的校验任务，也可以通过编写git hooks脚本，它会帮助我们自动生成.git/hooks目录下的shell script，无需关注shell script的实现细节。

## Git钩子

Git官方解释：钩子都被存储在 Git 目录下的 `hooks` 子目录中。 也即绝大部分项目中的 `.git/hooks` 。当你用 `git init` 初始化一个新版本库时，Git 默认会在这个目录中放置一些示例脚本（默认shell）。 这些脚本除了本身可以被调用外，它们还透露了被触发时所传入的参数。把一个正确命名（不带扩展名）且可执行的文件放入 `.git` 目录下的 `hooks` 子目录中，即可激活该钩子脚本。

### `commit-msg`

`commit-msg` 钩子接收一个参数，此参数即存有当前提交信息的临时文件的路径。 如果该钩子脚本以非零值退出，Git 将放弃提交，因此，可以用来在提交通过前验证项目状态或提交信息。

## 为什么使用 Commitlint?

在使用 git commit 时，git 会提示我们填入此次提交的信息，团队中规范了 commit 可以更清晰的查看每一次代码提交记录，还可以根据自定义的规则，自动生成 changeLog 文件。

## 安装与使用

### 安装commitlint

* @commitlint/cli 是[commitlint](https://commitlint.js.org/#/)提供的命令行工具，安装后会将cli脚本放置在./node_modules/.bin/目录下
* @commitlint/config-conventional是社区中一些共享配置[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)，我们可以扩展这些配置，也可以不安装这个包自定义配置

```powershell
npm install --save-dev @commitlint/config-conventional @commitlint/cli
```

生成配置文件commitlint.config.js，当然也可以是 .commitlintrc.js，实际是配置@commitlint/cli的配置文件

```powershell
echo "module.exports = {extends: ['@commitlint/config-conventional']};" > commitlint.config.js
```



### 安装husky配置commit-msg

为 git 配置 husky ，**对 git 的 commit 操作进行校验**。husky继承了Git下所有的钩子，在触发钩子的时候，husky可以阻止不合法的commit，push等等。

执行下面命令, 在开发环境中安装husky：

```powershell
npm install husky --save-dev
```

在 package.json 中引入 husky并配置初始化命令

```json
// package.json
{
  ...
  ...
  "scripts": {
    "prepare": "husky install",
},
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```

"husky"配置告诉了git hooks，当我们在当前项目中执行 git commit -m '测试提交' 时将触发commit-msg事件钩子并通知husky，从而执行 commitlint -E HUSKY_GIT_PARAMS命令，此命令大意为检查指定路径（环境变量值确定——即HUSKY_GIT_PARAMS）文件中的信息，而HUSKY_GIT_PARAMS实际指向.git/COMMIT_EDITMSG。也就是我们刚开始安装的./node_modules/.bin/commitlint，它将读取commitlint.config.js配置规则并对我们刚刚提交的测试提交这串文字进行校验，若校验不通过，则在终端输出错误，commit终止。

对于"prepare"钩子的配置，可以使用下列命令代替

```powershell
npm set-script prepare "husky install" 
```

执行下列命令（相当于执行 `husky install`），初始化husky，将在项目根目录下创建.husky文件夹

```powershell
npm run prepare
```

添加git hooks的commit-msg钩子

```powershell
npx husky add .husky/commit-msg "npx --no -- commitlint --edit ${1}"
```

### Commitlint 提交规范

社区共享配置conventional——[约定式提交 (conventionalcommits.org)](https://www.conventionalcommits.org/zh-hans/v1.0.0/)

```HTML
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

* type ：用于表明我们这次提交的改动类型，是新增了功能？还是修改了测试代码？又或者是更新了文档？
* optional scope：可选的修改范围。用于标识此次提交主要涉及到代码中哪个模块。
* description：一句话描述此次提交的主要内容
* optional body：可选正文，对本次commit描述，支持多段落
* optional footer：可选脚注

|   type   |                             description                             |
| :------: | :-----------------------------------------------------------------: |
|  build  | 更改构建系统和外部依赖项（如将 gulp 改为 webpack，更新某个 npm 包） |
|    ci    |                     对 CI 配置文件和脚本的更改                     |
|   docs   |                          仅仅修改文档说明                          |
|   feat   |                           增加一个新特性                           |
|   fix   |                             修复一个bug                             |
|   perf   |                         更改代码以提高性能                         |
| refactor |                              代码重构                              |
|  revert  |                          回滚到上一个版本                          |
|  style  |       不影响代码含义的改动，例如去掉空格、改变缩进、增删分号       |
|   test   |                增加新的测试功能或更改原有的测试模块                |
|  chore  |                 不属于以上类型的其他类型(日常事务)                 |

### commitlint.config.js配置

自定义规范可参考[commitlint脚手架](https://commitlint.js.org/#/reference-rules)，这里给出自用的配置规则

```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    "type-enum": [2, 'always', [
      'feat', 'fix', 'docs', 'perf', 'revert', 'ci', 'test', 'refactor', 'build', 'style', 'chore'
    ]],
    'type-case': [0],//type 的输入格式,默认为小写‘lower-case’
    'type-empty': [0],//type 是否可为空
    'scope-empty': [0],//scope 是否为空
    'scope-case': [0],//scope 的格式,默认为小写‘lower-case’
    'subject-full-stop': [0, 'never'],//subject 结尾符,默认为.
    'subject-case': [0, 'never'],//subject 的格式，默认其中之一：['sentence-case', 'start-case', 'pascal-case', 'upper-case']
    'header-max-length': [0, 'always', 72]//header 最大长度，默认为72字符
  },
};
```

## 参考文档

* [commitlint.config.js配置文件中文文档（附使用示例）](https://blog.csdn.net/qq_21197033/article/details/128609033)
* [前端代码风格自动化系列（二）之Commitlint](https://demongao.com/2020/11/%E5%89%8D%E7%AB%AF%E4%BB%A3%E7%A0%81%E9%A3%8E%E6%A0%BC%E8%87%AA%E5%8A%A8%E5%8C%96%E7%B3%BB%E5%88%97%E4%BA%8C%E4%B9%8Bcommitlint)
* [前端codeLint-- 为项目集成ESLint、StyleLint、commitLint实战和原理](https://zhuanlan.zhihu.com/p/100427908)
