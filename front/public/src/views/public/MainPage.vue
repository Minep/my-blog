<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import SiteLogo from '@/components/SiteLogo.vue'
import TwilightCutieMark from '@/components/TwilightCutieMark.vue'
import { useIdentity } from '@/stores/identity';

const user = useIdentity()
</script>

<template>
  <div class="fixed left-0 top-0 w-screen h-screen bg-paper-400 -z-50">
    <TwilightCutieMark class="
      fill-paper-400 stroke-paper-500 opacity-40 float-right w-[80rem]
      absolute -bottom-[35rem] -left-[6rem] stroke-[0.3]"/>
  </div>
  <div class="w-full h-fit">
    <header class="w-full h-max flex flex-row justify-between px-5 py-4">
      <SiteLogo class="text-4xl"/>
      <nav class="p-2 flex flex-row font-serif space-x-12 pr-10 font-bold small-caps
                  child-hover:underline underline-offset-8 decoration-4 child:select-none">
        <RouterLink to="/">主&nbsp;页</RouterLink>
        <RouterLink to="/category">分&nbsp;类</RouterLink>
        <RouterLink v-if="!user.hasIdentity" to="/login">登&nbsp;陆</RouterLink>
        <RouterLink v-else to="/admin">
          {{ user.identity.name }}
        </RouterLink>
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