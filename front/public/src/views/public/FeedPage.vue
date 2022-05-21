<script setup lang="ts">
import ColumnWithAsideLayout from '@/layouts/ColumnWithAside.vue'
import DynamicArticleList from '@/components/DynamicArticleList.vue';
import usePageTitle from '@/composables/usePageTitle';

usePageTitle("主页")

</script>

<template>
    <ColumnWithAsideLayout>
        <template v-slot:column>
                <DynamicArticleList/>
        </template>
    </ColumnWithAsideLayout>
</template>

<style></style>