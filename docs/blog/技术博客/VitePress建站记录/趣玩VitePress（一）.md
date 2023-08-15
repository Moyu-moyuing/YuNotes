# 趣玩VitePress之贡献者板块

## 在正文末尾增加贡献者板块

### 直接引入

最直接的方法是在 Markdown 文件顶部导入Vue 组件，然后在需要的地方使用它。例如：

```markdown
---
import MyComponent from './path-to-component/MyComponent.vue'
---

# My Heading

<MyComponent />

```

但是这样就造成一个缺陷就是，我们每次写md文档时都要把该组件在md文件中重复导入。

我们不想这样，一个内容管理网站应该是把md文档和vue文件、ts文件、css文件等开发文件分开的，写文档时只需要关注写文档的内容，而不应该杂糅进vue组件。而且这样重复导入的繁琐不是一个很好的主意，应该如何解决？

### 使用VitePress插槽slot

VitePress为其布局组件提供了一些可用的插槽，我们可以使用这些插槽来插入自定义内容或者组件。默认主题的组件有几个插槽，可用于在页面的某些位置注入内容。下面是将组件注入到前面的大纲中的示例：`<Layout/>`

```js
// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import MyLayout from './MyLayout.vue'

export default {
  ...DefaultTheme,
  // override the Layout with a wrapper component that
  // injects the slots
  Layout: MyLayout
}
```

```vue
<!--.vitepress/theme/MyLayout.vue-->
<script setup>
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #aside-outline-before>
      My custom sidebar top content
    </template>
  </Layout>
</template>
```

或者也可以使用渲染函数。

```js
// .vitepress/theme/index.js
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import MyComponent from './MyComponent.vue'

export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'aside-outline-before': () => h(MyComponent)
    })
  }
}
```

其所提供的插槽有：

- 通过 frontmatter 启用时 `layout: 'doc'`（默认）：
  - `doc-top`
  - `doc-bottom`
  - `doc-footer-before`
  - `doc-before`
  - `doc-after`
  - `sidebar-nav-before`
  - `sidebar-nav-after`
  - `aside-top`
  - `aside-bottom`
  - `aside-outline-before`
  - `aside-outline-after`
  - `aside-ads-before`
  - `aside-ads-after`
- 通过 frontmatter 启用 `layout: 'home'`时：
  - `home-hero-before`
  - `home-hero-info`
  - `home-hero-image`
  - `home-hero-after`
  - `home-features-before`
  - `home-features-after`
- 通过 frontmatter 启用 `layout: 'page'`时：
  - `page-top`
  - `page-bottom`
- 在“找不到”（404）“页上：
  - `not-found`
- 全局：
  - `layout-top`
  - `layout-bottom`
  - `nav-bar-title-before`
  - `nav-bar-title-after`
  - `nav-bar-content-before`
  - `nav-bar-content-after`
  - `nav-screen-content-before`
  - `nav-screen-content-after`

可是我的需求是在doc文档正文末尾去插入我的贡献者板块——即增加二级标题内容再加入github头像链接。列表上似乎有一些可以用：

