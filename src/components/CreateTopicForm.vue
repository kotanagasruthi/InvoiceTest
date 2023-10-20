<template>
  <div class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-header-text">Create Topic</div>
        <div @click="closeModal()" class="modal-header-close">
          <font-awesome-icon icon="xmark" />
        </div>
      </div>
      <div class="modal-body">
        <fieldset class="modal-body-fieldset">
          <legend class="modal-body-fieldset-legend">Topic Name*</legend>
          <input type="text" class="modal-body-fieldset-input" v-model="topicName">
        </fieldset>

        <fieldset class="modal-body-fieldset">
          <legend class="modal-body-fieldset-legend">Topic Description*</legend>
          <textarea class="modal-body-fieldset-input" v-model="topicDescription"></textarea>
        </fieldset>
      </div>
      <div class="modal-footer">
        <button @click="addTopic()">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      topicName: '',
      topicDescription: ''
    }
  },
  computed: {
    ...mapGetters('landing', [ // specify the 'dashboard' namespace
      'currentLoggedInUser'
    ])
  },
  methods: {
    ...mapActions('dashboard', [ // specify the 'dashboard' namespace
      'setTopic'
    ]),
    closeModal () {
      this.$emit('close')
    },
    addTopic () {
      this.setTopic({
        topic_name: this.topicName,
        description: this.topicDescription,
        institute_id: this.currentLoggedInUser.institute_id
      }).then(res => {
        this.$emit('fetch-topics')
      })
      console.log('Topic added:', this.topicName, this.topicDescription)
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
}
label {
  display: block;
  margin-bottom: 8px;
}
input, textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
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
</style>
