<script setup lang="ts"></script>

<template>
  <div class="px-6 mt-[48px]">
    <div
      class="mx-auto container max-w-[1152px] min-h-[32px] bg-[var(--vp-c-bg-soft)] w-full rounded-[8px]"
    >
      <section
        class="grid grid-cols-3 justify-items-center py-[12px] px-[24px] items-center"
      >
        <h2 class="leading-[24px] text-[16px] font-[600]">
          本站总访问量 <span id="busuanzi_value_site_pv" class="font-bold" /> 次
        </h2>
        <Icon-fluent-emoji-flat:dog-face
          class="text-[var(--vp-c-brand-lighter)] text-4xl"
        />
        <h2 class="leading-[24px] text-[16px] font-[600]">
          本站访客数 <span id="busuanzi_value_site_uv" class="font-bold" /> 人次
        </h2>
      </section>
    </div>
  </div>
</template>

<style scoped></style>
