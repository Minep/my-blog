<script setup lang="ts">
const props = defineProps({
    readyIf: {
        type: Boolean,
        default: false
    },
    incremental: {
        type: Boolean,
        default: false
    }
})

</script>

<template>
<div>
    <slot v-if="readyIf || incremental"/>
    <div v-if="!readyIf" class="flex justify-center items-center mt-10">
        <div class="block-bricks"></div>
    </div>
</div>
</template>