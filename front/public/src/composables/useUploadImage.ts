import { api, ApiProxyKey, type ApiProxy } from "@/api";
import { gatewayAliOSS } from "@/api/gateways";
import type { PostObjectCredential } from "@/helpers";
import { inject, ref } from "vue";

export function useUploadImage() {
    const progress = ref("")

    const proxy = inject(ApiProxyKey) as ApiProxy
    const doUpload = async (files: File[]) => {
        const postObjCred = await proxy(api.v1.admin.img().post<PostObjectCredential>(files.map(v => v.name)))
        if (!postObjCred) {
            return;
        }
        for(let i=0; i < files.length; i++) {
            const f = files[i]
            const cred = postObjCred.credentials[f.name]

            if (!cred) {
                continue
            }

            const uploadForm = new FormData()

            uploadForm.append("key", `${f.name}`)
            uploadForm.append("Content-Disposition", f.name)
            uploadForm.append("OSSAccessKeyId", postObjCred.accessKeyId)
            uploadForm.append("policy", cred.policy)
            uploadForm.append("Signature", cred.signature)
            uploadForm.append("success_action_status", "200")

            uploadForm.append("file", f, f.name)

            progress.value = f.name
            await gatewayAliOSS.postForm('', uploadForm, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
        };
    }

    return {
        progress,
        doUpload
    }
}