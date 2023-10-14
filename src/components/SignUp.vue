<template>
  <div class="signup-form">
    <fieldset class="signup-form-fieldset">
      <legend class="signup-form-fieldset-legend">Name*</legend>
      <input type="text" class="signup-form-fieldset-input" v-model="instituteName">
    </fieldset>

    <fieldset class="signup-form-fieldset">
      <legend class="signup-form-fieldset-legend">Email*</legend>
      <input type="email" class="signup-form-fieldset-input" v-model="instituteEmail">
    </fieldset>

    <fieldset class="signup-form-fieldset">
      <legend class="signup-form-fieldset-legend">Phone Number*</legend>
      <input type="text" class="signup-form-fieldset-input" v-model="institutePhoneNumber">
    </fieldset>

    <fieldset class="signup-form-fieldset">
      <legend class="signup-form-fieldset-legend">Password*</legend>
      <input type="password" class="signup-form-fieldset-input" v-model="institutePassword">
    </fieldset>

    <fieldset class="signup-form-fieldset">
      <legend class="signup-form-fieldset-legend">Website*</legend>
      <input type="text" class="signup-form-fieldset-input" v-model="instituteWebsite">
    </fieldset>

     <fieldset class="signup-form-fieldset">
      <legend class="signup-form-fieldset-legend">Address*</legend>
      <textarea class="signup-form-fieldset-input" v-model="instituteAddress" />
    </fieldset>

    <div class="signup-form-image">
      <fieldset class="signup-form-image-fieldset">
        <legend class="signup-form-image-fieldset-legend">Logo*</legend>
          <label class="signup-form-image-fieldset-legend-label" @click="triggerFileInput">
            <input type="file" ref="imageUploader" @change="handleImageUpload" class="signup-form-image-fieldset-legend-label-input">
          </label>
      </fieldset>
      <img v-if="imageSrc" :src="imageSrc" alt="Uploaded Image" class="signup-form-image-uploaded"/>
    </div>

    <!-- <div class="image-upload-container">
      <label class="input-box" @click="triggerFileInput">
        Upload Logo*
        <input type="file" ref="imageUploader" @change="handleImageUpload" class="file-input">
      </label>
      <img v-if="imageSrc" :src="imageSrc" alt="Uploaded Image" class="uploaded-image"/>
    </div> -->
    <div class="signup-form-button">Sign Up</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      instituteName: '',
      instituteEmail: '',
      institutePhoneNumber: '',
      institutePassword: '',
      instituteWebsite: '',
      instituteAddress: '',
      imageSrc: null
    }
  },
  methods: {
    triggerFileInput () {
      this.$refs.imageUploader.click()
    },
    handleImageUpload () {
      const file = this.$refs.imageUploader.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = e => {
          this.imageSrc = e.target.result
        }
        reader.readAsDataURL(file)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .signup-form {
    width: 350px;
    margin: auto;
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
    &-image {
      display: flex;
      align-items: center;
      width: inherit;
    &-fieldset {
        border: 1px solid #e0e0e0;
        padding: 5px 10px;
        border-radius: 5px;
        position: relative;
        margin-top: 15px;
        height: 30px;
        width: 300px;
        &-legend {
          background-color: #fff;
          padding: 0 5px;
          position: absolute;
          top: -10px;
          left: 10px;
          &-label {
            display: inline-block;
            width: inherit;
            padding: 5px 10px;
            text-align: center;
            cursor: pointer;
            position: relative;
            margin-right: 10px;
            &-input {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              opacity: 0;
              cursor: pointer;
            }
          }
        }
      }
      &-uploaded {
        max-width: 100px;
        max-height: 100px;
      }
    }
  }
.image-upload-container {
  display: flex;
  align-items: center;
  margin-top: 15px;
  width: 360px;
}

.input-box {
  display: inline-block;
  width: 200px;
  border: 1px solid #e0e0e0;
  padding: 5px 10px;
  text-align: center;
  cursor: pointer;
  position: relative;
  // background-color: #f9f9f9;
  margin-right: 10px;
  height: 30px;
  border-radius: 4px;
  width: 360px;
  text-align: left;
}

.file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.uploaded-image {
  max-width: 100px;
  max-height: 100px;
}
</style>
