<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()

const defaultAuthor: string = '凌晨三点的修狗'
const author: Ref<string> = ref<string>(defaultAuthor)
if (frontmatter.value?.author) {
  author.value = frontmatter.value?.author
}
const reName: (name: string) => string = name => {
  return name === '凌晨三点的修狗' ? 'Moyu-moyuing' : name
}
const currentHref: string = location.href
const getGitHubLink: (name: string) => string = name => {
  return `https://github.com/${reName(name)}`
}
const license: string =
  'Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)'
const licenseLink: string = 'https://creativecommons.org/licenses/by-nc-sa/4.0/'
const YuNotesLink: string = 'https://moyu-moyuing.github.io/YuNotes/'
</script>

<template>
  <div
    class="CopyRight mb-12 p-4 relative border-solid border rounded-lg w-full border-[var(--vp-custom-block-tip-border)] bg-[var(--vp-custom-block-tip-bg)]"
  >
    <a :href="licenseLink" rel="noreferrer" target="_blank">
      <Icon-ph-copyright-bold
        class="absolute top-4 right-4 hover:text-[var(--vp-c-brand-lightest)] transition-[color] duration-[250ms] delay-0 ease-in-out"
      />
    </a>
    <section class="flex flex-col gap-y-2 overflow-hidden">
      <div>
        <span class="font-bold">本文作者：</span>
        <span>
          <a
            :href="getGitHubLink(author)"
            rel="noreferrer"
            target="_blank"
            class="font-medium text-[var(--vp-custom-block-tip-text)] hover:text-[var(--vp-c-brand-lighter)] transition-[color] duration-[250ms] delay-0 ease-in-out hover:underline hover:underline-offset-2"
          >
            {{ author }}
          </a>
        </span>
      </div>
      <div>
        <span class="font-bold">本文链接：</span>
        <span>
          <a
            :href="currentHref"
            rel="noreferrer"
            target="_blank"
            class="font-medium text-[var(--vp-custom-block-tip-text)] hover:text-[var(--vp-c-brand-lighter)] break-all transition-[color] duration-[250ms] delay-0 ease-in-out hover:underline hover:underline-offset-2"
          >
            {{ currentHref }}
          </a>
        </span>
      </div>
      <div>
        <span class="font-bold">版权声明：</span>
        <span
          >本网站所有作品除非特殊声明外，均采用
          <a
            :href="licenseLink"
            rel="noreferrer"
            target="_blank"
            class="font-medium text-[var(--vp-custom-block-tip-text)] hover:text-[var(--vp-c-brand-lighter)] transition-[color] duration-[250ms] delay-0 ease-in-out hover:underline hover:underline-offset-2"
          >
            {{ license }}
          </a>
          进行许可。您可以使用相同方式共享或演绎本文作品，但必须注明原文出处来自
          <a
            :href="YuNotesLink"
            rel="noreferrer"
            target="_blank"
            class="font-medium text-[var(--vp-custom-block-tip-text)] hover:text-[var(--vp-c-brand-lighter)] transition-[color] duration-[250ms] delay-0 ease-in-out hover:underline hover:underline-offset-2"
            >YuNotes</a
          >
          并进行相关声明！
        </span>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped></style>
