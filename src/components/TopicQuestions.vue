<template>
    <div>
        <div class="header-container">
          <breadcrumbs></breadcrumbs>
          <button class="normal-button" @click="openAddQuestionForm()">Add Questions</button>
        </div>
        <div class="topic-questions">
            <div class="order-box">
                <loader v-if="isLoading" :loading="isLoading"></loader>
                <div v-else>
                  <div class="exam-card" v-for="(question, index) in getQuestionsData" :key="index">
                      <div class="header">{{ question.question_text }}</div>

                      <ul class="collaborators">
                        <li v-for="(option, index) in question.options" :key="index">
                            {{optionsMap[index + 1]}}.<div>{{ option }}</div>
                        </li>
                      </ul>
                      <div class="small-header">Correct Answer: {{question.correct_answer}}</div>

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
        <add-question-form v-if="showQuestionForm" :topic-name="topicName" :sub-topic-name="subTopicName" @close="closeForm" @fetch-questions="refreshQuestions()" />
</div>
</template>

<script>
import AddQuestionForm from './AddQuestionForm.vue'
import breadcrumbs from '../components/reusable/BreadCrumbs.vue'
import { mapActions, mapGetters } from 'vuex'
import Loader from './reusable/Loader.vue'
export default {
  data () {
    return {
      isLoading: false,
      showQuestionForm: false,
      optionsMap: {
        1: 'A',
        2: 'B',
        3: 'C',
        4: 'D'
      }
    }
  },
  computed: {
    ...mapGetters('landing', [
      'currentLoggedInUser'
    ]),
    ...mapGetters('dashboard', [
      'getQuestionsData'
    ]),
    topicName () {
      return this.$route.params.topic
    },
    subTopicName () {
      return this.$route.params.subTopic
    }
  },
  components: {
    loader: Loader,
    'add-question-form': AddQuestionForm,
    breadcrumbs
  },
  created () {
    this.retrieveQuestions()
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
    retrieveQuestions () {
      this.isLoading = true
      this.fetchQuestions({
        topicName: this.topicName,
        subTopicName: this.subTopicName,
        instituteId: this.currentLoggedInUser.institute_id
      }).then(res => {
        this.isLoading = false
      })
    },
    refreshQuestions () {
      this.showQuestionForm = false
      this.retrieveQuestions()
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
  padding: 10px 20px;
  text-align: left;
  border-radius: 10px;
  position: relative;
  margin-top: 15px;
  &-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
  }
}

.collaborators {
    width: 50%;
    display: flex;
    font-weight: 300;
    margin-bottom: 10px;
    justify-content: space-between;
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

ul {
  list-style-type: none;
  padding-left: 0;
}

</style>
