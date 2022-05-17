<script setup lang="ts">import { ref } from 'vue';

import {
    Upload,
    Search
} from "@element-plus/icons-vue"
import { computed } from '@vue/reactivity';
import { mulberry32 } from '@/helpers';
import AsyncContent from '../../components/AsyncContent.vue';

const keyword = ref("")

const rng = mulberry32((new Date()).getMilliseconds())

const randRatio = () => {
    const r = rng()
    console.log(r)
    return r > 0.5 ? "aspect-square" : "aspect-video"
}

const image = [
    "https://images.unsplash.com/photo-1498603993951-8a027a8a8f84?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2936&q=80",
    "https://images.unsplash.com/photo-1614102073832-030967418971?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
    "https://images.unsplash.com/photo-1552083375-1447ce886485?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1609154767012-331529e7d73b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=671&q=80",
    "https://images.unsplash.com/photo-1605007493699-af65834f8a00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    "https://images.unsplash.com/photo-1610818544205-9830e171384c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1612712191426-54db4d88cbec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
    "https://images.unsplash.com/photo-1629362505696-23630c44bec1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    "https://images.unsplash.com/photo-1498603993951-8a027a8a8f84?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2936&q=80",
    "https://images.unsplash.com/photo-1614102073832-030967418971?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
    "https://images.unsplash.com/photo-1552083375-1447ce886485?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1609154767012-331529e7d73b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=671&q=80",
    "https://images.unsplash.com/photo-1605007493699-af65834f8a00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    "https://images.unsplash.com/photo-1610818544205-9830e171384c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1612712191426-54db4d88cbec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
    "https://images.unsplash.com/photo-1629362505696-23630c44bec1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",

]


</script>

<template>
<div>
    <section class="w-full p-16 flex flex-row justify-center items-center space-x-[10rem]">
        <p class="font-cursive text-[5rem]">我的图床</p>
        <div class="flex space-x-8 items-center p-8 bg-white shadow-md">
            <!-- <input class="
                bg-transparent border-b-black border-b-2 text-lg px-4 pt-2 pb-1 focus:outline-none
            "> -->
            <ElInput v-model="keyword" size="large"/>
            <ElButton type="primary" size="large" :icon="Search" round>搜索</ElButton>
            <ElButton type="success" size="large" :icon="Upload" round>上传</ElButton>
        </div>
    </section>
    <AsyncContent class="mb-10" ready-if incremental>
        <section class="w-full columns-4 pt-5 my-8">
            <div v-for="url in image" class="mt-5 py-4 px-1" :class="randRatio()">
                <div class="h-fit w-full rounded-md relative hover:scale-[1.05] transition-transform transform-gpu">
                    <p class="absolute top-0 left-0 text-white bg-black bg-opacity-50 py-1 px-2 rounded-md
                            text-xs max-w-[70%] truncate hover:break-normal hover:bg-opacity-80
                            hover:whitespace-normal">
                        ABCDABCDAB CDABCDABCDABCDABCDABCDA BCDABCDABCDABCDABCDA BCDABCDABCD
                    </p>
                    <img class="w-full object-cover rounded-md shadow-md" :src="url">
                </div>
            </div>
        </section>
    </AsyncContent>
</div>
</template>