<template>
    <div>
      <div class="header-container">
        <breadcrumbs></breadcrumbs>
      </div>
        <loader v-if="isLoading" :loading="isLoading"></loader>
        <div v-else class="exam-form">
            <div class="select-container">
                <label for="select-container-legend">Select Option*</label>
                <select id="mySelect" v-model="selectedExamType" @change="loadExamFormat()">
                    <option v-for="(examFormat, index) in getInstituteExamFormatsData" :key="index" :value="examFormat.examType">{{ examFormat.examType }}</option>
                </select>
            </div>
            <div>
                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Total Marks*</legend>
                    <input type="text" class="fieldset-input input-disabled" v-model="totalMarks">
                </fieldset>
                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Duration(mins)*</legend>
                    <input type="text" class="fieldset-input input-disabled" v-model="duration">
                </fieldset>
                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Negative Marks*</legend>
                    <input type="text" class="fieldset-input input-disabled" v-model="negativeMarkValue">
                </fieldset>
                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Exam Name*</legend>
                    <input type="text" class="fieldset-input" v-model="examName">
                </fieldset>

                <div class="add-topic" v-if="topics.length">
                        <div v-for="(topic, index) in topics" :key="index" class="topic-container">
                            <div class="topic-container-header">
                                <div class="header">{{ topic.topic_name }}</div>
                                <div class="small-header">No.of Questions:{{topic.no_of_questions}}</div>
                                <div>Marks:{{topic.marks}}</div>
                                <button class="normal-button large-button" @click="openQuestionPopup(topic)">Add Questions</button>
                            </div>
                            <!-- <div class="topic-container-questions" v-if="topic?.questions.length">
                                <div class="topic-container-questions-question" v-for="(question, index)  in topic.questions" :key="question.question_id">
                                    <div class="topic-container-questions-question-text">
                                        {{index + 1}}. {{question.question_text}}
                                    </div>
                                    <div class="topic-container-questions-question-options">
                                      <div class="topic-container-questions-question-options-option" v-for="(option, index) in question.options" :key="index">
                                          {{optionsMap[index+1]}}. {{option}}
                                      </div>
                                    </div>
                                </div>
                            </div> -->
                        </div>
                </div>

                <div class="fieldset-date button-margin">
                    <label class="fieldset-date-label" for="myDate">Start Date*</label>
                    <input class="fieldset-date-input" type="date" v-model="startDate">
                </div>

                <div class="fieldset-date button-margin">
                    <label class="fieldset-date-label" for="myDate">End Date*</label>
                    <input class="fieldset-date-input" type="date" v-model="endDate">
                </div>

                <div>
                    <button class="normal-button button-margin" @click="createExam()">Submit</button>
                </div>
            </div>
          <QuestionPopup v-if="showQuestionPopup" :topic-name="currentTopic.topic_name" :marks="currentTopicQuestionMarks" @selectedQuestions="setQuestionsForTopic" @close="showQuestionPopup = false"></QuestionPopup>
        </div>
    </div>
</template>

<script>
import QuestionPopup from './ExamQuestionsPopup.vue'
import breadcrumbs from '../components/reusable/BreadCrumbs.vue'
import Loader from './reusable/Loader.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    QuestionPopup,
    loader: Loader,
    breadcrumbs
  },
  data () {
    return {
      examName: '',
      selectedExamType: '',
      topics: [], // Dynamic topics loaded based on the selected exam type
      startDate: '',
      endDate: '',
      showQuestionPopup: false,
      currentTopic: {},
      isLoading: false,
      currentExamFormat: [],
      invitees: [],
      totalMarks: 0,
      duration: 0,
      negativeMarkValue: 0,
      currentTopicQuestionMarks: 0,
      optionsMap: {
        1: 'a',
        2: 'b',
        3: 'c',
        4: 'd'
      }
    }
  },
  computed: {
    ...mapGetters('dashboard', [
      'getInstituteExamFormatsData'
    ]),
    ...mapGetters('landing', [
      'currentLoggedInUser'
    ])
  },
  created () {
    this.isLoading = true
    this.fetchInstituteExamFormats(this.currentLoggedInUser.institute_id).then(res => {
      this.isLoading = false
    })
  },
  methods: {
    ...mapActions('dashboard', [
      'fetchInstituteExamFormats',
      'setExam'
    ]),
    loadExamFormat () {
      this.currentExamFormat = this.getInstituteExamFormatsData.filter(data => data.examType === this.selectedExamType)
      console.log('current exam format', this.currentExamFormat)
      this.totalMarks = this.currentExamFormat[0].totalMarks
      this.duration = this.currentExamFormat[0].duration
      this.negativeMarkValue = this.currentExamFormat[0].negativeMarksValue
      this.topics = this.currentExamFormat[0].topics
    },
    openQuestionPopup (topic) {
      this.currentTopic = topic
      this.currentTopicQuestionMarks = this.currentTopic.question_marks
      this.showQuestionPopup = true
    },
    setQuestionsForTopic (name, questions) {
      this.topics = this.topics.map(topic => {
        if (topic.topic_name === name) {
          return {
            ...topic,
            questions: questions
          }
        } else {
          return topic
        }
      })
      this.showQuestionPopup = false
    },
    createExam () {
      const payload = {
        institute_id: this.currentLoggedInUser.institute_id,
        exam_name: this.examName,
        owner: this.currentLoggedInUser.name,
        collaborators: [],
        exam_type: this.selectedExamType,
        is_active: false,
        topics: this.topics,
        negativeMarking: this.currentExamFormat[0].negativeMarking,
        negativeMarksValue: this.currentExamFormat[0].negativeMarksValue,
        duration: this.currentExamFormat[0].duration,
        totalMarks: this.currentExamFormat[0].totalMarks,
        activePeriod: {
          startDate: new Date(this.startDate),
          endDate: new Date(this.endDate)
        },
        invitees: this.invitees
      }
      this.setExam(payload).then(res => {
        this.$emit('close')
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.add-topic {
    margin: 20px 0;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 2px 2px 4px 2px  rgba(0, 0, 0, 0.1);
}
.exam-form {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 70vh;
  overflow-y: scroll;

  .topic-container {
    margin-bottom: 15px;
    &-header {
        display: grid;
        grid-template-columns: 25% 25% 25% 25%;
        align-items: center;
        justify-items: start;
    }
    &-questions {
        border-radius: 8px;
        box-shadow: 2px 2px 4px 2px  rgba(0, 0, 0, 0.1);
        margin-top: 10px;
        &-question {
            padding: 20px;
            text-align: left;
            &:not(:last-child) {
                border-bottom: 1px solid #ccc;
            }
            &-text {
              font-weight: bold;
            }
            &-options {
              display: flex;
              margin-top: 10px;
                &-option {
                    &:not(:first-child) {
                      margin-left: 10px
                    }
                }
            }
        }
    }
  }
}
</style>
