<script setup lang="ts">
import type { ArticleMetadata, ItemLoadingResolver } from '@/helpers';
import { ref, computed, reactive, watch, watchEffect, onMounted, inject, nextTick } from 'vue';
import AsyncContent from './AsyncContent.vue';
import ArticleList from './ArticleList.vue';
import { api, ApiProxyKey, type ApiProxy } from '@/api';
import { useScroll } from '@vueuse/core';
import useIncrementalLoad from '@/composables/useIncrementalLoad';

const props = defineProps<{
    params?: Record<string, any>
}>()

const proxy: ApiProxy = inject(ApiProxyKey) as ApiProxy

const fetchArticle: ItemLoadingResolver<ArticleMetadata[]> = async (offset, limit) => {
    return (await proxy(api.v1.article().get<ArticleMetadata[]>({
            ...props.params,
            offset: offset
        }), []))!
}

const {
    data,
    reset,
    loading,
    hasMore
} = useIncrementalLoad(document, fetchArticle)


const requestParam = computed(() => props.params)

onMounted(() => {
    if (!requestParam.value) {
        reset()
    }
    nextTick(() => watch(requestParam, () => {
        reset()
    }))
})


</script>

<template>
<AsyncContent :ready="!loading" :incremental="true">
    <ArticleList :items="data"/>
    <p class="text-center font-serif font-bold small-caps opacity-70 mt-10" 
        v-if="!loading && !hasMore">
       暂无更多内容 
    </p>
</AsyncContent>
</template>