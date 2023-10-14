<template>
  <div class="custom-input-box">
    <fieldset>
      <legend>Name</legend>
      <input type="text" v-model="instituteName">
    </fieldset>

    <fieldset>
      <legend>Email</legend>
      <input type="email" v-model="instituteEmail">
    </fieldset>

    <fieldset>
      <legend>Phone Number</legend>
      <input type="text">
    </fieldset>

    <fieldset>
      <legend>Password</legend>
      <input type="password">
    </fieldset>

    <fieldset>
      <legend>Website</legend>
      <input type="text">
    </fieldset>

    <fieldset>
      <legend>Logo</legend>
      <input type="password">
    </fieldset>

    <fieldset>
      <legend>Address</legend>
      <textarea />
    </fieldset>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .custom-input-box {
    width: 300px;
  }

  fieldset {
    border: 1px solid #e0e0e0;
    padding: 5px 10px;
    border-radius: 5px;
    position: relative;
  }

  legend {
     font-weight: bold;
    background-color: #fff; 
    padding: 0 5px; 
    position: absolute;
    top: -10px; 
    left: 10px; 
  }

  input {
    border: none; 
    width: 100%; 
    outline: none; 
    padding: 5px 0; 
  }
</style>