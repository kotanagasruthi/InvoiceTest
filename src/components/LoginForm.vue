<template>
  <div class="login-form">

     <fieldset class="fieldset">
    <legend class="fieldset-legend">Institute*</legend>
    <select v-model="selectedInstitute" class="fieldset-input">
      <option v-for="institute in institutes" :key="institute._id" :value="institute._id">{{ institute.name }}</option>
    </select>
  </fieldset>

    <fieldset class="fieldset">
      <legend class="fieldset-legend">Username*</legend>
      <input type="text" class="fieldset-input" v-model="username">
    </fieldset>

    <fieldset class="fieldset">
      <legend class="fieldset-legend">Password*</legend>
      <input type="password" class="fieldset-input" v-model="password">
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
import { mapActions, mapGetters } from 'vuex'
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
      loginErrorMessage: '',
      institutes: ''
    }
  },
  methods: {
    ...mapGetters('landing', [
      'allAvailableInstitutes'
    ]),
    ...mapActions('landing', [ // specify the 'dashboard' namespace
      'validateUserLogin',
      'getInstitutes'
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
  },
  created () {
    this.getInstitutes().then(res => {
      this.institutes = this.allAvailableInstitutes
      console.log(this.institutes)
    })
  }
}
</script>

<style lang="scss" scoped>
  .login-form {
    width: 600px;
    margin: auto;
  }
</style>
<!-- tCa7DZKmx -->
<!-- sruthi -->
