<script setup lang="ts">
import { RouterView } from 'vue-router';
import StackableNotifications from './components/StackableNotifications.vue'
</script>

<template>
  <StackableNotifications class="fixed right-0 bottom-0"/>
  <RouterView/>
</template>

<style>

</style>
