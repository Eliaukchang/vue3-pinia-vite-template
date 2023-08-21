/**
 *  注释：展示表格类组件 的路由
 * */
export default {
  path: '/showTableComponents',
  name: 'showTableComponents',
  component: () => import('@/components/Layout/index.vue'),
  redirect: '/showTableComponents/index',
  children: [{
    path: '/showTableComponents/index',
    name: 'showTableComponents',
    component: () => import('@/views/showTableComponents/index.vue'),
    meta: {}
  }]
}

