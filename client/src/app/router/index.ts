import { createRouter, createWebHistory } from 'vue-router'
import { mainRoutes } from './routes/mainRoute'

export const router = createRouter({
  history: createWebHistory(),
  routes: mainRoutes
})