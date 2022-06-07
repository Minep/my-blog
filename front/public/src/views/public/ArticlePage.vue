<script setup lang="ts">
import ColumnWithAsideLayout from '@/layouts/ColumnWithAside.vue'
import { RouterLink, useRouter } from 'vue-router';
import ArticleDisplay from '@/components/ArticleDisplay.vue';
import type { Article } from '@/helpers';
import { inject, onMounted, watchEffect } from 'vue';
import { api, ApiProxyKey, type ApiProxy } from '@/api';
import { computed, reactive, ref } from '@vue/reactivity';
import AsyncContent from '@/components/AsyncContent.vue';
import usePageTitle from '@/composables/usePageTitle';
import dayjs from 'dayjs';

const proxy = inject(ApiProxyKey) as ApiProxy;

const props = defineProps<{
    aid: string
}>()

let viewState: { article?: Article } = reactive({
    article: undefined
})

const router = useRouter()

watchEffect(async () => {
    viewState.article = await proxy(api.v1.article(props.aid).get<Article>());
    if (!viewState.article) {
        router.replace("/article-not-found")
        return
    }
    usePageTitle(viewState.article.title)
})

const articleDate = computed(() => {
    return dayjs.unix(viewState.article?.time ?? 0).toDate().toLocaleString()
})

const categoryUrl = computed(() => {
    return `/category?id=${viewState.article?.category.id ?? 0}`
})

</script>

<template>
    <ColumnWithAsideLayout>
        <template v-slot:column>
            <AsyncContent :ready="!!viewState.article">
                <div v-if="viewState.article" class="px-[5rem] font-serif max-w-5xl space-y-10">
                    <section>
                        <h1 class="text-4xl tracking-wide font-medium mb-5">
                            {{ viewState.article.title }}
                        </h1>
                        <div class="flex flex-row items-center justify-between mt-2">
                            <div class="space-x-4">
                                <RouterLink :to="categoryUrl" 
                                            class="inline text-white text-sm bg-black px-2 py-1 select-none">
                                    {{ viewState.article.category.name }}
                                </RouterLink>
                                <span v-if="viewState.article.pinned" 
                                        class="inline text-white text-sm bg-thistle-600 px-2 py-1
                                                select-none">
                                    置顶文章
                                </span>
                            </div>
                            <div class="flex flex-row space-x-8 child:pt-1">
                                <p>{{ articleDate }}</p>
                            </div>
                        </div>
                    </section>
                    <section class="box-abstract">
                        <h2 class="italic font-bold text-lg mb-2">摘要</h2>
                        <div>
                            {{ viewState.article.desc }}
                        </div>
                    </section>
                    <ArticleDisplay :content="viewState.article.content"/>
                </div>
            </AsyncContent>
        </template>
    </ColumnWithAsideLayout>
</template>

<style></style>