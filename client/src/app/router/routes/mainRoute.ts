import { RouteRecordRaw } from 'vue-router'
import { BASE_PAGE_PATH } from '../config'
import AppLayout from '@/app/layout/AppLayout.vue'

export const mainRoutes: RouteRecordRaw[] = [
  {
    path: BASE_PAGE_PATH,
    component: AppLayout,
  }
]