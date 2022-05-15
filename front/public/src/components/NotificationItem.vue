<script setup lang="ts">
import type { UINotification } from '@/helpers';
import { onMounted } from 'vue';


const props = defineProps<{
    data: UINotification
}>()

const emits = defineEmits<{
    (e: 'timeout'): void
}>()

const themeMappings: Record<"success" | "info" | "warn" | "error", string> = {
    "success": "bg-mint-400",
    "info": "bg-vodka-400",
    "warn": "bg-paper-300",
    "error": "bg-thistle-400"
}

onMounted(() => {
    setTimeout(() => emits("timeout"), 5000)
})
</script>

<template>
    <div class="px-4 py-2 shadow-xl min-w-[10rem] max-w-[20rem]" :class="themeMappings[data.level]">
        <p>{{ data.message }}</p>
    </div>
</template>