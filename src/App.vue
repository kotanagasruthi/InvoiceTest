<template>
  <toast
      v-if="getIsShowToast"
      :status="getToastDetails.status"
      :message="getToastDetails.message"
    />
  <router-view/>
</template>

<script>
import { mapGetters } from 'vuex'
import Toast from '../src/components/reusable/Toast.vue'
export default {
  components: {
    toast: Toast
  },
  computed: {
    ...mapGetters('landing', ['getIsShowToast', 'getToastDetails'])
  }
}
</script>

<style src="../src/styles/global.scss" lang="scss"></style>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
