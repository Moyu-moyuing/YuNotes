# 趣玩VitePress之LaTeX语法支持

## 前言

当我在我的博客网站更新我的吴恩达机器学习笔记时，出现了一个情况，VitePress默认的markdown-it解析器似乎无法渲染LaTeX数学公式：

![Quicker_20230826_211121.png](https://cdn.jsdelivr.net/gh/Moyu-moyuing/ImageHostingWebsite@main/Img/202308262243477.png)

于是我去VitePress官方中查看issue是否有解决的方案：

![image.png](https://cdn.jsdelivr.net/gh/Moyu-moyuing/ImageHostingWebsite@main/Img/202308262301943.png)

官方给出的解答是：

![image.png](https://cdn.jsdelivr.net/gh/Moyu-moyuing/ImageHostingWebsite@main/Img/202308262304384.png)

这里给出原链接[KaTeX/MathJax implementation · Issue #529 · vuejs/vitepress (github.com)](https://github.com/vuejs/vitepress/issues/529)

让我们来梳理一下有哪些方法。

> 使用任何Katex/MathJax的markdown-it插件都可以解决这个问题

## Katex

当选择Katex作为解决方案时，下面是一个实例：

1. 下载markdown-it-katex包

   ```bash
   npm install markdown-it-katex
   ```
2. 在 `.vitepress/config.js`文件中：

   ```ts
   import { defineConfig } from 'vitepress'
   import markdownItKatex from 'markdown-it-katex'
   const customElements = [
     'math',
     'maction',
     'maligngroup',
     'malignmark',
     'menclose',
     'merror',
     'mfenced',
     'mfrac',
     'mi',
     'mlongdiv',
     'mmultiscripts',
     'mn',
     'mo',
     'mover',
     'mpadded',
     'mphantom',
     'mroot',
     'mrow',
     'ms',
     'mscarries',
     'mscarry',
     'mscarries',
     'msgroup',
     'mstack',
     'mlongdiv',
     'msline',
     'mstack',
     'mspace',
     'msqrt',
     'msrow',
     'mstack',
     'mstack',
     'mstyle',
     'msub',
     'msup',
     'msubsup',
     'mtable',
     'mtd',
     'mtext',
     'mtr',
     'munder',
     'munderover',
     'semantics',
     'math',
     'mi',
     'mn',
     'mo',
     'ms',
     'mspace',
     'mtext',
     'menclose',
     'merror',
     'mfenced',
     'mfrac',
     'mpadded',
     'mphantom',
     'mroot',
     'mrow',
     'msqrt',
     'mstyle',
     'mmultiscripts',
     'mover',
     'mprescripts',
     'msub',
     'msubsup',
     'msup',
     'munder',
     'munderover',
     'none',
     'maligngroup',
     'malignmark',
     'mtable',
     'mtd',
     'mtr',
     'mlongdiv',
     'mscarries',
     'mscarry',
     'msgroup',
     'msline',
     'msrow',
     'mstack',
     'maction',
     'semantics',
     'annotation',
     'annotation-xml'
   ]

   export default defineConfig({
     markdown: {
       config: (md) => {
         md.use(markdownItKatex)
       }
     },
     vue: {
       template: {
         compilerOptions: {
           isCustomElement: (tag) => customElements.includes(tag)
         }
       }
     }
   })
   ```
3. 在 `index.md`中引入Katex的样式文件

   ```markdown
   ---
   head:
     - - link
       - rel: stylesheet
         href: https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css
   ---
   # KaTeX Demo
   $\sqrt{3x-1}+(1+x)^2$
   ```
4. 效果：
   ![image.png](https://cdn.jsdelivr.net/gh/Moyu-moyuing/ImageHostingWebsite@main/Img/202308262333511.png)

## MathJax

当选择MathJax作为解决方案时会比上面简单很多，下面是一个实例：

1. 下载markdown-it-mathjax3包

   ```bash
   npm install markdown-it-mathjax3
   ```
2. 在 `.vitepress/config.js`文件中：

   ```ts
   import mathjax3 from 'markdown-it-mathjax3';

   const customElements = [
   	'mjx-container',
       'mjx-assistive-mml',
   	'math',
   	'maction',
   	'maligngroup',
   	'malignmark',
   	'menclose',
   	'merror',
   	'mfenced',
   	'mfrac',
   	'mi',
   	'mlongdiv',
   	'mmultiscripts',
   	'mn',
   	'mo',
   	'mover',
   	'mpadded',
   	'mphantom',
   	'mroot',
   	'mrow',
   	'ms',
   	'mscarries',
   	'mscarry',
   	'mscarries',
   	'msgroup',
   	'mstack',
   	'mlongdiv',
   	'msline',
   	'mstack',
   	'mspace',
   	'msqrt',
   	'msrow',
   	'mstack',
   	'mstack',
   	'mstyle',
   	'msub',
   	'msup',
   	'msubsup',
   	'mtable',
   	'mtd',
   	'mtext',
   	'mtr',
   	'munder',
   	'munderover',
   	'semantics',
   	'math',
   	'mi',
   	'mn',
   	'mo',
   	'ms',
   	'mspace',
   	'mtext',
   	'menclose',
   	'merror',
   	'mfenced',
   	'mfrac',
   	'mpadded',
   	'mphantom',
   	'mroot',
   	'mrow',
   	'msqrt',
   	'mstyle',
   	'mmultiscripts',
   	'mover',
   	'mprescripts',
   	'msub',
   	'msubsup',
   	'msup',
   	'munder',
   	'munderover',
   	'none',
   	'maligngroup',
   	'malignmark',
   	'mtable',
   	'mtd',
   	'mtr',
   	'mlongdiv',
   	'mscarries',
   	'mscarry',
   	'msgroup',
   	'msline',
   	'msrow',
   	'mstack',
   	'maction',
   	'semantics',
   	'annotation',
   	'annotation-xml',
   ];

   export default {
     markdown: {
       config: (md) => {
         md.use(mathjax3);
       },
     },
     vue: {
       template: {
         compilerOptions: {
           isCustomElement: (tag) => customElements.includes(tag),
         },
       },
     },
   };
   ```

但是这样会出现一个问题：

![Quicker_20230826_212546.png](https://cdn.jsdelivr.net/gh/Moyu-moyuing/ImageHostingWebsite@main/Img/202308262337438.png)

我们似乎需要对MathJax插件渲染的样式进行一个修改，我们可以添加一个 `mathjax3.css`文件：

```css
mjx-container {
  display: inline-block;
  margin: auto 2px -2px;
}

mjx-container > svg {
  margin: auto;
  display: inline-block;
}
```

还有一个更细节的点，在之前的配置 `.vitepress/config.js`文件中，我们定义了一个数组 `customElements`，看起来是一串很长的配置项，这是为了防止Vue给出下面这些警告信息，并且让组件能够正确被解析。

![image.png](https://cdn.jsdelivr.net/gh/Moyu-moyuing/ImageHostingWebsite@main/Img/202308262352090.png)

这样将当更新包后会有一些组件无法解析时，只需将组件的名称（报告错误）添加到 `customElements` 数组中即可。
