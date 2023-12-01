import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions('landing', [
      'setIsShowToast',
      'setToastDetails'
    ]),
    triggerToast (status, message) {
      this.setIsShowToast(true)
      this.setToastDetails({
        status: status,
        message: message
      })
    }
  }
}
