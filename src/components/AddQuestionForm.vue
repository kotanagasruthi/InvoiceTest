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
            <div class="select-container">
                <label for="select-container-legend">Question Type*</label>
                <select id="mySelect" v-model="questionType">
                    <option value="multipleChoice">Multiple Choice</option>
                    <option value="trueFalse">True / False</option>
                    <option value="shortAnswer">Short Answer</option>
                    <option value="essay">Essay</option>
                    <option value="matching">Matching</option>
                    <option value="fillInTheBlanks">Fill in the Blanks</option>
                </select>
            </div>
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
          <fieldset class="fieldset">
            <legend class="fieldset-legend">Question Tags*</legend>
            <div class="tags-input-container">
              <div class="tags-container">
                <span class="tag" v-for="(tag, index) in tags" :key="index">
                  {{ tag }}
                  <button class="delete-tag-btn" @click="removeTag(index)">x</button>
                </span>
                <input
                  type="text"
                  class="tag-input"
                  @keyup.enter="addTag"
                  v-model="newTag"
                  placeholder="Add a tag"
                  ref="tagInput"
                />
              </div>
            </div>
          </fieldset>
      </template>
    </modal>
  </div>
</template>
<script>
import Modal from '../components/reusable/Modal.vue'
import { mapActions } from 'vuex'
export default {
  props: {
    topicName: String,
    subTopicName: String
  },
  data () {
    return {
      question: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: '',
      difficulty: 'easy',
      questionType: 'multipleChoice',
      tags: [],
      newTag: ''
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
    addTag () {
      if (this.newTag.trim() !== '') {
        this.tags.push(this.newTag.trim())
        this.newTag = ''
      }
    },
    removeTag (index) {
      this.tags.splice(index, 1)
    },
    addQuestion () {
      this.setQuestion({
        topic_name: this.topicName,
        question_text: this.question,
        question_type: this.questionType,
        options: [this.optionA, this.optionB, this.optionC, this.optionD],
        correct_answer: this.correctAnswer,
        difficulty_level: this.difficulty,
        tags: this.tags
      }).then(res => {
        this.$emit('fetch-questions')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .tags-input-container {
    padding: 5px;
    border-radius: 4px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    align-items: center;
  }

  .tag {
    display: flex;
    align-items: center;
    background-color: #e0e0e0;
    border-radius: 16px;
    padding: 5px 10px;
    font-size: 0.875rem;
  }

  .delete-tag-btn {
    background-color: transparent;
    border: none;
    margin-left: 8px;
    cursor: pointer;
  }

  .tag-input {
    flex-grow: 1;
    border: none;
    outline: none;
    font-size: 0.875rem;
    padding: 5px 0;
  }

  .tag-input::placeholder {
    color: #999;
  }

  .modal {
    ::v-deep {
      .modal-body {
        height: auto !important;
      }
    }
  }
</style>
