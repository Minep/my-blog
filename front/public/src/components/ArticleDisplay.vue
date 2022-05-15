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
    nextTick(()=>renderMath())
    return html
})

</script>

<template>
    <section class="md-region box-border 
                    before:block before:bg-black before:p-1
                    after:inline-block after:float-right after:bg-black after:p-1.5" 
            v-html="displayable">
    </section>
</template>