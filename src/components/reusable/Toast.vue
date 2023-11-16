<template>
  <div v-if="visible" :class="`toast toast-${status}`">
    <font-awesome-icon class="icon" :icon="iconClass" />
    <p>{{ message }}</p>
    <button @click="closeToast">Close</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    status: {
      type: String,
      required: true,
      validator: value => ['success', 'pending', 'failed'].includes(value)
    },
    message: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      default: 3000
    }
  },
  data () {
    return {
      visible: true
    }
  },
  computed: {
    iconClass () {
      switch (this.status) {
        case 'success':
          return 'fa-check'
        case 'pending':
          return 'fa-exclamation-triangle'
        case 'failed':
          return 'fa-times'
        default:
          return ''
      }
    }
  },
  methods: {
    ...mapActions('landing', ['setIsShowToast']),
    closeToast () {
      this.visible = false
      this.setIsShowToast(false)
    }
  },
  mounted () {
    setTimeout(() => {
      this.closeToast()
    }, this.duration)
  }
}
</script>

<style lang="scss">
.toast {
    position: fixed;
    padding: 20px;
    border-radius: 5px;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 25%;
    left: 35%;

  i {
    margin-right: 10px;
    font-size: 24px;
  }

  &-success {
    background-color: #28a745;
    color: white;
  }

  &-pending {
    background-color: #ffcc00;
    color: white;
  }

      &-failed {
      background-color: #dc3545;
      color: white;
      }
}
</style>
