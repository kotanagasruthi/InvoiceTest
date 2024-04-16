import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import InvoiceDetail from '../views/InvoiceDetail.vue'

const routes = [
  {
    path: '/:action?',
    name: 'Landing',
    component: LandingPage,
    meta: { breadcrumb: 'Home' }
  },
  {
    path: '/InvoiceDetailComponent/:id?',
    name: 'invoice-detail',
    component: InvoiceDetail
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
