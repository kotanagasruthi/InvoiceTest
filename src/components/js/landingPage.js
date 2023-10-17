import LoginForm from '../../components/LoginForm.vue'
import SignUp from '../../components/SignUp.vue'

export default {
  data () {
    return {
      isShowLoginForm: false,
      isShowSignUpForm: false
    }
  },
  components: {
    'login-form': LoginForm,
    'signup-form': SignUp
  },
  methods: {
    showLoginForm () {
      this.$router.push({
        name: 'Landing',
        params: {
          action: 'login'
        }
      })
      // this.isShowLoginForm = true
      // this.isShowSignUpForm = false
    },
    signUp () {
      // Handle the signup logic here
      this.$router.push({
        name: 'Landing',
        params: {
          action: 'signUp'
        }
      })
      // this.isShowSignUpForm = true
      // this.isShowLoginForm = false
    }
  }
}
