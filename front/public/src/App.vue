<script setup lang="ts">
import { onBeforeMount, onMounted } from 'vue';
import { RouterView } from 'vue-router';
import StackableNotifications from './components/StackableNotifications.vue'
import { useIdentity } from './stores/identity';

const idStore = useIdentity()

onBeforeMount(() => {
  idStore.refresh()
})
</script>

<template>
  <StackableNotifications class="fixed right-0 bottom-0"/>
  <RouterView/>
</template>

<style>

</style>
