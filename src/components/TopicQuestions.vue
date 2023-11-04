<template>
    <div>
        <header class="header-container">
            <div class="header">
                Manage Topic Questions
            </div>
            <div class="back" @click="backToTopics()">Back</div>
        </header>
        <div class="topic-questions">
            <header class="header-container">
                <div class="header-container-left">
                    <div class="header">{{topic.topic_name}}</div>
                    <div>{{topic.description}}</div>
                </div>
                <button class="normal-button" @click="openAddQuestionForm()">Add Questions</button>
            </header>
            <div class="order-box">
                <loader v-if="isLoading" :loading="isLoading"></loader>
                <div v-else>
                        <div class="exam-card" v-for="(question, index) in getQuestionsData" :key="index">
                            <h4>{{ question.question_text }}</h4>

                            <ul class="collaborators">
                                    <li v-for="(option, index) in question.options" :key="index">
                                        {{index}}.<div>{{ option }}</div>
                                    </li>
                            </ul>
                            <h4>Difficulty Level: {{question.correct_answer}}</h4>

                            <div class="exam-card-footer">
                            <div>
                                    <button class="normal-button" @click="editExam">Edit</button>
                            </div>
                            <div>
                                    Difficulty Level: {{question.difficulty_level}}
                            </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
        <add-question-form v-if="showQuestionForm" :topic-id="topic.topic_id" @close="closeForm" @fetch-questions="refreshQuestions()" />
</div>
</template>

<script>
import AddQuestionForm from './AddQuestionForm.vue'
import { mapActions, mapGetters } from 'vuex'
import Loader from './reusable/Loader.vue'
export default {
  props: {
    topic: Object
  },
  data () {
    return {
      isLoading: false,
      showQuestionForm: false
    }
  },
  computed: {
    ...mapGetters('dashboard', [
      'getQuestionsData'
    ])
  },
  components: {
    loader: Loader,
    'add-question-form': AddQuestionForm
  },
  created () {
    this.isLoading = true
    this.fetchQuestions(this.topic.topic_id).then(res => {
      this.isLoading = false
    })
  },
  methods: {
    ...mapActions('dashboard', [ // specify the 'dashboard' namespace
      'fetchQuestions'
    ]),
    openAddQuestionForm () {
      this.showQuestionForm = true
    },
    closeForm () {
      this.showQuestionForm = false
    },
    refreshQuestions () {
      this.showQuestionForm = false
      this.isLoading = true
      this.fetchQuestions(this.topic.topic_id).then(res => {
        this.isLoading = false
        console.log('questions res', res)
      })
    },
    backToTopics () {
      this.$emit('back')
    }
  }
}
</script>

<style lang="scss" scoped>
.back {
    cursor: pointer;
}
.topic-questions {
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-left {
        text-align: left;
    }
}
.exam-card {
  border: 1px solid #ddd;
  padding: 0 20px 10px 20px;
  text-align: left;
  border-radius: 10px;
  position: relative;
  margin-top: 15px;
  &-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.collaborators {
    width: 25%;
    display: flex;
    font-weight: 300;
    margin-bottom: 10px;
    >li {
        display: flex;
        align-items: center;
        .separator {
            border-radius: 50%;
            background-color: grey;
            width: 5px;
            height: 5px
        }
    }
}

h5 {
  margin: 0;
  font-weight: 500;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

.active-check {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
}

.custom-checkbox {
  position: relative;
  display: inline-block;
  width: 24px;
  height: 24px;
}

.custom-checkbox input[type="checkbox"] {
  display: none;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 24px;
  width: 24px;
  background-color: #eee;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.checkmark::after {
  content: "\2713";
  position: absolute;
  display: none;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  color: white;
}

.custom-checkbox input:checked ~ .checkmark {
  background-color: #4CAF50;
}

.custom-checkbox input:checked ~ .checkmark::after {
  display: block;
}

</style>
