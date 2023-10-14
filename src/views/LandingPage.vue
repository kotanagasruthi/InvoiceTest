<template>
  <div class="landing-page">
      <div class="landing-page-left">
            <div class="landing-page-left-header">
                  <div class="landing-page-left-header-left">
                        <img src="../assets/vidhyasoft_logo.jpg" alt="Logo"/>
                  </div>
                  <div class="landing-page-left-header-right">
                        <button class="landing-page-left-header-right-login" @click="showLoginForm()">Login</button>
                        <button class="landing-page-left-header-right-signup">Sign up</button>
                  </div>
            </div>
            <login-form v-if="isShowLoginForm" />
      </div>

    <div class="landing-page-image">
      <img src="../assets/background_vidyasoft.jpg" alt="Vidhya Soft">
    </div>
  </div>
</template>

<script src='../components/js/landingPage.js'></script>

<style lang="scss" scoped>
      @import '../styles/landing-page.scss';
</style>
