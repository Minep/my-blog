<script setup lang="ts">
import { useNotification } from '@/stores/notifications';
import { onMounted } from 'vue';
import NotificationItem from './NotificationItem.vue';

const notification = useNotification()

onMounted(() => {
    setInterval(() => {
        notification.tryPurge()
    }, 1000)
})

</script>

<template>
    <ul class="p-6 space-y-5 z-50">
        <TransitionGroup>
            <NotificationItem v-for="(v,i) in notification.all" :key="i" :data="v"/>
        </TransitionGroup>
    </ul>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>