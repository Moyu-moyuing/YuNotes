<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()
const defaultAuthor: string = '凌晨三点的修狗'

const contributorsArr: string[] = [
  frontmatter.value?.author,
  ...(frontmatter.value.contributors || [])
].filter(x => x)
const contributors: Ref<string[]> = ref(contributorsArr)

const reName: (name: string) => string = name => {
  return name === '凌晨三点的修狗' ? 'Moyu-moyuing' : name
}

const getAvatar: (name: string) => string = name => {
  return `https://github.com/${reName(name)}.png`
}

const getGitHubLink: (name: string) => string = name => {
  return `https://github.com/${reName(name)}`
}

const isNotEmpty: (arr: string | string[]) => number | false = arr => {
  return Array.isArray(arr) && arr.length
}
</script>

<template>
  <!-- <slot name="title"></slot> -->
  <div v-if="isNotEmpty(contributors)" class="flex flex-wrap gap-4">
    <div
      v-for="item of contributors"
      :key="item"
      class="flex gap-2 items-center"
    >
      <a :href="getGitHubLink(item)" rel="noreferrer" target="_blank">
        <img :src="getAvatar(item)" class="w-8 h-8 rounded-full" />
      </a>
      {{ item }}
    </div>
  </div>
  <div v-else class="flex gap-2 items-center text-[var(--vp-c-brand)]">
    <a :href="getGitHubLink(defaultAuthor)" rel="noreferrer" target="_blank">
      <img :src="getAvatar(defaultAuthor)" class="w-8 h-8 rounded-full" />
    </a>
    {{ defaultAuthor }}
  </div>
</template>

<style lang="scss" scoped></style>
