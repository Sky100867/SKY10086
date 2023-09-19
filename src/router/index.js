import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/index.vue'

const routes = [
  
  {
    path: '/',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/index.vue'),
    children:[
      {
        path: '/admin',
        name: 'admin',
        component: () => import('../views/admin.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
