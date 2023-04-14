//vite.config.ts
import { SearchPlugin } from "vitepress-plugin-search";
import { defineConfig } from "vite";
import flexSearchIndexOptions from 'flexsearch'
//default options
var options = {
  ...flexSearchIndexOptions,
  previewLength: 100,
  buttonLabel: "搜索",
  placeholder: "请输入关键词",
  allow: [],
  ignore: [],
};

export default defineConfig({
  plugins: [SearchPlugin(options)],
});