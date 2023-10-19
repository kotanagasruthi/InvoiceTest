<template>
  <div class="popup">
    <div class="popup-content">
      <div class="popup-header">Add Question</div>
      <div class="popup-body">
        <input type="text" placeholder="Question" v-model="question" />
        <input type="text" placeholder="Option A" v-model="optionA" />
        <input type="text" placeholder="Option B" v-model="optionB" />
        <input type="text" placeholder="Option C" v-model="optionC" />
        <input type="text" placeholder="Option D" v-model="optionD" />
        <input type="text" placeholder="Correct Answer" v-model="correctAnswer" />
        <select v-model="difficulty">
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div class="popup-footer">
        <button @click="addQuestion">Add</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: {
    topicId: String
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
  methods: {
    ...mapActions('dashboard', [ // specify the 'dashboard' namespace
      'setQuestion'
    ]),
    closeModal () {
      this.$emit('close')
    },
    addQuestion () {
      this.setQuestion({
        topic_id: this.topicId,
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

<style lang="scss">
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;

  .popup-content {
    width: 80%;
    max-width: 500px;
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

    .popup-header,
    .popup-footer {
      background-color: #f5f5f5;
      padding: 15px;
      text-align: center;
    }

    .popup-body {
      padding: 15px;

      input[type="text"], select {
        width: 100%;
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid #e0e0e0;
        border-radius: 5px;
      }

      button {
        padding: 10px 20px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        &:hover {
          background-color: #0056b3;
        }
      }
    }
  }
}
</style>
