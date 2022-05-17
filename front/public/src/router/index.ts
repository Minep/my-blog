import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main-page',
      component: () => import("@/views/public/MainPage.vue"),
      children: [
        {
          path: '',
          component: () => import("@/views/public/FeedPage.vue")
        },
        {
          path: 'article/:aid',
          component: () => import("@/views/public/ArticlePage.vue"),
          props: true
        },
        {
          path: 'category',
          component: () => import("@/views/public/CategoryPage.vue"),
          props: route => ({ id: route.query.id ?? "0"})
        }
      ]
    },
    {
      path: '/login',
      component: () => import("@/views/public/LoginPage.vue")
    },
    {
      path: '/admin',
      component: () => import("@/views/admin/MainPage.vue"),
      children: [
        {
          path: "site-stats",
          component: () => import("@/views/admin/SiteStatsPage.vue"),
        },
        {
          path: "my-articles",
          component: () => import("@/views/admin/MyArticlesPage.vue")
        },
        {
          path: "my-imgbed",
          component: () => import("@/views/admin/MyImageBedPage.vue")
        }
      ]
    }
  ]
})

export default router
