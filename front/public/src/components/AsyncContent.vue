<script setup lang="ts">
const props = defineProps({
    ready: {
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
    <slot v-if="ready || incremental"/>
    <div class="flex justify-center items-center mt-10">
        <div v-if="!ready"  class="block-bricks"></div>
    </div>
</div>
</template>