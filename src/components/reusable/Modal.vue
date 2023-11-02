<template>
    <div class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <slot name="header">
                    default header
                </slot>
            </div>
            <div class="modal-body">
                <slot name="body">
                    default body
                </slot>
            </div>
            <div class="modal-footer">
                <slot name="footer">
                    <button class="normal-button" @click="$emit('close')">
                        {{ close_button_name }}
                    </button>

                    <button class="normal-button" @click="$emit('ok')">
                        {{ ok_button_name }}
                    </button>
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    close_button_name: {
      type: String,
      default: 'Close'
    },
    ok_button_name: {
      type: String,
      default: 'Ok'
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}
.modal-content {
    background-color: #ffffff;
    padding: 16px;
    border-radius: 5px;
    width: 400px;
    position: relative;
}
.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-text {
        font-size: 18px;
        font-weight: 600;
    }
    &-close {
        font-size: 18px;
        cursor: pointer;
        color: black
    }
}
.modal-body {
    margin-top: 30px;
}
.modal-footer {
    margin-top: 10px;
}
</style>
