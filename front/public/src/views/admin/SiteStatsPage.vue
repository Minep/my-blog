<script setup lang="ts">
import { api, ApiProxyKeyOperational, type ApiProxy } from '@/api';
import type { SiteStatistics } from '@/api/dtos';
import usePageTitle from '@/composables/usePageTitle';
import { inject, onMounted, ref } from 'vue';

const stats = ref<SiteStatistics>()
const proxy = inject(ApiProxyKeyOperational) as ApiProxy

usePageTitle("站点统计")

onMounted(() => {
    proxy(api.v1.admin.stats().get<SiteStatistics>())
        .then(v => {
            stats.value = v
        })
})
</script>

<template>
<section class="w-full h-full p-8 flex flex-row flex-wrap items-start space-x-8">
    <div class="p-5 bg-white shadow-md rounded-md min-w-[10rem] w-fit">
        <p>所有文章</p>
        <p class="float-right mt-2 ml-10" v-loading="!stats">
            <span class="text-5xl mr-1">{{ stats?.articles ?? 0 }}</span>
            <span>篇</span>
        </p>
    </div>
    <div class="p-5 bg-white shadow-md rounded-md min-w-[10rem] w-fit">
        <p>文章分类</p>
        <p class="float-right mt-2 ml-10" v-loading="!stats">
            <span class="text-5xl mr-1">{{ stats?.categories ?? 0 }}</span>
            <span>个</span>
        </p>
    </div>
    <div class="p-5 bg-white shadow-md rounded-md min-w-[10rem] w-fit">
        <p>托管图片</p>
        <p class="float-right mt-2 ml-10" v-loading="!stats">
            <span class="text-5xl mr-1">{{ stats?.pictures ?? 0 }}</span>
            <span>张</span>
        </p>
    </div>
</section>
</template>