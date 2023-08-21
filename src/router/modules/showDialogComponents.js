/**
 *  注释：展示弹窗类组件 的路由
 * */
export default {
  path: '/showDialogComponents',
  name: 'showDialogComponents',
  component: () => import('@/components/Layout/index.vue'),
  redirect: '/showDialogComponents/index',
  children: [{
    path: '/showDialogComponents/index',
    name: 'showDialogComponents',
    component: () => import('@/views/showDialogComponents/index.vue'),
    meta: {}
  }]
}

