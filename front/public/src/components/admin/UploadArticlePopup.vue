<script setup lang="ts">
import { useNotification } from '@/stores/notifications';
import { computed } from '@vue/reactivity';
import { ElLoading, type UploadFile } from 'element-plus';
import { inject, onBeforeMount, reactive, watchEffect } from 'vue';
import { UploadFilled } from "@element-plus/icons-vue"
import type { TreeNodeData, TreeOptionProps } from "element-plus/es/components/tree/src/tree.type";
import type Node from "element-plus/es/components/tree/src/model/node";
import { ElTreeSelect } from "element-plus"
import { api, ApiProxyKeyOperational, type ApiProxy } from '@/api';
import useCategoryLoader from '@/composables/useCategoryLoader';
import type { ArticleUploadMetadata, Category } from '@/api/dtos';
import dayjs from 'dayjs';
import resolveMetadata from '@/helpers/article-parser.helper';

const props = defineProps<{
    modelValue: boolean,
    metadata?: ArticleUploadMetadata
}>()

const emits = defineEmits<{
    (e: "update:modelValue", val: boolean): void
}>()

const showArticle = computed<boolean>({
    get () {
        return props.modelValue
    },
    set (val) {
        emits("update:modelValue", val)
    }
})

const treeConfiguration: TreeOptionProps = {
    label: "name",
    children: "children",
    isLeaf: (data: TreeNodeData, node: Node) => data.children && data.children.length === 0
}

type UploadContext = {
    content?: File;
    parsing: boolean;
    metadata: ArticleUploadMetadata;
}

const ctxUpload: UploadContext = reactive<UploadContext>({
    parsing: false,
    metadata: {
        title: '',
        desc: '',
        time: 0,
        pinned: false,
        category: '',
        content: ''
    }
})

watchEffect(() => {
    console.log(ctxUpload.metadata.title)
})

const notification = useNotification()

const proxy = inject(ApiProxyKeyOperational) as ApiProxy

const {
    resolver: loadCategory
} = useCategoryLoader(proxy)

const augmentedCategoryResolver = (node: Node, resolve: (data: Category[]) => void) => {
    const transformer = (data: Category[]) => {
        resolve(data.map(v => ({
            ...v,
            value: v.id
        })))
    }

    loadCategory(node, transformer)
}

const confirmResetArticle = () => {
    Object.assign(ctxUpload, {
        content: undefined,
        parsing: false,
        metadata: {
            title: '',
            desc: '',
            date: 0,
            category: ''
        }
    })
}

const confirmPublishArticle = () => {
    const loading = ElLoading.service()
    proxy(api.v1.admin.article().put(ctxUpload.metadata))
        .then(() => {
            showArticle.value = false
            confirmResetArticle()
            loading.close()
        })
}

const handleFileSelect = (uploadFile: UploadFile) => {
    const file = uploadFile.raw as File
    if (file.type !== "text/markdown") {
        notification.push({
            level: "error",
            message: "必须为markdown文件"
        })
        return
    }
    ctxUpload.content = file
    ctxUpload.parsing = true
    resolveMetadata(file)
        .then((metadata) => {
            Object.assign(ctxUpload.metadata, metadata)
            if (!metadata.desc) {
                notification.push({
                    level: "info",
                    message: "未在文章中发现摘要"
                })
            }
        })
        .catch((err) => {
            console.error(err)
            notification.push({
                level: "error",
                message: "读取出错！"
            })
        })
        .finally(() => {
            ctxUpload.parsing = false
        })
}


const publishDateTime = computed<Date>({
    get() {
        return dayjs.unix(ctxUpload.metadata.time).toDate()
    },
    set(val) {
        ctxUpload.metadata.time = dayjs(val).unix()
    }
})

onBeforeMount(() => {
    !props.metadata || Object.assign(ctxUpload.metadata, props.metadata);
})

</script>

<template>
<ElDialog v-model="showArticle" :title="!metadata ? '发布新文章' : '编辑文章'" draggable>
    <ElUpload
        action=""
        drag
        :show-file-list="false"
        :auto-upload="false"
        accept="text/markdown"
        :on-change="handleFileSelect">
        <ElIcon class="el-icon--upload"><UploadFilled/></ElIcon>
        <div class="el-upload__text">
            拖拽文章到此处或点击选择文章
        </div>
        <template #tip>
            <div class="el-upload__tip text-red">
                {{
                    ctxUpload.content ? 
                        `已选择：${ctxUpload.content.name}` : "仅支持 Markdown 文件"
                }}
            </div>
        </template>
    </ElUpload>
    <ElForm v-loading="ctxUpload.parsing" class="mt-8" :model="ctxUpload.metadata">
        <ElFormItem label="文章标题">
            <ElInput v-model="ctxUpload.metadata.title"/>
        </ElFormItem>
        <ElFormItem label="发布时间">
            <ElDatePicker
                v-model="publishDateTime"
                type="datetime"
                placeholder="Select date and time"
            />
        </ElFormItem>
        <ElFormItem label="文章分类">
            <ElTreeSelect v-model="ctxUpload.metadata.category" lazy check-strictly :load="augmentedCategoryResolver" :props="treeConfiguration"></ElTreeSelect>
        </ElFormItem>
        <ElFormItem label="置顶文章">
            <ElSwitch v-model="ctxUpload.metadata.pinned"/>
        </ElFormItem>
        <ElFormItem label="文章摘要">
            <ElInput v-model="ctxUpload.metadata.desc" type="textarea" :rows="8"/>
        </ElFormItem>
    </ElForm>
    <template #footer>
        <div class="template-footer">
            <ElButton type="danger" class="child:text-white float-left" 
                    @click="confirmResetArticle()">重置</ElButton>
            <ElButton type="primary" class="child:text-white" 
                    @click="showArticle = false">稍后发布</ElButton>
            <ElButton type="success" class="child:text-white" 
                    @click="confirmPublishArticle()">
                发布
            </ElButton>
        </div>
    </template>
</ElDialog>
</template>