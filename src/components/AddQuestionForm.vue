<template>
  <div class="popup">
    <modal close_button_name="Cancel" ok_button_name="Add" @ok="addQuestion()" @close="closeModal()">
      <template #header>
            <div class="header">Add Question</div>
            <div @click="closeModal()" class="close-icon">
                <font-awesome-icon icon="xmark" />
            </div>
      </template>
      <template #body>
            <fieldset class="fieldset">
                <legend class="fieldset-legend">Question*</legend>
                <input type="text" class="fieldset-input" v-model="question">
            </fieldset>

            <fieldset class="fieldset">
                <legend class="fieldset-legend">Option A*</legend>
                <input type="text" class="fieldset-input" v-model="optionA">
            </fieldset>

            <fieldset class="fieldset">
                <legend class="fieldset-legend">Option B*</legend>
                <input type="text" class="fieldset-input" v-model="optionB">
            </fieldset>

            <fieldset class="fieldset">
                <legend class="fieldset-legend">Option C*</legend>
                <input type="text" class="fieldset-input" v-model="optionC">
            </fieldset>

            <fieldset class="fieldset">
                <legend class="fieldset-legend">Option D*</legend>
                <input type="text" class="fieldset-input" v-model="optionD">
            </fieldset>

            <fieldset class="fieldset">
                <legend class="fieldset-legend">Correct Answer*</legend>
                <input type="text" class="fieldset-input" v-model="correctAnswer">
            </fieldset>

            <div class="select-container">
                <label for="select-container-legend">Difficulty Level*</label>
                <select id="mySelect" v-model="difficulty">
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
      </template>
    </modal>
  </div>
</template>
<script>
import Modal from '../components/reusable/Modal.vue'
import { mapActions } from 'vuex'
export default {
  props: {
    topicName: String
  },
  data () {
    return {
      question: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: '',
      difficulty: 'easy'
    }
  },
  components: {
    modal: Modal
  },
  methods: {
    ...mapActions('dashboard', [ // specify the 'dashboard' namespace
      'setQuestion'
    ]),
    closeModal () {
      this.$emit('close')
    },
    addQuestion () {
      this.setQuestion({
        topic_name: this.topicName,
        question_text: this.question,
        question_type: 'multipleChoice',
        options: [this.optionA, this.optionB, this.optionC, this.optionD],
        correct_answer: this.correctAnswer,
        difficulty_level: this.difficulty
      }).then(res => {
        this.$emit('fetch-questions')
      })
    }
  }
}
</script>
