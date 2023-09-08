/**
 *  注释：展示表格类组件 的路由
 * */
export default {
  path: '/useTable',
  name: 'useTable',
  component: () => import('@/components/Layout/index.vue'),
  redirect: '/useTable/index',
  children: [{
    path: '/useTable/index',
    name: 'useTable',
    component: () => import('@/components/Table/index.vue'),
    meta: {}
  }]
}