- `doc-bottom`
  ![image-20230816025315149](https://cdn.jsdelivr.net/gh/Moyu-moyuing/ImageHostingWebsite@main/Img/202308160253213.png)
- `doc-footer-before`
  ![image-20230816025151626](https://cdn.jsdelivr.net/gh/Moyu-moyuing/ImageHostingWebsite@main/Img/202308160251786.png)
- `doc-after`
  ![image-20230816025350056](https://cdn.jsdelivr.net/gh/Moyu-moyuing/ImageHostingWebsite@main/Img/202308160253122.png)

看来这些位置都不是我们想要的，这些slot的位置离我们的目标太过遥远。况且我们不仅仅需要的是贡献者的头像和名字，我们需要的是 `贡献者`作为二级标题加上Contributors组件插入md正文末尾处。`h`渲染函数能够在 `theme/index.ts`文件中轻松在 `layout`布局函数中使用插槽 `slot`来增加组件布局，但使用 `h`渲染函数能办到上述需求吗？

### markdown-it插件

显然，直接在 `h` 渲染函数中使用 Markdown 语法是不可能的，因为 `h` 渲染函数是为 Vue 的 JSX/TSX 设计的，它期望的是一个与 Vue 虚拟 DOM 相关的对象结构，而不是 Markdown 语法。那能否使用 `markdown-it`插件？

可以在 VitePress 主题的 `theme/index.ts` 文件中将 Markdown 内容转换为 HTML，并使用 `h` 渲染函数插入到布局中。

1. **安装 `markdown-it`**：

   ```bash
   npm install markdown-it
   ```
2. **在 `theme/index.ts` 中引入 `markdown-it` 并设置**：

   ```ts
   import MarkdownIt from 'markdown-it';

   const md = new MarkdownIt();
   ```
3. **转换 Markdown 并使用 `h` 渲染函数**：

   这里，假设在页面的顶部加入一个 "贡献者" 的二级标题以及一个自定义的 `Contributors` 组件：

   ```ts
   import { h, inject } from 'vue'
   import DefaultTheme from 'vitepress/theme'

   import Contributors from './components/contributors.vue'
   import MarkdownIt from 'markdown-it';

   const md = new MarkdownIt();
   export default {
     Layout: () => {
       const contributorsTitle = md.render  ('## Contributors')

      return h(DefaultTheme.Layout, null, {
        'doc-footer-before': () => [
              h('div', {
                innerHTML: contributorsTitle,
              }),
            h(Contributors)
          ]
        })
      }
    }

    ```
   

但是这样显示的确实是把md二级标题转换成了HTML的h2元素，但是并不是我们之前希望的需要统一的VitePress样式渲染。

![image-20230816032407905](https://cdn.jsdelivr.net/gh/Moyu-moyuing/ImageHostingWebsite@main/Img/202308160324003.png)

这样看起来是不是很怪？VitePress 默认使用了一些特定的样式和布局来渲染 Markdown 内容，我们希望将其用在我们插入的md二级标题上。有没有一种方法可以解决？

### 一个暴力方法——曲线救国

如何在 Vue 组件中插入和渲染 Markdown 字符串，并使其使用 VitePress 的样式？VitePress支持使用md组件，我们能否将md组件转换成vue组件再插入md文档中去？

VitePress 默认使用了一些特定的样式和布局来渲染 Markdown 内容。我们需要的情况实际上涉及到如何在 Vue 组件中插入和渲染 Markdown 字符串，并使其使用 VitePress 的样式。

通常，我们不直接在 Vue 组件中使用 Markdown，因为 Vue 的模板和组件系统是为 HTML 和 JavaScript 设计的。但有一种方法可以绕过这一点：

1. **创建一个临时的 .md 文件**：
    - 可以创建一个临时的 Markdown 文件，例如 `Contributors.md`，并在其中写入你想要的内容，例如 `## Contributors`。

2. **使用 `import` 引入该文件**：
    - 在 Vue 文件或主题配置中，可以尝试使用 dynamic import 来引入这个文件。这样，VitePress 将处理文件，将其转换为一个 Vue 组件，该组件将包含已经被渲染的 Markdown。

3. **在主题配置中使用这个组件**：

```javascript
import { h } from 'vue'
import FooterBefore from './FooterBefore.vue'

const layout = {
  async Layout() {
    const Contributors = await import('./Contributors.md');
  
    return h(DefaultTheme.Layout, null, {
      'home-features-after': () => h(TeamPage),
      'doc-footer-before': () => [
        h(Contributors),
        h(FooterBefore)
      ]
    })
  }
}
```

这样做起来似乎太麻烦，我们的项目中不期望将md文档作为组件使用，那样做似乎使得项目很杂乱，我们所期望的是md就是文档，vue就是组件，不同格式文件负责不同事情。而且这样的动态引入，动态转换需要一定的开销。

其实使用 VitePress 主题的样式是个比较特定的需求，而 VitePress 并不直接为 Vue 提供 Markdown 渲染功能。所以对于这种需求，可能没有一个直接、简单的方法。

**直接引用 VitePress 主题中的样式如何？**：

1. 找到 VitePress 主题的样式文件，这通常是一些全局的 CSS。
2. 在项目中引入这些样式。
3. 使用上述的 `h` 渲染函数方法，直接使用 HTML 标签（比如 `h2`），而不是 Markdown 语法，来模拟 Markdown 的样式效果。

但这种方法的缺点是，如果 VitePress 更新了它的样式，可能需要手动更新项目中的样式引用。

如果我们正在开发一个大型项目或插件，并希望完全集成 VitePress 的样式和功能，可能需要考虑更复杂的方法，比如修改 VitePress 的内部代码或使用更复杂的插件。

我们可能需要一些变通的方法。

### 预处理插件的实现

有没有可能将md文档全部经过一个ts文件进行格式转换，这样可以把内容插入md文件中，再经过统一渲染呢？

事实上Markdown 文档被渲染之前预处理它们，可以实现高度的定制化。流程如下：

1. **预处理**：在 Markdown 文档被 VitePress 渲染之前，使用一个脚本或插件处理所有的 Markdown 文件。这可以在 Vite 或 VitePress 的插件系统中实现。
2. **添加内容**：在此预处理步骤中，可以很容易地插入或修改 Markdown 文件的内容。例如，可以在某些文件的末尾添加 "## 贡献者" 等内容。
3. **渲染**：预处理后，Markdown 文件会被修改或替换为新的版本，之后它们将由 VitePress 正常渲染。

**MDPreprocessor插件实现**

```typescript
import type { Plugin } from 'vite'

export function MDPreprocessor(): Plugin {
  return {
    name: 'md-preprocessor',
    transform(code, id) {
      if (!id.endsWith('.md')) return null
      const [filename, i] = id.split('/').slice(-2)
      // 是首页的 index.md直接跳过
      if (filename === 'docs' && i === 'index.md') return code

      // 在正文末尾插入“Contributors”标题以及贡献者组件
      code += '\n\n## 贡献者\n<Contributors/>'
      return code
    }
  }
}
```

此插件会在每个 Markdown 文件的末尾添加 "## Contributors"和组件 `<Contributors/>`。当然，我们还可以进行扩展，可以根据需要进行更复杂的处理，如正则替换、使用 Markdown 处理库等。

然后在 Vite 或 VitePress 的配置文件中使用此插件：

```javascript
// vite.config.js 或 .vitepress/config.js

import { markdownPreprocessor } from './path-to-your-plugin';

export default {
  plugins: [markdownPreprocessor()],
}
```

此方法的好处是，可以直接在 Markdown 文件中使用 Markdown 语法，并确保 VitePress 会以我们期望的方式渲染它们。

![image-20230816034422251](https://cdn.jsdelivr.net/gh/Moyu-moyuing/ImageHostingWebsite@main/Img/202308160344371.png)
