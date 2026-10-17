import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import UploadView from '../views/UploadView.vue'
import RelatoriosView from '../views/RelatoriosView.vue'
import GraficosView from '../views/GraficosView.vue'
import AppLayout from '../components/AppLayout.vue'
import RegisterView from '../views/RegisterView.vue'

const routes = [

  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
    path: '/login',
    name: 'login',
    component: LoginView
  },

  {
    path: '/cadastro',
    name: 'cadastro',
    component: RegisterView
  },

  {
    path: '/dashboard',
    component: AppLayout,
    meta: { requiresAuth: true },

    children: [

      {
        path: '',
        name: 'dashboard',
        component: DashboardView
      },

      {
        path: '/upload',
        name: 'upload',
        component: UploadView
      },

      {
        path: '/relatorios',
        name: 'relatorios',
        component: RelatoriosView
      },

      {
        path: '/graficos',
        name: 'graficos',
        component: GraficosView
      }

    ]

  }

]

const router = createRouter({

  history: createWebHistory(),

  routes

})

router.beforeEach((to) => {
  const token = localStorage.getItem('token')
  if (to.matched.some((route) => route.meta.requiresAuth) && !token) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  if ((to.name === 'login' || to.name === 'cadastro') && token) {
    return { name: 'dashboard' }
  }
})

export default router
