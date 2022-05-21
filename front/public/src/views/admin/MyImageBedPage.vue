<script setup lang="ts">

import { onMounted, reactive, ref, watchEffect } from 'vue';
import {
    Upload,
    Search,
    Plus
} from "@element-plus/icons-vue"
import type { ItemLoadingResolver } from '@/helpers';
import AsyncContent from '@/components/AsyncContent.vue';
import useIncrementalLoad from '@/composables/useIncrementalLoad';
import { useNotification } from '@/stores/notifications';
import { ElLoading } from 'element-plus';
import "element-plus/es/components/loading/style/css"
import usePageTitle from '@/composables/usePageTitle';

const keyword = ref("")

function getName(url: string) {
    const val = url.split('/').pop() ?? ''
    return val.split('?', 1)[0]
}

const elPictureShowcase = ref<HTMLElement>()

const resolver: ItemLoadingResolver<string[]> = async (offset, limit) => {
    // TODO: Integrate with OSS
    await (new Promise((resolve) => setTimeout(() => resolve(null), 2000)))
    return []
}

const notification = useNotification()

const {
    data,
    loading,
    hasMore,
    reset
} = useIncrementalLoad(elPictureShowcase, resolver)

usePageTitle("管理图床")

const uploadContext: {
    shown: boolean;
    fileList: File[];
    currentProgress: string;
} = reactive({
    shown: false,
    fileList: [],
    currentProgress: ""
})

onMounted(() => reset())

watchEffect(() => {
    for (let index = 0; index < uploadContext.fileList.length; index++) {
        const element = uploadContext.fileList[index];
        console.log(element)
    }
})

function applyKeyword() {
    reset()
}

const confirmResetUpload = () => {
    Object.assign(uploadContext, {
        shown: false,
        fileList: [],
        currentProgress: ""
    })
}

const confirmUpload = () => {

    const loading = ElLoading.service({
        target: document.body,
        lock: true,
        background: "rgba(255,255,255,0.8)",
        fullscreen: true
    })

    const unwatchProgress = watchEffect(() => {
        loading.setText(uploadContext.currentProgress)
    })

    new Promise<void>((resolve, reject) => {
        // TODO: Integrate with OSS
        setTimeout(() => {
            uploadContext.currentProgress = "Hello"
            setTimeout(() => reject("just error!"), 1000)
        }, 2000)
    })
        .then(() => {
            notification.push({
                level: "success",
                message: "全部上传成功"
            })
            loading.close()
            confirmResetUpload()
        })
        .catch((err) => {
            notification.push({
                level: "error",
                message: `上传失败（${err}）`
            })
            loading.close()
        })
        .finally(() => {
            unwatchProgress()
        })
}

</script>

<template>
<div class="h-full overflow-y-auto p-5" ref="elPictureShowcase">
    <section class="w-full p-5 flex flex-row justify-center items-center">
        <div class="flex space-x-8 items-center p-8 bg-white shadow-md">
            <ElInput v-model="keyword" size="large" clearable @clear="applyKeyword()"/>
            <ElButton @click="applyKeyword()" type="primary" size="large" :icon="Search" round>搜索</ElButton>
            <ElButton type="success" size="large" :icon="Upload" round @click="uploadContext.shown = true">上传</ElButton>
        </div>
    </section>
    <AsyncContent class="pb-10" :ready="!loading" incremental>
        <section class="w-full columns-4 pt-5 my-8">
            <div v-for="url in data" class="mt-5 py-4 px-1">
                <div class="h-fit w-full rounded-md relative hover:scale-[1.05] transition-transform transform-gpu">
                    <p class="absolute top-0 left-0 text-white bg-black bg-opacity-50 py-1 px-2 rounded-md
                            text-xs max-w-[70%] truncate hover:break-normal hover:bg-opacity-80
                            hover:whitespace-normal">
                        {{ getName(url) }}
                    </p>
                    <img class="w-full object-cover rounded-md shadow-md" :src="url">
                </div>
            </div>
        </section>
        <ElDivider v-if="!hasMore" class="!w-[70%] !mx-auto">
            暂无更多内容
        </ElDivider>
    </AsyncContent>
    <ElDialog title="上传图片" v-model="uploadContext.shown">
        <ElUpload
            action=""
            :auto-upload="false"
            :file-list="uploadContext.fileList"
            list-type="picture-card">
            <ElIcon><Plus/></ElIcon>
        </ElUpload>
        <template #footer>
            <div class="template-footer">
                <ElButton type="danger" class="child:text-white float-left" 
                        @click="confirmResetUpload()">重置</ElButton>
                <ElButton type="primary" class="child:text-white" 
                        @click="uploadContext.shown = false">稍后再说</ElButton>
                <ElButton type="success" class="child:text-white" 
                        @click="confirmUpload()">
                    立即上传
                </ElButton>
            </div>
        </template>
    </ElDialog>
</div>
</template>