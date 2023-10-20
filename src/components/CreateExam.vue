<template>
      <div>
            <loader v-if="isLoading" :loading="isLoading"></loader>
            <div v-else class="exam-form">
                  <label>
                        Exam Type:
                        <select v-model="selectedExamType" @change="loadExamFormat()">
                              <option v-for="(examFormat, index) in getExamFormatsData" :key="index" :value="examFormat.examType">{{ examFormat.examType }}</option>
                        </select>
                  </label>
                  <div>
                        <label>
                              Exam Name:
                              <input type="text" v-model="examName" />
                        </label>
                        <div class="add-topic" v-if="topics.length">
                              <div v-for="(topic, index) in topics" :key="index" class="topic-container">
                                    <h4>{{ topic.topic_name }}</h4>
                                    <button @click="openQuestionPopup(topic)">Add Questions</button>
                              </div>
                        </div>

                        <label>
                              Start Date: <input type="date" v-model="startDate">
                        </label>

                        <label>
                              End Date: <input type="date" v-model="endDate">
                        </label>
                        <div>
                              <button @click="openInviteesPopup">Add Invitees</button>
                        </div>
                        <div>
                              <button @click="createExam()">Submit</button>
                        </div>
                  </div>
                  <QuestionPopup v-if="showQuestionPopup" :topic-id="currentTopic.topic_id" @selectedQuestions="setQuestionsForTopic" @close="showQuestionPopup = false"></QuestionPopup>
                  <InviteesPopup v-if="showInviteesPopup" @selectedInvitees="setInviteesForExam" @close="showInviteesPopup = false"></InviteesPopup>
            </div>
      </div>
</template>

<script>
import QuestionPopup from './ExamQuestionsPopup.vue'
import InviteesPopup from './ExamInviteesPopup.vue'
import Loader from './reusable/Loader.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    QuestionPopup,
    InviteesPopup,
    loader: Loader
  },
  data () {
    return {
      examName: '',
      selectedExamType: '',
      topics: [], // Dynamic topics loaded based on the selected exam type
      startDate: '',
      endDate: '',
      showQuestionPopup: false,
      showInviteesPopup: false,
      currentTopic: {},
      isLoading: false,
      currentExamFormat: [],
      invitees: []
    }
  },
  computed: {
    ...mapGetters('dashboard', [
      'getExamFormatsData'
    ]),
    ...mapGetters('landing', [
      'currentLoggedInUser'
    ])
  },
  created () {
    this.isLoading = true
    this.fetchExamFormats().then(res => {
      this.isLoading = false
    })
  },
  methods: {
    ...mapActions('dashboard', [
      'fetchExamFormats',
      'setExam'
    ]),
    loadExamFormat () {
      console.log('exam formats data', this.getExamFormatsData)
      console.log('selected exam type', this.selectedExamType)
      this.currentExamFormat = this.getExamFormatsData.filter(data => data.examType === this.selectedExamType)
      this.topics = this.currentExamFormat[0].topics
      console.log('topics', this.topics)
    },
    openQuestionPopup (topic) {
      console.log('topic', topic)
      this.currentTopic = topic
      console.log('current topic', this.currentTopic)
      this.showQuestionPopup = true
    },
    setQuestionsForTopic (id, questions) {
      console.log('topics before', this.topics)
      console.log('topics id', this.id)
      console.log('questions..', questions)
      this.topics = this.topics.map(topic => {
        if (topic.topic_id === id) {
          console.log('id matching..')
          return {
            ...topic,
            questions: questions
          }
        } else {
          return topic
        }
      })
      this.showQuestionPopup = false
      console.log('topics after', this.topics)
    },
    openInviteesPopup () {
      this.showInviteesPopup = true
    },
    setInviteesForExam (invitees) {
      console.log('invitees', invitees)
      this.invitees = JSON.parse(JSON.stringify(invitees))
      this.showInviteesPopup = false
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
        activePeriod: {
          startDate: new Date(this.startDate),
          endDate: new Date(this.endDate)
        },
        invitees: this.invitees
      }
      console.log('payload', payload)
      this.setExam(payload).then(res => {
        console.log('exam set successfully')
      })
      this.$emit('close')
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
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
}
.exam-form {
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    select,
    input {
      width: 60%;
      padding: 5px 10px;
      border: 1px solid #ccc;
      border-radius: 3px;
    }
  }

  .topic-container {
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h4 {
      margin: 0;
      font-size: 1.2rem;
    }
  }
  button {
      padding: 10px 15px;
      border-radius: 5px;
      margin-right: 5px;
      margin-top: 10px;
    }
}
</style>
