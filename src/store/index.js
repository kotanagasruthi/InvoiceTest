import { createStore } from 'vuex'
import landing from './modules/landing'
import dashboard from './modules/dashboard'

export default createStore({
  modules: {
    landing,
    dashboard
  }
})
