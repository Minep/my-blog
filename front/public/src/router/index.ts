import { useIdentity } from '@/stores/identity'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})
export default router


router.beforeEach((to, from) => {
  const identity = useIdentity()
  if (to.path.startsWith("/admin") && !identity.hasIdentity) {
    return {
      name: "Login"
    }
  }
  return true
})