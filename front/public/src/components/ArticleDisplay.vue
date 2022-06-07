<script setup lang="ts">
import type MarkdownIt from 'markdown-it';
import { renderMath } from '@/helpers/mathjax';
import { inject, computed, nextTick, ref } from 'vue';

const prop = defineProps<{
    content: string
}>()

const md: MarkdownIt = inject("md") as MarkdownIt
const displayArea = ref<HTMLDivElement>()

const displayable = computed(() => {
    const html = md.render(prop.content)
    nextTick().then(() => {
        setTimeout(async () => {
            await renderMath()
        }, 5)
    })
    return html
})

</script>

<template>
    <article class="md-region box-border 
                    before:block before:bg-black before:p-1 before:mb-5
                    prose prose-paper prose-xl max-w-none prose-blockquote:border-0
                    after:inline-block after:float-right after:bg-black after:p-1.5" 
            ref="displayArea"
            v-html="displayable">
    </article>
</template>