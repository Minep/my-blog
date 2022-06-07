import type { ArticleUploadMetadata } from "@/api/dtos"

const MetadataTitleMarker = "[title]"
const MetadataPinnedMarker = "[pinned]"
const MetadataTimeMarker = "[timestamp]"

export default function resolveMetadata(file: File) {
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