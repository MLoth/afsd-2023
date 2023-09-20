import { createRouter, createWebHistory } from 'vue-router'

import Birds from '../views/Birds.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/Dashboard.vue'),
    },

    {
      path: '/birds',
      component: () => import('../views/birds/index.vue'),
    },
    {
      path: '/birds/:slug',
      component: () => import('../views/birds/_slug.vue'),
    },

    {
      path: '/observations',
      component: () => import('../views/observations/index.vue'),
      meta: { shouldBeAuthenticated: true },
    },

    {
      path: '/account',
      component: () => import('../views/Account.vue'),
      meta: { shouldBeAuthenticated: true },
    },

    {
      path: '/auth',
      component: () => import('../components/wrappers/AuthWrap.vue'),
      children: [
        {
          path: 'login',
          component: () => import('../views/auth/Login.vue'),
        },

        {
          path: 'register',
          component: () => import('../views/auth/Register.vue'),
        },

        {
          path: 'forgot-password',
          component: () => import('../views/auth/ForgotPassword.vue'),
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
