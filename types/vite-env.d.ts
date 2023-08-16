interface ImportMeta {
  env: {
    [key: string]: string
    BASE_URL: string
    MODE: 'development' | 'production'
    // ... 可能还有其他的环境变量
  }
}
