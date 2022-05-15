<script setup lang="ts">
import type { CategoryMetadata } from '@/helpers';
import CategoryListEntryVue from './CategoryListEntry.vue';

const props = defineProps<{
    items: CategoryMetadata[]
}>()
</script>

<template>
<ul class="pl-5 pr-20 space-y-4 max-w-[80%]">
    <li v-for="v in items" :key="v.id">
        <CategoryListEntryVue :data="v"/>
    </li>
</ul>
</template>