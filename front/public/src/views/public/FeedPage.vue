<script setup lang="ts">
import ColumnWithAsideLayout from '@/layouts/ColumnWithAside.vue'
import DynamicArticleList from '@/components/DynamicArticleList.vue';
</script>

<template>
    <ColumnWithAsideLayout>
        <template v-slot:column>
                <DynamicArticleList/>
        </template>
    </ColumnWithAsideLayout>
</template>

<style></style>