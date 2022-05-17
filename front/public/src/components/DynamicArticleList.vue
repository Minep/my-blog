<script setup lang="ts">
import type { ArticleMetadata } from '@/helpers';
import { ref, computed, reactive, watch, watchEffect, onMounted, inject } from 'vue';
import AsyncContent from './AsyncContent.vue';
import ArticleList from './ArticleList.vue';
import { api, ApiProxyKey, type ApiProxy } from '@/api';
import useScroll from '@/composables/useScroll';

const props = defineProps<{
    params?: Record<string, any>
}>()

const proxy: ApiProxy = inject(ApiProxyKey) as ApiProxy

const fetchState: {
    offset: number;
    articles: ArticleMetadata[],
    changes: number;
} = reactive({
    offset: -1,
    articles: [],
    changes: 0
})

const fetchArticle = async () => {
    const fetchedList = 
        (await proxy(api.v1.article().get<ArticleMetadata[]>({
            ...props.params,
            offset: fetchState.offset
        }), []))!

    fetchState.articles.push(...fetchedList)
    fetchState.changes = fetchedList.length
    fetchState.offset = fetchState.articles.length - 1
}

const doneLoading = computed(() => {
    return fetchState.offset < fetchState.articles.length
})

const requestParam = computed(() => props.params)

const { scrollX, scrollY } = useScroll()

watch(requestParam, (newval, _) => {
    fetchState.offset = 0
    fetchState.articles = []
})

watch(doneLoading, (newval, _) => {
    if (newval) {
        return
    }

    fetchArticle()
})

watch(scrollY, () => {
    if (scrollY.value > document.body.scrollHeight - window.innerHeight) {
        fetchState.offset += 1
    }
})

onMounted(() => {
    fetchState.offset += 1
})

</script>

<template>
<AsyncContent :ready-if="doneLoading" :incremental="true">
    <ArticleList :items="fetchState.articles"/>
    <p class="text-center font-serif font-bold small-caps opacity-70 mt-10" 
        v-if="doneLoading && !fetchState.changes">
       暂无更多内容 
    </p>
</AsyncContent>
</template>