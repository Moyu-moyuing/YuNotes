<script setup lang="ts">
import { VPTeamPage, VPTeamPageTitle, VPTeamMembers } from 'vitepress/theme'
const teamMembers = [
  {
    avatar: 'https://github.com/Moyu-moyuing.png',
    name: '凌晨三点的修狗',
    title: '认清形势，放弃幻想',
    links: [
      { icon: 'github', link: 'https://github.com/Moyu-moyuing' },
      {
        icon: {
          svg: `<svg
                t="1692784900643"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1553"
                width="200"
                height="200"
                >
                  <path
                    d="M512 0c282.784 0 512 229.216 512 512s-229.216 512-512 512S0 
                    794.784 0 512 229.216 0 512 0z m189.952 752l11.2-108.224c-31.904 
                    9.536-100.928 16.128-147.712 16.128-134.464 0-205.728-47.296-195.328-146.304 
                    11.584-110.688 113.152-145.696 232.64-145.696 54.784 0 122.432 8.8 151.296 
                    18.336L768 272.704C724.544 262.24 678.272 256 599.584 256c-203.2 0-388.704 
                    94.88-406.4 263.488C178.336 660.96 303.584 768 535.616 768c80.672 0 
                    138.464-6.432 166.336-16z"
                    fill="currentColor"
                    p-id="1554"
                    data-spm-anchor-id="a313x.search_index.0.i0.68503a814wTmDy"
                    class="selected"
                  ></path>
                </svg>`
        },
        link: 'https://blog.csdn.net/weixin_43837483?spm=1011.2421.3001.5343'
      }
    ]
  }
]
</script>

<template>
  <VPTeamPage>
    <VPTeamPageTitle>
      <template #title> 核心成员介绍 </template>
    </VPTeamPageTitle>
    <div class="w-full p-10">
      <VPTeamMembers size="small" :members="teamMembers" />
    </div>
  </VPTeamPage>
</template>

<style lang="scss" scoped></style>
