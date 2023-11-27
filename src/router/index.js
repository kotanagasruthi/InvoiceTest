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
import ExamInviteesComponent from '../components/ExamInvitees.vue'
import CreateExamFormatComponent from '../components/CreateExamFormat.vue'
import SubTopicsComponent from '../components/SubTopics.vue'
import TopicQuestionsComponent from '../components/TopicQuestions.vue'
import store from '../store'

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
    meta: { breadcrumb: 'Dashboard', requiresAuth: true }, // Add breadcrumb meta
    children: [
      // Sub-routes corresponding to the menu items
      {
        path: 'exams',
        name: 'ExamsComponent',
        component: ExamsComponent, // Your actual component
        meta: { breadcrumb: 'Exams', requiresAuth: true },
        children: [
          {
            path: 'create',
            name: 'CreateExamComponent',
            component: CreateExamComponent,
            meta: { breadcrumb: 'Create Exam', requiresAuth: true }
          },
          {
            path: 'invite/:examId?',
            name: 'ExamInviteesComponent',
            component: ExamInviteesComponent,
            meta: { breadcrumb: 'Exam Invitees', requiresAuth: true }
          }
        ]
      },
      {
        path: 'exam-formats',
        name: 'ExamFormatsComponent',
        component: ExamFormatsComponent,
        meta: { breadcrumb: 'Exam Formats', requiresAuth: true },
        children: [
          {
            path: 'create-format',
            name: 'CreateExamFormatComponent',
            component: CreateExamFormatComponent,
            meta: { breadcrumb: 'Create Exam Format', requiresAuth: true }
          }
        ]
      },
      {
        path: 'topics',
        name: 'TopicsComponent',
        component: TopicsComponent,
        meta: { breadcrumb: 'Topics', requiresAuth: true },
        children: [
          {
            path: ':topic?/sub-topics',
            name: 'SubTopicsComponent',
            component: SubTopicsComponent,
            meta: { breadcrumb: '{topic}', requiresAuth: true },
            children: [
              {
                path: ':subTopic?/questions',
                name: 'TopicQuestionsComponent',
                component: TopicQuestionsComponent,
                meta: { breadcrumb: '{subTopic}', requiresAuth: true }
              }
            ]
          }
        ]
      },
      {
        path: 'invitees',
        name: 'InviteesComponent',
        component: InviteesComponent,
        meta: { breadcrumb: 'Candidates', requiresAuth: true }
      },
      {
        path: 'analytics',
        name: 'AnalyticsComponent',
        component: AnalyticsComponent,
        meta: { breadcrumb: 'Analytics', requiresAuth: true }
      },
      {
        path: 'users',
        name: 'UsersComponent',
        component: UsersComponent,
        meta: { breadcrumb: 'Users', requiresAuth: true }
      },
      {
        path: 'settings',
        name: 'SettingsComponent',
        component: SettingsComponent,
        meta: { breadcrumb: 'Settings', requiresAuth: true }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (!requiresAuth || Object.keys(store.state?.landing?.loggedInUser).length) {
    next()
  } else {
    store.watch(
      (state) => Object.keys(state?.landing?.loggedInUser).length,
      (loaded) => {
        if (loaded) next()
      }
    )
  }
})

export default router
