<script setup lang="ts">
import { useNotification } from '@/stores/notifications';
import { computed } from '@vue/reactivity';
import { ElLoading, type UploadFile } from 'element-plus';
import { inject, reactive, watchEffect } from 'vue';
import { UploadFilled } from "@element-plus/icons-vue"
import type { TreeNodeData, TreeOptionProps } from "element-plus/es/components/tree/src/tree.type";
import type Node from "element-plus/es/components/tree/src/model/node";
import { ElTreeSelect } from "element-plus"
import { api, ApiProxyKeyOperational, type ApiProxy } from '@/api';
import useCategoryLoader from '@/composables/useCategoryLoader';
import type { ArticleUploadMetadata, Category } from '@/api/dtos';
import dayjs from 'dayjs';

const props = defineProps<{
    modelValue: boolean
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

const agumentedCategoryRsolver = (node: Node, resolve: (data: Category[]) => void) => {
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

const MetadataTitleMarker = "[title]"
const MetadataPinnedMarker = "[pinned]"
const MetadataTimeMarker = "[timestamp]"

function resolveMetadata(file: File) {
    return new Promise<ArticleUploadMetadata>((resolve, reject) => {
        const reader = new FileReader()
        const result: ArticleUploadMetadata = {
            time: 0, title: '', desc: '', pinned: false, category: '', content: ''
        }
        reader.addEventListener("load", (ev) => {
            const content = (ev.target?.result as string) ?? ''
            const lines = content.split('\n')
            let j = 1;

            for(let i = 0; i < Math.min(lines.length, 3); i++, j++) {
                const line = lines[i].trim()
                if (line.startsWith(MetadataTitleMarker)) {
                    result.title = line.slice(MetadataTitleMarker.length).trim()

                }
                else if (line.startsWith(MetadataPinnedMarker)) {
                    result.pinned = true
                }
                else if (line.startsWith(MetadataTimeMarker)) {
                    const timestamp = line.slice(MetadataTitleMarker.length).trim()
                    result.time = parseInt(timestamp)
                }
                else {
                    j--
                }
            }

            let k = j
            for (;k < lines.length; k++) {
                const line = lines[k].trim();
                if (line === "<!--more-->" || line === "---desc---") {
                    result.desc = lines.slice(0, k).join('\n')
                }
            }

            if (result.desc === '' && k === lines.length) {
                result.content = lines.slice(j).join('\n')
            } 
            else {
                result.content = lines.slice(k).join('\n')
            }

            resolve(result)
        })
        reader.readAsText(file)
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

</script>

<template>
<ElDialog v-model="showArticle" title="发布新文章" draggable>
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
            <ElTreeSelect v-model="ctxUpload.metadata.category" lazy check-strictly :load="agumentedCategoryRsolver" :props="treeConfiguration"></ElTreeSelect>
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