import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
  {
    path: '/', redirect: '/layout'
  },
  {
    path: "/layout", name: 'layout', component: () => import("@/components/Layout/index.vue"),
  },
  {
    path: "/:pathMatch(.*)", name: "NotFound", component: () => import("@/views/NotFound/index.vue"),
  },
  {
    path: '/showTableComponents',
    name: 'showTableComponents',
    component: () => import(/* webpackChunkName: "showDialogComponents" */ '@/components/Layout/index.vue'),
    redirect: '/showTableComponents/index',
    children: [{
      path: '/showTableComponents/index',
      name: 'showTableComponents',
      component: () => import(/* webpackChunkName: "showDialogComponents" */ '@/views/showTableComponents/index.vue'),
      meta: {}
    }]
  },
  {
    path: '/showDialogComponents',
    name: 'showDialogComponents',
    component: () => import(/* webpackChunkName: "showDialogComponents" */ '@/components/Layout/index.vue'),
    redirect: '/showDialogComponents/index',
    children: [{
      path: '/showDialogComponents/index',
      name: 'showDialogComponents',
      component: () => import(/* webpackChunkName: "showDialogComponents" */ '@/views/showDialogComponents/index.vue'),
      meta: {}
    }]
  }
]

const router = createRouter({
  history: createWebHashHistory(), routes
})

// 动态导入并加载所有路由模块
const modules = await import.meta.glob('./modules/*.js');
Object.keys(modules).forEach(key => {
  const module = modules[key];
  module().then(route => {
    router.addRoute(route.default);
  });
});

export default router




