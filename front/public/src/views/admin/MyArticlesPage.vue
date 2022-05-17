<script setup lang="ts">
import CategoryControlPanel from "@/components/admin/CategoryControlPanel.vue";
import { inject, onMounted, reactive, ref, watchEffect } from "vue";

import type { ArticlePageResult, ArticleSummary } from "@/api/dtos";

import { usePagination, type PaginationResolver } from "@/composables/usePagination";
import { api, ApiProxyKeyOperational, type ApiProxy } from "@/api";
import ArticleControlPanel from "../../components/admin/ArticleControlPanel.vue";

const filters = ref({})

function onSelection(selectedCids: string[]) {
    filters.value = {
        cats: selectedCids.join(",")
    }
}

</script>

<template>
    <ElContainer class="w-full h-full">
        <ElAside class="p-10" width="30%">
            <CategoryControlPanel class="shadow-md bg-white p-5 h-full"
                @selection="onSelection"/>
        </ElAside>
        <ElMain class="!p-10 h-full">
            <ArticleControlPanel class="shadow-md w-full h-full bg-white p-5" :query-filter="filters"/>
        </ElMain>
    </ElContainer>
</template>