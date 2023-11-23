import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import DashboardPage from '../views/DashboardPage.vue'
import ExamsComponent from '../components/Exams.vue'
import TopicsComponent from '../components/Topics.vue'
import InviteesComponent from '../components/Invitees.vue'
import SettingsComponent from '../components/Settings.vue'
import AnalyticsComponent from '../components/Analytics.vue'
import UsersComponent from '../components/Users.vue'
import ExamFormatsComponent from '../components/ExamFormats.vue'
import CreateExamComponent from '../components/CreateExam.vue'

const routes = [
  {
    path: '/:action?',
    name: 'Landing',
    component: LandingPage,
    meta: { breadcrumb: 'Home' }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    redirect: '/dashboard/exams',
    component: DashboardPage,
    meta: { breadcrumb: 'Dashboard' }, // Add breadcrumb meta
    children: [
      // Sub-routes corresponding to the menu items
      {
        path: 'exams',
        name: 'ExamsComponent',
        component: ExamsComponent, // Your actual component
        meta: { breadcrumb: 'Exams' },
        children: [
          {
            path: 'create',
            name: 'CreateExamComponent',
            component: CreateExamComponent,
            meta: { breadcrumb: 'Create Exam' }
          }
        ]
      },
      {
        path: 'exam-formats',
        name: 'ExamFormatsComponent',
        component: ExamFormatsComponent,
        meta: { breadcrumb: 'Exam Formats' }
      },
      {
        path: 'topics',
        name: 'TopicsComponent',
        component: TopicsComponent,
        meta: { breadcrumb: 'Topics' }
      },
      {
        path: 'invitees',
        name: 'InviteesComponent',
        component: InviteesComponent,
        meta: { breadcrumb: 'Candidates' }
      },
      {
        path: 'analytics',
        name: 'AnalyticsComponent',
        component: AnalyticsComponent,
        meta: { breadcrumb: 'Analytics' }
      },
      {
        path: 'users',
        name: 'UsersComponent',
        component: UsersComponent,
        meta: { breadcrumb: 'Users' }
      },
      {
        path: 'settings',
        name: 'SettingsComponent',
        component: SettingsComponent,
        meta: { breadcrumb: 'Settings' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
