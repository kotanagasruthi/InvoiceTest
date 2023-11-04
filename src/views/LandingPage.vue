<template>
  <div class="landing-page">
    <div class="landing-page-image">
      <img src="../assets/background_vidyasoft.jpg" alt="Vidhya Soft">
    </div>
    <div class="landing-page-left">
            <div class="landing-page-left-header">
                  <div class="landing-page-left-header-left">
                        <img src="../assets/vidhyasoft_logo.jpg" alt="Logo"/>
                  </div>
                  <div class="landing-page-left-header-right">
                        <button class="normal-button" @click="showLoginForm()">Login</button>
                        <button class="normal-button" @click="signUp()">Sign up</button>
                  </div>
            </div>
            <login-form v-if="$route.params.action === 'login'" />
            <signup-form v-if="$route.params.action === 'signUp'"/>
      </div>
  </div>
</template>

<script src='../components/js/landingPage.js'></script>

<style lang="scss" scoped>
      @import '../styles/landing-page.scss';
</style>
