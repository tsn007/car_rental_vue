import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ReserveView from '@/views/ReserveView.vue'
import AdminLogin from '@/views/AdminLogin.vue'
import Reservations from '@/views/AdminDashboard.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/reserve', component: ReserveView },
  { path: '/login', component: AdminLogin },
  { path: '/admin', component: Reservations }
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})
