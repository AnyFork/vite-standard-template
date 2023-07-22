import { type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw = {
    name: 'index',
    path: '/',
    component: async () => await import('../../views/index.vue')
}
export default routes
