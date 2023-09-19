import { createRouter, createWebHistory } from 'vue-router'

import Birds from '../views/Birds.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/Home.vue'),
    },

    {
      path: '/birds',
      component: () => import('../views/Birds.vue'),
    },

    {
      path: '/observations',
      component: () => import('../views/ObservationsWrapper.vue'),
      children: [
        {
          path: '',
          component: () => import('../views/Observations.vue'),
        },

        {
          path: 'new',
          component: () => import('../views/ObservationNew.vue'),
        },

        {
          path: ':id',
          component: () => import('../views/Observation.vue'),
        },
      ],
    },

    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFound.vue'),
    },
  ],
})

export default router
