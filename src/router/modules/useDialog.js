/**
 *  注释：展示弹窗类组件 的路由
 * */
export default {
  path: '/useDialog',
  name: 'showDialogComponents',
  component: () => import('@/components/Layout/index.vue'),
  redirect: '/useDialog/index',
  children: [{
    path: '/useDialog/index',
    name: 'useDialog',
    component: () => import('@/views/useDialog/index.vue'),
    meta: {}
  }]
}

