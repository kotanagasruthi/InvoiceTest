<template>
  <div class="signup-form">
    <fieldset class="fieldset">
      <legend class="fieldset-legend">Name*</legend>
      <input type="text" class="fieldset-input" v-model="instituteName">
    </fieldset>

    <fieldset class="fieldset">
      <legend class="fieldset-legend">Email*</legend>
      <input type="email" class="fieldset-input" v-model="instituteEmail">
    </fieldset>

    <fieldset class="fieldset">
      <legend class="fieldset-legend">Phone Number*</legend>
      <input type="text" class="fieldset-input" v-model="institutePhoneNumber">
    </fieldset>

    <fieldset class="fieldset">
      <legend class="fieldset-legend">Password*</legend>
      <input type="password" class="fieldset-input" v-model="institutePassword">
    </fieldset>

    <fieldset class="fieldset">
      <legend class="fieldset-legend">Website*</legend>
      <input type="text" class="fieldset-input" v-model="instituteWebsite">
    </fieldset>

    <div class="address">
      <fieldset class="fieldset small">
          <legend class="fieldset-legend">Street*</legend>
          <input type="text" class="fieldset-input" name="street" v-model="instituteStreet">
      </fieldset>

      <fieldset class="fieldset small">
          <legend class="fieldset-legend">House Number*</legend>
          <input type="text" class="fieldset-input" name="house_number"  v-model="instituteHouseNumber">
      </fieldset>

      <fieldset class="fieldset small">
          <legend class="fieldset-legend">Landmark*</legend>
          <input type="text" class="fieldset-input" name="landmark" v-model="instituteLandmark">
      </fieldset>

      <fieldset class="fieldset small">
          <legend class="fieldset-legend">Pincode*</legend>
          <input type="number" class="fieldset-input" name="pincode" v-model="institutePinCode">
      </fieldset>

      <fieldset class="fieldset small">
          <legend class="fieldset-legend">State*</legend>
          <input type="text" class="fieldset-input" name="state" v-model="instituteState">
      </fieldset>

      <fieldset class="fieldset small">
          <legend class="fieldset-legend">City*</legend>
          <input type="text" class="fieldset-input" name="city" v-model="instituteCity">
      </fieldset>

      <fieldset class="fieldset small">
          <legend class="fieldset-legend">Country*</legend>
          <input type="text" class="fieldset-input" name="country" v-model="instituteCountry">
      </fieldset>
      <button class="normal-button" @click="signUp()">Sign Up</button>
    </div>

    <!-- <div class="signup-form-image">
      <fieldset class="signup-form-image-fieldset">
        <legend class="signup-form-image-fieldset-legend">Logo*</legend>
          <label class="signup-form-image-fieldset-legend-label" @click="triggerFileInput">
            <input type="file" ref="imageUploader" @change="handleImageUpload" class="signup-form-image-fieldset-legend-label-input">
          </label>
      </fieldset>
      <img v-if="imageSrc" :src="imageSrc" alt="Uploaded Image" class="signup-form-image-uploaded"/>
    </div> -->

    <!-- <div class="image-upload-container">
      <label class="input-box" @click="triggerFileInput">
        Upload Logo*
        <input type="file" ref="imageUploader" @change="handleImageUpload" class="file-input">
      </label>
      <img v-if="imageSrc" :src="imageSrc" alt="Uploaded Image" class="uploaded-image"/>
    </div> -->
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import toastMixin from '../mixins/toast'
export default {
  data () {
    return {
      instituteName: '',
      instituteEmail: '',
      institutePhoneNumber: '',
      institutePassword: '',
      instituteWebsite: '',
      instituteAddress: '',
      instituteStreet: '',
      instituteHouseNumber: '',
      instituteLandmark: '',
      institutePinCode: '',
      instituteState: '',
      instituteCity: '',
      instituteCountry: '',
      imageSrc: null,
      showToast: false,
      toastStatus: '',
      toastMessage: ''
    }
  },
  mixins: [toastMixin],
  methods: {
    ...mapActions('landing', [ // specify the 'dashboard' namespace
      'signUpUser',
      'setIsShowToast',
      'setToastDetails'
    ]),
    signUp () {
      this.signUpUser({
        name: this.instituteName,
        website_url: this.instituteWebsite,
        logo: '',
        password: this.institutePassword,
        address: {
          street: this.instituteStreet,
          house_number: this.instituteHouseNumber,
          landmark: this.instituteLandmark,
          pincode: +this.institutePinCode,
          state: this.instituteState,
          city: this.instituteCity,
          country: this.instituteCountry
        },
        active: true,
        phone_number: +this.institutePhoneNumber,
        email: this.instituteEmail
      }).then(res => {
        this.triggerToast('success', 'SignUp successful!')
        // redirect to login
        this.$router.push({
          name: 'Landing',
          params: {
            action: 'login'
          }
        })
      })
    },
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
  .address {
    grid-template-columns: 50% 50%;
    display: grid;
  }
  .signup-form {
    width: 600px;
    margin: auto;
    &-button {
      background-color: #000;
      color: #fff;
      padding: 8px 10px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 600;
      margin: 25px auto;
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
