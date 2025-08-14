import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Detail_Pokemon from '@/views/Detail_Pokemon.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/pokemon/:id',
      name: '/pokemon-detail',
      component: Detail_Pokemon,
      props: true
    },
  ],
})

export default router
