import { api, type ApiProxy } from "@/api";
import type { Category } from "@/api/dtos";
import type Node from "element-plus/es/components/tree/src/model/node";
import { inject, ref } from "vue";

export default function useCategoryLoader(proxy: ApiProxy) {
    const isLoaded = ref(false)
    const resolver = (node: Node, resolve: (data: Category[]) => void) => {
        if (node.level === 0) {
            isLoaded.value = false
            proxy(api.v1.admin.category("0").get<Category>())
                .then((v) => {
                    resolve(v?.children ?? [])
                })
                .finally(() => isLoaded.value = true)
        }
        else {
            proxy(api.v1.admin.category(node.data.id).get<Category>())
                .then((v) => {
                    resolve(v?.children ?? [])
                })
        }
    }
    return { isLoaded, resolver }
}