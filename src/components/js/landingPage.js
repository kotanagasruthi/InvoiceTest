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
      this.isShowLoginForm = true
      this.isShowSignUpForm = false
    },
    signup () {
      // Handle the signup logic here
      this.isShowSignUpForm = true
      this.isShowLoginForm = false
    }
  }
}
