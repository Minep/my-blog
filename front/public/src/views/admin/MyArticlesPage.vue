<script setup lang="ts">
import CategoryControlPanel from "@/components/admin/CategoryControlPanel.vue";
import ArticleControlPanel from "@/components/admin/ArticleControlPanel.vue";
import { ref } from "vue";
import UploadArticlePopup from "@/components/admin/UploadArticlePopup.vue";
import usePageTitle from "@/composables/usePageTitle";

const filters = ref({})

const showUploader = ref(false)

usePageTitle("管理文章")

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
            <ArticleControlPanel 
                class="shadow-md w-full h-full bg-white p-5" 
                :query-filter="filters"
                @new-article="showUploader = true"/>
        </ElMain>
        <UploadArticlePopup v-model="showUploader"/>
    </ElContainer>
</template>