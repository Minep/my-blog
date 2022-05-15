import '@/assets/base.css';
import '@/assets/md-style.css';
import '@/assets/loaders.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import MarkdownIt from 'markdown-it'
import MarkdownItContainer from 'markdown-it-container'
import anchor from 'markdown-it-anchor';
import customCodeFence from "@/helpers/code-fence"
import App from './App.vue'
import router from './router'


import { makeServer } from '@/server';
import { createApiProxy } from '@/api';

if (process.env.NODE_ENV !== "production") {
    makeServer()
}

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.provide("md", 
    new MarkdownIt()
        .use(MarkdownItContainer, 'tip')
        .use(MarkdownItContainer, 'aside')
        .use(MarkdownItContainer, 'important')
        .use(anchor)
        .use(customCodeFence))

app.provide("api-proxy", createApiProxy())

app.mount('#app')
