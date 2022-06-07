<script setup lang="ts">
import type { ArticleMetadata } from '@/helpers';
import { computed } from '@vue/reactivity';
import dayjs from 'dayjs';
import { RouterLink } from 'vue-router';

const props = defineProps<{
    data: ArticleMetadata
}>()

const getDateTimeString = computed(() => {
    return dayjs.unix(props.data.time).toDate().toLocaleString()
})

const getArticleUrl = computed(() => {
    return `/article/${props.data.id}`
})

</script>

<template>
    <RouterLink :to="getArticleUrl" class="block font-serif">
        <p class="text-3xl font-bold tracking-wide">{{ data.title }}</p>
        <span class="block w-full h-[2px] bg-black mb-3"></span>
        <p class="text-lg">
            {{ data.desc }}
        </p>
        <div class="flex flex-row align-middle justify-between mt-2 text-sm">
            <div>
                <p v-if="data.pinned" class="text-white bg-black px-1 py-0.5">置顶文章</p>
            </div>
            <div class="flex flex-row space-x-4 child:pt-1">
                <p>{{ getDateTimeString }}</p>
                <p>收录于 <i>{{ data.category.name }}</i></p>
            </div>
        </div>
    </RouterLink>
</template>