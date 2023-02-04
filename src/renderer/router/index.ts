import { createRouter, createWebHashHistory } from 'vue-router/dist/vue-router.esm-bundler'
import Home from '@/renderer/pages/Home/Home.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})
