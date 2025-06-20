import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ReserveView from '@/views/ReserveView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/reserve', component: ReserveView }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
