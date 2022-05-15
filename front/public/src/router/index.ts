import { createRouter, createWebHistory } from 'vue-router'

import MainPageVue from '@/views/MainPage.vue'
import ArticlePageVue from '@/views/ArticlePage.vue'
import CategoryPageVue from '@/views/CategoryPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main-page',
      component: MainPageVue
    },
    {
      path: '/article/:aid',
      component: ArticlePageVue,
      props: true
    },
    {
      path: '/category',
      component: CategoryPageVue,
      props: route => ({ id: route.query.id ?? "0"})
    }
  ]
})

export default router
