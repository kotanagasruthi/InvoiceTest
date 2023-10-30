<template>
  <div class="login-form">

    <fieldset class="login-form-fieldset">
      <legend class="login-form-fieldset-legend">Institute ID*</legend>
      <input type="text" class="login-form-fieldset-input"  v-model="instituteID">
    </fieldset>

    <fieldset class="login-form-fieldset">
      <legend class="login-form-fieldset-legend">Password*</legend>
      <input type="text" class="login-form-fieldset-input"  v-model="institutePassword">
    </fieldset>

    <div v-if="loginErrorMessage">{{loginErrorMessage}}</div>

    <div class="login-form-button" @click="Login()">Login</div>

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
    width: 350px;
    margin: auto;
    &-fieldset {
      border: 1px solid #e0e0e0;
      padding: 5px 10px;
      border-radius: 5px;
      position: relative;
      margin-top: 15px;
      &-legend {
        background-color: #fff;
        padding: 0 5px;
        position: absolute;
        top: -10px;
        left: 10px;
      }

      &-input {
        border: none;
        width: 100%;
        outline: none;
        padding: 8px 0;
      }
    }
    &-button {
      background-color: #000;
      color: #fff;
      padding: 5px 10px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 600;
      margin: 15px auto;
      border-radius: 4px;
      width: 150px;
    }
  }

</style>
