import { createApp } from 'vue'
import { createPinia } from 'pinia'
import MarkdownIt from 'markdown-it'
import MarkdownItContainer from 'markdown-it-container'
import anchor from 'markdown-it-anchor';
import customCodeFence from "@/helpers/code-fence"
import App from './App.vue'
import router from './router'
// @ts-ignore 
import * as markdownitMathjax from 'markdown-it-mathjax'


import { makeServer } from '@/server';
import { ApiProxyKey, ApiProxyKeyOperational, createApiProxy, createOperationalApiProxy } from '@/api';

import '@/assets/base.css';
import '@/assets/md-style.css';
import '@/assets/loaders.css';

if (process.env.NODE_ENV !== "production") {
    // makeServer()
}

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.provide("md", 
    new MarkdownIt({
        html: true
    })
        .use(MarkdownItContainer, 'tip')
        .use(MarkdownItContainer, 'aside')
        .use(MarkdownItContainer, 'important')
        .use(anchor)
        .use(markdownitMathjax())
        .use(customCodeFence))

app.provide(ApiProxyKey, createApiProxy())
app.provide(ApiProxyKeyOperational, createOperationalApiProxy())

app.mount('#app')
