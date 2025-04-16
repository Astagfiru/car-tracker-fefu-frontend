import { RouteRecordRaw } from 'vue-router'
import { BASE_PAGE_PATH } from '../config'
import AppLayout from '@/app/layout/AppLayout.vue'
import { MainLayout } from '@/pages/AdminMainPage'

export const mainRoutes: RouteRecordRaw[] = [
  {
    path: BASE_PAGE_PATH,
    component: AppLayout,
    children : [
      {
        path : '',
        name : 'dashboard',
        component : MainLayout
      }
    ]
  }
]