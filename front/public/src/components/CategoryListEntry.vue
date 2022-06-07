<script setup lang="ts">
import type { CategoryMetadata } from '@/helpers';
import { computed } from '@vue/reactivity';

const props = defineProps<{
    data: CategoryMetadata
}>()

const categoryUrl = computed(()=>{
    return `/category?id=${props.data.id}`
})

</script>

<template>
    <RouterLink :to="categoryUrl"
        class="block font-serif border-x-4
                pl-8 pb-2 pt-4 hover:bg-black hover:text-white border-black transition-all
                text-2xl font-bold align-middle">
        {{ data.name }}
    </RouterLink>
</template>