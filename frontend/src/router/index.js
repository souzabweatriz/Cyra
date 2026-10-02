import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import UploadView from '../views/UploadView.vue'
import RelatoriosView from '../views/RelatoriosView.vue'
import GraficosView from '../views/GraficosView.vue'
import AppLayout from '../components/AppLayout.vue'
import { createPinia } from 'pinia'

const pinia = createPinia()

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
    path: '/dashboard',
    component: AppLayout,

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

export default router
