<script setup lang="ts">
import ArticleListEntry from '@/components/ArticleListEntry.vue';
import type { ArticleMetadata } from '@/helpers';

const props = defineProps<{
    items: ArticleMetadata[]
}>()

</script>

<template>
<ul class="list-style-none max-w-2xl space-y-16">
    <li v-for="x in items" :key="x.id">
        <ArticleListEntry :data="x"/>
    </li>
</ul>
</template>