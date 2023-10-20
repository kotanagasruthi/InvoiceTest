<template>
  <div class="popup-container" v-if="showPopup">
    <div class="popup">
      <h3>Select Questions</h3>
      <ul>
        <li v-for="question in questions" :key="question.id">
          <input type="checkbox" :id="question.id" v-model="selectedQuestions" :value="question.id">
          <label :for="question.id">{{ question.text }}</label>
        </li>
      </ul>
      <button @click="confirmSelection">Confirm</button>
      <button @click="showPopup = false">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showPopup: false, // controls the visibility of the popup
      questions: [ // sample questions, you'd likely fetch these from an API
        { id: 1, text: 'What is the capital of France?' },
        { id: 2, text: 'Which planet is closest to the sun?' }
        // ... other questions
      ],
      selectedQuestions: [] // stores the IDs of selected questions
    }
  },
  methods: {
    confirmSelection () {
      // Handle what happens after confirming the selection
      // For now, we'll just print the selected questions to the console
      console.log('Selected Questions:', this.selectedQuestions)

      // You might want to close the popup after confirming
      this.showPopup = false
    }
  }
}
</script>

<style lang="scss" scoped>
.popup-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;

  .popup {
    width: 400px;
    max-height: 80vh;
    overflow-y: auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);

    h3 {
      margin-top: 0;
    }

    ul {
      margin: 20px 0;
      list-style-type: none;
      padding: 0;

      li {
        margin: 10px 0;

        label {
          margin-left: 10px;
        }
      }
    }

    button {
      padding: 10px 15px;
      margin: 5px;
      border: none;
      border-radius: 3px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:nth-child(1) {
        background-color: #28a745;
        color: #fff;

        &:hover {
          background-color: #218838;
        }
      }

      &:nth-child(2) {
        background-color: #dc3545;
        color: #fff;

        &:hover {
          background-color: #c82333;
        }
      }
    }
  }
}

</style>
