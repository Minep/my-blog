import type { RouteRecordRaw } from "vue-router"

const routes: RouteRecordRaw[] = [
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
      name: "Login",
      component: () => import("@/views/public/LoginPage.vue")
    },
    {
      path: '/admin',
      component: () => import("@/views/admin/MainPage.vue"),
      children: [
        {
          path: '',
          component: () => import("@/views/admin/WelcomePage.vue")
        },
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

export default routes;