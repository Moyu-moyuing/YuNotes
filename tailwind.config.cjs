/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  corePlugins: {
    preflight: false
  }, //禁用预检功能
  // content: ['./index.html', './docs/**/*.{vue,js,ts,jsx,tsx}'],
  //路径出错，样式不会被渲染
  content: ['./index.html', './docs/.vitepress/theme/components/*.vue'],
  theme: {
    extend: {}
  }
}
