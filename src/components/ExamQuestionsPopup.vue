<template>
  <div>
    <modal close_button_name="Cancel" ok_button_name="Confirm" @ok="confirmSelection()" @close="closeQuestionsPopup()">
        <template #header>
            <div class="header">Select Questions</div>
            <div @click="closeQuestionsPopup()" class="close-icon">
                <font-awesome-icon icon="xmark" />
            </div>
        </template>
        <template #body>
            <loader v-if="isLoading" :loading="isLoading"></loader>
            <div v-else>
                <div class="questions-wrapper" v-if="getQuestionsData.length">
                      <div class="questions-wrapper-question" v-for="question in getQuestionsData" :key="question.id">
                        <div class="questions-wrapper-question-text">
                          <input type="checkbox" :id="question.question_id" v-model="selectedQuestions" :value="question.question_id" @change="questionSelected(question)">
                          <label class="header" :for="question.question_id">{{ question.question_text }} - </label>
                          <div class="questions-wrapper-question-text-marks">{{marks}} Marks</div>
                        </div>
                        <div class="questions-wrapper-question-options">
                          <div v-for="(option, index) in question.options" :key="index">
                                  {{index + 1}}. {{option}}
                          </div>
                        </div>
                      </div>
                </div>
                <div v-else>
                    No Questions Found!!
                </div>
            </div>
        </template>
    </modal>
  </div>
</template>

<script>
import Modal from '../components/reusable/Modal.vue'
import { mapActions, mapGetters } from 'vuex'
import Loader from './reusable/Loader.vue'
export default {
  props: {
    topicName: String,
    marks: Number
  },
  data () {
    return {
      isLoading: false,
      selectedQuestions: [],
      selectedQuestionsForExams: []
    }
  },
  components: {
    loader: Loader,
    modal: Modal
  },
  created () {
    this.isLoading = true
    this.fetchQuestions(this.topicName).then(res => {
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
        this.selectedQuestionsForExams.push({
          ...currentQuestion,
          marks: this.marks
        })
      } else {
        this.selectedQuestionsForExams = this.selectedQuestionsForExams.filter(question => question.question_id !== currentQuestion.question_id)
      }
      console.log('question', currentQuestion)
      console.log('selectedQuestionsForExams', this.selectedQuestionsForExams)
    },
    confirmSelection () {
      this.$emit('selectedQuestions', this.topicName, this.selectedQuestionsForExams)
    },
    closeQuestionsPopup () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
  .questions-wrapper {
    &-question {
      margin-top: 20px;
      &-options {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
      }
      &-text {
        display: flex;
        align-items: center;
        &-marks {
          margin-left: 10px;
        }
      }
    }
  }
</style>
