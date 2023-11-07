import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faSearch, faFileLines, faClipboardQuestion, faUserPlus, faCog, faUsers, faSignOut, faXmark, faTrash, faPlus, faChartSimple } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faUser, faSearch, faFileLines, faClipboardQuestion, faUserPlus, faCog, faUsers, faSignOut, faXmark, faTrash, faPlus, faChartSimple)

const app = createApp(App).use(store).use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.config.globalProperties.$axios = axios
app.mount('#app')
