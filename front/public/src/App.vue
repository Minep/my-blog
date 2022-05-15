<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import StackableNotifications from './components/StackableNotifications.vue'
</script>

<template>
  <header class="w-full h-max flex flex-row justify-between px-5 py-4">
    <RouterLink to="/" class="font-['Great_Vibes'] text-4xl font-bold select-none">Lunaixsky's</RouterLink>
    <nav class="p-2 flex flex-row font-serif space-x-12 pr-10 font-bold small-caps
                child-hover:underline underline-offset-8 decoration-4 child:select-none">
      <RouterLink to="/">主&nbsp;&nbsp;页</RouterLink>
      <RouterLink to="/category">类&nbsp;&nbsp;别</RouterLink>
      <RouterLink to="/">关&nbsp;&nbsp;于</RouterLink>
    </nav>
  </header>

  <StackableNotifications class="fixed right-0 bottom-0"/>

  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>

  <footer class="mt-10 w-full">

  </footer>
</template>

<style>

</style>
