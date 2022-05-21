<script setup lang="ts">
import ColumnWithAside from "@/layouts/ColumnWithAside.vue";
import ArticleList from "@/components/ArticleList.vue";
import CategoryList from "@/components/CategoryList.vue";
import type { ArticleMetadata, CategoryLevel, CategoryMetadata } from "@/helpers";
import { onActivated, onMounted, reactive, watch, watchEffect } from "vue";
import { computed, ref } from "@vue/reactivity";
import { useCategoryStore } from "@/stores/category";
import AsyncContent from "@/components/AsyncContent.vue";
import DynamicArticleList from "@/components/DynamicArticleList.vue";
import usePageTitle from "@/composables/usePageTitle";

const props = defineProps({
    id: {
        type: String,
        default: "0"
    }
})

const viewState: {
    currentLevel?: CategoryLevel,
    articles: ArticleMetadata[]
} = reactive({
    articles: []
})

const categoryStore = useCategoryStore()

usePageTitle("分类")

const childrenCategories = computed(() => {
    const levelInfo = viewState.currentLevel;
    if (!levelInfo) {
        return []
    }
    if (!levelInfo.parent) {
        return levelInfo.children
    }
    return [
        {
            id: levelInfo.parent.id,
            name: `... ${levelInfo.parent.name}`
        },
        ...levelInfo.children
    ] 
})

let articleParams = ref({
    cat: "0"
})

watchEffect(async () => {
    viewState.currentLevel = undefined
    viewState.currentLevel = await categoryStore.navigateTo(props.id)
    if (viewState.currentLevel) {
        articleParams.value = {
            cat: viewState.currentLevel.current.id
        }
    }
})

</script>

<template>
    <ColumnWithAside>
        <template v-slot:aside>
            <AsyncContent :ready="!!viewState.currentLevel">
                <p class="text-3xl font-serif font-bold mb-8 small-caps">
                    {{ viewState.currentLevel?.current.name }}
                </p>
                <CategoryList :items="childrenCategories"/>
            </AsyncContent>
        </template>
        <template v-slot:column>
            <DynamicArticleList :params="articleParams"/>
        </template>
    </ColumnWithAside>
</template>