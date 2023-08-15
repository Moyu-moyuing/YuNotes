/*
 * @description: md文档预处理插件——更换md渲染主题
 * @fileName: mdPreprocessor.ts
 * @author: Moyu-moyuing
 * @date: 2023-08-15 21:20:37
 */
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
      code += '\n## 贡献者\n<Contributors/>'
      return code
    }
  }
}
