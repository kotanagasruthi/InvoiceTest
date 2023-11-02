<template>
  <div>
    <modal close_button_name="Cancel" ok_button_name="Confirm" @ok="confirmSelection()" @close="closeQuestionsPopup()">
        <template #header>
            <div class="header">Select Questions</div>
            <div @click="closeQuestionsPopups()" class="close-icon">
                <font-awesome-icon icon="xmark" />
            </div>
        </template>
        <template #body>
            <loader v-if="isLoading" :loading="isLoading"></loader>
            <div v-else>
                <div v-if="getQuestionsData.length">
                    <ul>
                        <li v-for="question in getQuestionsData" :key="question.id">
                            <input type="checkbox" :id="question.question_id" v-model="selectedQuestions" :value="question.question_id" @change="questionSelected(question)">
                            <label :for="question.question_id">{{ question.question_text }}</label>
                            <div style="display: flex" v-for="(option, index) in question.options" :key="index">
                                    {{index + 1}}. {{option}}
                            </div>
                        </li>
                    </ul>
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
    loader: Loader,
    modal: Modal
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
