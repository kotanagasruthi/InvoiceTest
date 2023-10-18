<template>
  <div class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Create Topic</h2>
        <button @click="closeModal" class="close-btn">×</button>
      </div>
      <div class="modal-body">
        <label for="topic-name">Topic Name:</label>
        <input type="text" id="topic-name" v-model="topicName">

        <label for="topic-description">Topic Description:</label>
        <textarea id="topic-description" v-model="topicDescription"></textarea>
      </div>
      <div class="modal-footer">
        <button @click="addTopic">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      topicName: '',
      topicDescription: ''
    }
  },
  methods: {
    closeModal () {
      this.$emit('close')
    },
    addTopic () {
      console.log('Topic added:', this.topicName, this.topicDescription)
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
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
.modal-header, .modal-footer {
  background-color: #f5f5f5;
  padding: 10px;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}
.modal-body {
  padding: 20px;
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
  padding: 8px 16px;
  background-color: #4CAF50;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}
</style>
