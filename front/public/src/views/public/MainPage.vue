<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import SiteLogo from '@/components/SiteLogo.vue'
import LunaCutieMark from '@/components/LunaCutieMark.vue'
import TwilightCutieMark from '../../components/TwilightCutieMark.vue'
</script>

<template>
  <div class="fixed left-0 top-0 w-screen h-screen bg-paper-400 -z-50">
    <TwilightCutieMark class="
      fill-paper-400 stroke-paper-500 opacity-70 float-right w-[55rem]
      absolute -bottom-[25rem] -left-[10rem]"/>
  </div>
  <div class="w-full h-fit">
    <header class="w-full h-max flex flex-row justify-between px-5 py-4">
      <SiteLogo class="text-4xl"/>
      <nav class="p-2 flex flex-row font-serif space-x-12 pr-10 font-bold small-caps
                  child-hover:underline underline-offset-8 decoration-4 child:select-none">
        <RouterLink to="/">主&nbsp;&nbsp;页</RouterLink>
        <RouterLink to="/category">类&nbsp;&nbsp;别</RouterLink>
        <RouterLink to="/">关&nbsp;&nbsp;于</RouterLink>
      </nav>
    </header>

    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>

    <footer class="mt-10 w-full">

    </footer>
  </div>
</template>