<script setup lang="ts">

import { inject, onMounted, reactive, ref, watchEffect } from 'vue';
import {
    Upload,
    Search,
    Plus
} from "@element-plus/icons-vue"
import type { HostedPicture, ItemLoadingResolver } from '@/helpers';
import AsyncContent from '@/components/AsyncContent.vue';
import useIncrementalLoad from '@/composables/useIncrementalLoad';
import { useNotification } from '@/stores/notifications';
import { ElLoading, ElMessage, ElMessageBox } from 'element-plus';
import "element-plus/es/components/loading/style/css"
import usePageTitle from '@/composables/usePageTitle';
import { useUploadImage } from '@/composables/useUploadImage';
import type { UploadFile } from "element-plus/es/components/upload/src/upload"
import { api, ApiProxyKeyOperational, type ApiProxy } from '@/api';
import { useClipboard } from "@vueuse/core"


const keyword = ref("")

function getName(url: string) {
    const val = url.split('/').pop() ?? ''
    return val.split('?', 1)[0]
}

const proxy = inject(ApiProxyKeyOperational) as ApiProxy

const elPictureShowcase = ref<HTMLElement>()

const resolver: ItemLoadingResolver<HostedPicture[]> = async (offset, limit) => {
    return (await proxy(api.v1.admin.img().get<HostedPicture[]>({
        kw: keyword.value || undefined
    }))) ?? []
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
    fileList: UploadFile[];
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

const {
    progress,
    doUpload
} = useUploadImage()

const confirmUpload = () => {

    const loading = ElLoading.service({
        target: document.body,
        lock: true,
        background: "rgba(255,255,255,0.8)",
        fullscreen: true
    })

    const unwatchProgress = watchEffect(() => {
        loading.setText(progress.value)
    })

    new Promise<void>((resolve, reject) => {
        doUpload(uploadContext.fileList.map(v => v.raw!)).then(resolve).catch(reject)
    })
        .then(() => {
            notification.success("全部上传成功")
            loading.close()
            confirmResetUpload()
        })
        .catch((err) => {
            notification.error(`上传失败（${err}）`)
            loading.close()
        })
        .finally(() => {
            unwatchProgress()
        })
}

const {
    copy,
    copied,
    isSupported
} = useClipboard()

const getMarkdownReference = (img: HostedPicture) => {
    const md = `![${img.name}](${img.url}_main)`
    if (isSupported) {
        copy(md).then(() => {
            notification.inform("已复制为Markdown");
        })
    }
    else {
        ElMessageBox.confirm(md, "图片的Markdown引用")
    }
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
            <div v-for="pic in data" class="mt-5 py-4 px-1">
                <div class="h-fit w-full rounded-md relative hover:scale-[1.05] 
                            transition-transform transform-gpu
                            cursor-pointer" @click="getMarkdownReference(pic)">
                    <p class="absolute top-0 left-0 text-white bg-black bg-opacity-50 py-1 px-2 rounded-md
                            text-xs max-w-[70%] truncate hover:break-normal hover:bg-opacity-80
                            hover:whitespace-normal">
                        {{ pic.name }}
                    </p>
                    <img class="w-full object-cover rounded-md shadow-md" :src="`${pic.url}_snapshot`">
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
            multiple
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