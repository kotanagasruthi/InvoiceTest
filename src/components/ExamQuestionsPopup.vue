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
                <div class="questions-wrapper" v-if="getSubTopicsQuestionsData.length">
                  <div v-for="(subTopic, subTopicIndex) in getSubTopicsQuestionsData" :key="subTopicIndex">
                      <div class="header">
                        {{subTopic.subtopic_name}}
                      </div>
                      <div class="questions-wrapper-question" v-for="question in subTopic.questions" :key="question.question_id">
                        <div class="questions-wrapper-question-text">
                          <input type="checkbox"
                                :id="`question-${question.question_id}`"
                                :value="question"
                                :checked="isQuestionSelected(subTopic.subtopic_name,  question)"
                                @change="toggleQuestionSelection(question, subTopic.subtopic_name)">
                          <label :for="question.question_id">{{ question.question_text }} - </label>
                          <div class="questions-wrapper-question-text-marks">{{marks}} Marks</div>
                        </div>
                        <div class="questions-wrapper-question-options">
                          <div v-for="(option, optionIndex) in question.options" :key="optionIndex">
                                  {{optionIndex + 1}}. {{option}}
                          </div>
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
    topic: String,
    marks: Number
  },
  data () {
    return {
      isLoading: false,
      selectedQuestions: [],
      selectedQuestionsForExams: [],
      subTopics: []
    }
  },
  components: {
    loader: Loader,
    modal: Modal
  },
  created () {
    this.isLoading = true
    this.fetchSubTopicsQuestions(this.topic.topic_name).then(res => {
      this.isLoading = false
    })
  },
  computed: {
    ...mapGetters('dashboard', [
      'getSubTopicsQuestionsData'
    ])
  },
  methods: {
    ...mapActions('dashboard', [
      'fetchSubTopicsQuestions'
    ]),
    isQuestionSelected (subtopicName, question) {
      // Check if the subtopic exists in the subTopics array
      const subtopic = this.subTopics.find(st => st?.subtopic_name === subtopicName)

      // If the subtopic exists, check if the question is in the subtopic's questions array
      if (subtopic) {
        return subtopic.questions.some(q => q.question_id === question.question_id)
      }

      // If the subtopic doesn't exist, the question is not selected
      return false
    },
    toggleQuestionSelection (question, subtopicName) {
      // Find the index of the subtopic
      const subtopicIndex = this.subTopics.findIndex(st => st.subtopic_name === subtopicName)

      if (subtopicIndex === -1) {
        // Subtopic doesn't exist, add a new subtopic with the question
        this.subTopics.push({
          subtopic_name: subtopicName,
          questions: [question]
        })
      } else {
        // Subtopic exists, check if the question is already included
        const questionIndex = this.subTopics[subtopicIndex].questions.findIndex(q => q.question_id === question.question_id)

        if (questionIndex === -1) {
          // Question isn't included, add it to the subtopic's questions
          this.subTopics[subtopicIndex].questions.push(question)
        } else {
          // Question is included, remove it
          this.subTopics[subtopicIndex].questions.splice(questionIndex, 1)

          // If the subtopic has no more questions, remove the subtopic
          if (this.subTopics[subtopicIndex].questions.length === 0) {
            this.subTopics.splice(subtopicIndex, 1)
          }
        }
      }
    },
    confirmSelection () {
      this.$emit('selectedQuestions', this.topic.topic_name, this.subTopics)
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
