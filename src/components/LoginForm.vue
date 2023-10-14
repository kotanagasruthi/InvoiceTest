<template>
  <div class="custom-input-box">
    <fieldset>
      <legend>Email</legend>
      <input type="email">
    </fieldset>
  </div>
</template>

<script>
export default {
  // Your component logic here
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
  /* font-weight: bold; */
  background-color: #fff; /* This will ensure the legend has the same background as its parent container */
  padding: 0 5px; /* Adds a little spacing around the legend text */
  position: absolute; /* Takes the legend out of the flow */
  top: -10px; /* Moves it up to be centered over the top border */
  left: 10px; /* Small left spacing */
}

input[type="email"] {
  border: none; /* Remove default input borders */
  width: 100%; /* Make input take full width */
  outline: none; /* Remove focus outline for aesthetics */
  padding: 5px 0; /* Add a little vertical padding */
}
</style>
