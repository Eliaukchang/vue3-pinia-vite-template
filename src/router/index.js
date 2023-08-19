import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/layout'
  },
  {
    path: "/layout",
    name: 'layout',
    component: () => import("@/components/Layout/index.vue"),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: "/:pathMatch(.*)",
    name: "NotFound",
    component: () => import("@/views/NotFound/index.vue"),
  },
  {
    path: "/popoverOptions",
    name: 'popoverOptions',
    component: () => import("@/views/Test/TestPopoverOptions.vue"),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
