import LoginForm from '../../components/LoginForm.vue'

export default {
  data () {
    return {
      isShowLoginForm: false
    }
  },
  components: {
    'login-form': LoginForm
  },
  methods: {
    showLoginForm () {
      this.isShowLoginForm = true
    },
    signup () {
      // Handle the signup logic here
      console.log('Signup button clicked')
    }
  }
}
