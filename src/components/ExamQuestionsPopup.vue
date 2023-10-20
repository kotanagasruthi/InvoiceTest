<template>
  <div class="popup-container">
      <div class="popup">
            <loader v-if="isLoading" :loading="isLoading"></loader>
            <div v-else>
                  <h3>Select Questions</h3>
                  <ul>
                        <li v-for="question in getQuestionsData" :key="question.id">
                              <input type="checkbox" :id="question.question_id" v-model="selectedQuestions" :value="question.question_id" @change="questionSelected(question)">
                              <label :for="question.question_id">{{ question.question_text }}</label>
                              <div style="display: flex" v-for="(option, index) in question.options" :key="index">
                                    {{index + 1}}. {{option}}
                              </div>
                        </li>
                  </ul>
                  <button @click="confirmSelection()">Confirm</button>
                  <button @click="closeQuestionsPopup()">Close</button>
            </div>
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Loader from './reusable/Loader.vue'
export default {
  props: {
    topicId: String
  },
  data () {
    return {
      isLoading: false,
      selectedQuestions: [],
      selectedQuestionsForExams: []
    }
  },
  components: {
    loader: Loader
  },
  created () {
    this.isLoading = true
    this.fetchQuestions(this.topicId).then(res => {
      this.isLoading = false
      console.log('questions res', res)
    })
  },
  computed: {
    ...mapGetters('dashboard', [
      'getQuestionsData'
    ])
  },
  methods: {
    ...mapActions('dashboard', [
      'fetchQuestions'
    ]),
    questionSelected (currentQuestion) {
      console.log('selectedQuestions', this.selectedQuestions)
      if (this.selectedQuestions.includes(currentQuestion.question_id)) {
        this.selectedQuestionsForExams.push(currentQuestion)
      } else {
        this.selectedQuestionsForExams = this.selectedQuestionsForExams.filter(question => question.question_id !== currentQuestion.question_id)
      }
      console.log('question', currentQuestion)
      console.log('selectedQuestionsForExams', this.selectedQuestionsForExams)
    },
    confirmSelection () {
      console.log('topicId', this.topicId)
      this.$emit('selectedQuestions', this.topicId, this.selectedQuestionsForExams)
    },
    closeQuestionsPopup () {
      this.$emit('close')
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
