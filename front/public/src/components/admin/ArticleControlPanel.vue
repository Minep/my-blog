<script setup lang="ts">
import {
    Close,
    Check,
    Delete,
    Edit
} from "@element-plus/icons-vue"

import { ApiProxyKeyOperational, type ApiProxy, api } from '@/api';
import type { ArticlePageResult, ArticleSummary } from '@/api/dtos';
import usePagination from '@/composables/usePagination';
import { inject, onMounted, watch } from 'vue';
import { computed } from "@vue/reactivity";
import type { ItemLoadingResolver } from "@/helpers";
import AddDocument from "@/components/icons/AddDocument.vue";

const props = defineProps<{
    queryFilter: Record<string, any>
}>()

const emits = defineEmits<{
    (e: "new-article"): void
}>()

const proxy = inject(ApiProxyKeyOperational) as ApiProxy

const filters = computed(() => props.queryFilter)

const resolver: ItemLoadingResolver<ArticlePageResult> = async (offset, limit) => {
    return await proxy(api.v1.admin.article().get<ArticlePageResult>({
        offset: offset,
        limit: limit,
        ...filters.value
    }))
}

const {
    data,
    pageSize,
    currentPage,
    loading,
    totalCount
} = usePagination<ArticlePageResult, ArticleSummary>("data", "count", resolver)

onMounted(() => {
    currentPage.value = 1
})

watch(filters, () => {
    currentPage.value = 1
})

</script>

<template>
<div class="flex flex-col">
    <p class="mb-4">所有文章</p>
    <div class="grow overflow-y-auto">
        <ElTable v-loading="loading" :data="data">
            <ElTableColumn prop="id" label="ID" width="50px"/>
            <ElTableColumn prop="title" label="题目"/>
            <ElTableColumn prop="category" label="分类" width="150px"/>
            <ElTableColumn prop="date" label="发表日期" width="150px">
                <template #default="scope">
                    <div>
                        {{ new Date(scope.row.date).toLocaleString() }}
                    </div>
                </template>
            </ElTableColumn>

            <ElTableColumn prop="visible" label="可见" width="80px">
                <template #default="scope">
                    <ElIcon>
                        <Close color="#F56C6C" v-if="!scope.row.visible"/>
                        <Check color="#67C23A" v-else/>
                    </ElIcon>
                </template>
            </ElTableColumn>

            <ElTableColumn label="操作" width="160px">
                <template #default="scope">
                    <ElButtonGroup>
                        <ElButton type="primary" :icon="Edit" size="small"/>
                        <ElButton type="danger" :icon="Delete" size="small"/>
                    </ElButtonGroup>
                </template>
            </ElTableColumn>
        </ElTable>
    </div>
    <div class="flex justify-between">
        <div class="flex">
            <ElButton size="large" class="child:!text-white" type="success" :icon="AddDocument"
                @click="emits('new-article')">新文章</ElButton>
        </div>
        <ElPagination
            v-model:currentPage="currentPage"
            v-model:page-size="pageSize"
            layout="total, prev, pager, next"
            :total="totalCount"
            background/>
    </div>
</div>
</template>