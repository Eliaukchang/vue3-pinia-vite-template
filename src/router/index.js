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
    path: '/useTable',
    name: 'showTableComponents',
    component: () => import(/* webpackChunkName: "useDialog" */ '@/components/Layout/index.vue'),
    redirect: '/useTable/index',
    children: [{
      path: '/useTable/index',
      name: 'useTable',
      component: () => import(/* webpackChunkName: "useDialog" */ '@/views/useTable/index.vue'),
      meta: {}
    }]
  },
  {
    path: '/useDialog',
    name: 'showDialogComponents',
    component: () => import(/* webpackChunkName: "useDialog" */ '@/components/Layout/index.vue'),
    redirect: '/useDialog/index',
    children: [{
      path: '/useDialog/index',
      name: 'useDialog',
      component: () => import(/* webpackChunkName: "useDialog" */ '@/views/useDialog/index.vue'),
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
    console.log("route.default", route.default)
    router.addRoute(route.default);
  });
});

export default router




