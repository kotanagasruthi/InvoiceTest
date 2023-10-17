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

    <div class="login-form-button" @click="Login()">Login</div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      instituteID: '',
      institutePassword: ''
    }
  },
  methods: {
    Login () {
      console.log('coming to login..')
      axios.post('http://localhost:3000/login', {
        institute_id: this.instituteID,
        password: this.institutePassword
      }).then(res => {
        console.log('login successful', res)
      }).catch(res => {
        console.log('not authorised..')
      })
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
