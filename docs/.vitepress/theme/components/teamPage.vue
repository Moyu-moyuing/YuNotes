<script setup lang="ts">
import { VPTeamPage, VPTeamPageTitle, VPTeamMembers } from 'vitepress/theme'
const teamMembers = [
  {
    avatar: 'https://github.com/Moyu-moyuing.png',
    name: '凌晨三点的修狗',
    title: '认清形势，放弃幻想',
    links: [{ icon: 'github', link: 'https://github.com/Moyu-moyuing' }]
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
