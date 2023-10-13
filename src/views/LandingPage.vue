<template>
  <div class="dashboard">
    <div class="half image-side">
      <img src="path_to_your_image.jpg" alt="Image Description">
    </div>
    <div class="half content-side">
      <img src="path_to_vidhyasoft_logo.png" alt="VidhyaSoft Logo" class="company-logo">
      <h1>VidhyaSoft</h1>
      <button @click="login">Login</button>
      <button @click="signup">Signup</button>
    </div>
  </div>
</template>

<script src='../components/js/landingPage.js'></script>

<style scoped>
      @import '../styles/landing-page.scss';
</style>
