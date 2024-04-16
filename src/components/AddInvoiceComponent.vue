<template>
  <div class="form">
    Add Invoice Component
    <div class="form-element">
      <div class="form-element-label">
        Invoice Date:
      </div>
      <div class="form-element-input">
        <input type="date" v-model="invoiceDate" />
      </div>
    </div>

    <div class="form-element">
      <div class="form-element-label">
        Customer Name:
      </div>
      <div class="form-element-input">
        <input type="text" v-model="customerName" />
      </div>
    </div>

    <div class="form-element">
      <div class="form-element-label">
        Billing Address
      </div>
      <div class="form-element-input">
        <input type="text" v-model="billingAddress" />
      </div>
    </div>

    <div class="form-element">
      <div class="form-element-label">
        Shipping Address:
      </div>
      <div class="form-element-input">
        <input type="text" v-model="shippingAddress" />
      </div>
    </div>

    <div class="form-element">
      <div class="form-element-label">
        GSTIN:
      </div>
      <div class="form-element-input">
        <input type="text" v-model="gstin" />
      </div>
    </div>

    <div class="form-element">
      <div class="form-element-label">
        Total Amount:
      </div>
      <div class="form-element-input">
        <input type="number" v-model="totalAmount" />
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data () {
    return {
      invoiceDate: null,
      customerName: '',
      billingAddress: '',
      shippingAddress: '',
      gstin: '',
      items: [],
      billSundrys: [],
      totalAmount: 0
    }
  }
}
</script>

<style lang="scss" scoped>
input[type="text"] {
  padding: 10px 5px
}
  .form {
    &-element {
      display: flex;
      justify-content: center;
      margin-top: 20px;
      &-label {
        flex-basis: 20%
      }
      &-input {
        flex-basis: 50%
      }
    }
  }
</style>
