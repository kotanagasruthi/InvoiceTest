<template>
  <div class="login-form">

    <fieldset class="fieldset">
      <legend class="fieldset-legend">Institute ID*</legend>
      <input type="text" class="fieldset-input" v-model="instituteID">
    </fieldset>

    <fieldset class="fieldset">
      <legend class="fieldset-legend">Password*</legend>
      <input type="password" class="fieldset-input" v-model="institutePassword">
    </fieldset>

    <div v-if="loginErrorMessage">{{loginErrorMessage}}</div>

    <button class="normal-button button-margin" @click="Login()">Login</button>

    <toast
      v-if="showToast"
      :status="toastStatus"
      :message="toastMessage"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Toast from '../components/reusable/Toast.vue'
export default {
  components: {
    toast: Toast
  },
  data () {
    return {
      instituteID: '',
      institutePassword: '',
      showToast: false,
      toastStatus: '',
      toastMessage: '',
      loginErrorMessage: ''
    }
  },
  methods: {
    ...mapActions('landing', [ // specify the 'dashboard' namespace
      'validateUserLogin'
    ]),
    Login () {
      console.log('coming to login..')
      this.validateUserLogin({
        institute_id: this.instituteID,
        password: this.institutePassword
      }).then(res => {
        if (res?.response && res.response.status === 401) {
          this.loginErrorMessage = res.response.data.message
        } else {
          this.triggerToast('success', 'Login successful!')
          this.$router.push({ name: 'Dashboard' })
        }
      })
    },
    triggerToast (status, message) {
      this.toastStatus = status
      this.toastMessage = message
      this.showToast = true

      // Optionally, hide after some duration
      setTimeout(() => {
        this.showToast = false
      }, 3000)
    }
  }
}
</script>

<style lang="scss" scoped>
  .login-form {
    width: 600px;
    margin: auto;
  }
</style>
