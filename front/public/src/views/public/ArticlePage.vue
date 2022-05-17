<script setup lang="ts">
import ColumnWithAsideLayout from '@/layouts/ColumnWithAside.vue'
import { RouterLink } from 'vue-router';
import ArticleDisplay from '@/components/ArticleDisplay.vue';
import type { Article } from '@/helpers';
import { onMounted, watchEffect } from 'vue';
import { api } from '@/api';
import { computed, reactive, ref } from '@vue/reactivity';
import AsyncContent from '@/components/AsyncContent.vue';


const props = defineProps<{
    aid: string
}>()

let viewState: { article?: Article } = reactive({
    article: undefined
})

watchEffect(async () => {
    const result = await api.v1.article(props.aid).get<Article>()
    viewState.article = result.payload
})


const articleDate = computed(() => {
    return new Date(viewState.article?.time ?? 0).toLocaleString()
})

const categoryUrl = computed(() => {
    return `/category?id=${viewState.article?.category.id ?? 0}`
})

</script>

<template>
    <ColumnWithAsideLayout>
        <template v-slot:column>
            <AsyncContent :ready-if="!!viewState.article">
                <div v-if="viewState.article" class="px-[5rem] font-serif max-w-5xl space-y-10">
                    <section>
                        <h1 class="text-4xl small-caps font-bold mb-5">
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