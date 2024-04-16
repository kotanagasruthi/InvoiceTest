<template>
  <div>
    <addInvoice v-if="isShowInvoiceAdd"></addInvoice>
    <updateInvoice v-else></updateInvoice>
  </div>
</template>

<script>
import addInvoice from '../components/AddInvoiceComponent.vue'
import updateInvoice from '../components/UpdateInvoiceComponent.vue'
export default {
  data () {
    return {
      isShowInvoiceAdd: false
    }
  },
  components: {
    addInvoice,
    updateInvoice
  },
  created () {
    console.log('router params', this.$route.params)
    if (this.$route.params.id === '0') {
      console.log('coming here...')
      this.isShowInvoiceAdd = true
    } else {
      this.isShowInvoiceAdd = false
    }
  }
}
</script>
