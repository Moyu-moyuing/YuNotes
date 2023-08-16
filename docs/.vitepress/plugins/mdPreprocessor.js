export function MDPreprocessor() {
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
