<script setup lang="ts">
import { api, ApiProxyKeyOperational, type ApiProxy } from "@/api";
import useCategoryLoader from "@/composables/useCategoryLoader";
import { useNotification } from "@/stores/notifications";
import {
    Delete,
    Plus
} from "@element-plus/icons-vue"
import type Node from "element-plus/es/components/tree/src/model/node";
import type { TreeOptionProps } from "element-plus/es/components/tree/src/tree.type";
import type { TreeNodeData } from "element-plus/lib/components/tree/src/tree.type";
import { inject, reactive } from "vue";
import AddChild from "@/components/icons/AddChild.vue";
import { ElMessageBox } from "element-plus";
import "element-plus/es/components/message-box/style/css"

const emit = defineEmits<{
    (e: "selection", value: string[]): void
}>()

const treeConfiguration: TreeOptionProps = {
    label: "name",
    children: "children",
    isLeaf: (data: TreeNodeData, node: Node) => data.children && data.children.length === 0
}

const notification = useNotification()

const dialogState = reactive({
    onAdd: {
        shown: false,
        selectedName: "",
        selectedCid: "",
        nameToAdd: "",
        addAsSibling: false,
        loading: false,
        parentCid: ""
    },
    onDelete: {
        shown: false,
        ofName: "",
        cidToDelete: "",
        loading: false
    }
})

const proxy = inject(ApiProxyKeyOperational) as ApiProxy

const {
    resolver: loadCategory
} = useCategoryLoader(proxy)

function requestAdd(underNode: Node, addAsSibling = false) {
    dialogState.onAdd.shown = true
    dialogState.onAdd.selectedName = underNode.data.name
    dialogState.onAdd.selectedCid = underNode.data.id
    dialogState.onAdd.nameToAdd = ""
    dialogState.onAdd.addAsSibling = addAsSibling
    dialogState.onAdd.parentCid = underNode.parent.data.id ?? "0"
}

function requestDelete(ofNode: Node) {
    dialogState.onDelete.shown = true
    dialogState.onDelete.ofName = ofNode.data.name
    dialogState.onDelete.cidToDelete = ofNode.data.id
}

function confirmDelete() {
    dialogState.onDelete.loading = true
    proxy(
        api.v1.admin.category(dialogState.onDelete.cidToDelete).delete()
    ).finally(() => {
        dialogState.onDelete.shown = false
        dialogState.onDelete.loading = false
    })
}

function confirmAdd() {
    if (!dialogState.onAdd.nameToAdd) {
        notification.push({
            level: "warn",
            message: "名称不能为空"
        })
        return
    }
    dialogState.onAdd.loading = true

    const target = dialogState.onAdd.addAsSibling ? dialogState.onAdd.parentCid : dialogState.onAdd.selectedCid
    proxy(api.v1.admin.category(target).put({
        name: dialogState.onAdd.nameToAdd
    })).finally(() => {
        dialogState.onAdd.shown = false
        dialogState.onAdd.loading = false
    })
}

function onCheck(node: Node, checkStatus: { checkedNodes: TreeNodeData[] }) {
    emit("selection", checkStatus.checkedNodes.map((v) => v.id))
}
</script>

<template>
    <div class="flex flex-col">
        <p class="mb-4">文章类别</p>
        <div class="grow overflow-y-auto">
            <ElTree show-checkbox lazy :load="loadCategory" @check="onCheck" :props="treeConfiguration" check-strictly>
                <template #default="{ node, data }">
                    <div class="flex justify-between w-full">
                        <span>{{ node.label }}</span>
                        <span class="space-x-1">
                            <!-- <ElTooltip placement="bottom" content="添加父级分类">
                                <a @click.stop="requestAdd(node)"> <ElIcon><AddParent/></ElIcon> </a>
                            </ElTooltip> -->
                            <ElTooltip v-if="node.parent.id" placement="left" content="添加同级分类">
                                <a @click.stop="requestAdd(node, true)"> <ElIcon><Plus/></ElIcon> </a>
                            </ElTooltip>
                            <ElTooltip placement="bottom" content="添加子级分类">
                                <a @click.stop="requestAdd(node)"> <ElIcon><AddChild/></ElIcon> </a>
                            </ElTooltip>
                            <ElTooltip v-if="node.parent.id" placement="right" content="删除此分类">
                                <a @click.stop="requestDelete(node)"> <ElIcon color="#F56C6C"><Delete/></ElIcon> </a>
                            </ElTooltip>
                        </span>
                    </div>
                </template>
            </ElTree>
        </div>
        <ElDialog v-model="dialogState.onAdd.shown" title="添加分类">
            <template #header="{ close, titleId, titleClass }">
            </template>
            <div class="space-y-3">
                <p>
                    添加一个新分类，使其是 {{ dialogState.onAdd.selectedName }}
                    <span class="text-slate-500 rounded-md bg-slate-200 px-1">#{{ dialogState.onAdd.selectedCid }}</span>
                    的<b>{{ !dialogState.onAdd.addAsSibling ? "子级分类" : "同级分类" }}</b>。请输入新分类的名称
                </p>
                <ElInput class="px-3" placeholder="分类名称" v-model="dialogState.onAdd.nameToAdd"></ElInput>
            </div>
            <template #footer>
                <div class="template-footer">
                    <ElButton type="primary" class="child:text-white" 
                            @click="confirmAdd"
                            :loading="dialogState.onAdd.loading">确认添加</ElButton>
                </div>
            </template>
        </ElDialog>
        <ElDialog v-model="dialogState.onDelete.shown" title="删除类别">
            <template #header="{ close, titleId, titleClass }">
            </template>
            <div class="space-y-3">
                <p>
                    即将删除类别 {{ dialogState.onDelete.ofName }}
                    <span class="text-slate-500 rounded-md bg-slate-200 px-1">
                        #{{ dialogState.onDelete.cidToDelete }}
                    </span>。
                    这回导致所有该分类下的文章（包括子分类）移动到主分类下。
                </p>
            </div>
            <template #footer>
                <div class="template-footer">
                    <ElButton type="primary" class="child:text-white" 
                            @click="dialogState.onDelete.shown = false">取消</ElButton>
                    <ElButton type="danger" class="child:text-white" 
                            @click="confirmDelete"
                            :loading="dialogState.onDelete.loading">确认删除</ElButton>
                </div>
            </template>
        </ElDialog>
    </div>
</template>