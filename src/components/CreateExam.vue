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
                        <div v-for="topic in topics" :key="topic.name" class="topic-container">
                              <h4>{{ topic.name }}</h4>
                              <button @click="openQuestionPopup(topic)">Add Questions</button>
                        </div>

                        <label>
                              Start Date: <input type="date" v-model="startDate">
                        </label>

                        <label>
                              End Date: <input type="date" v-model="endDate">
                        </label>

                        <button @click="openInviteesPopup">Add Invitees</button>

                        <!-- This is a placeholder for the popups -->

                        <button>Submit</button>
                  </div>
                  <question-popup v-if="showQuestionPopup" :topic="currentTopic" @close="showQuestionPopup = false"></question-popup>
                  <invitees-popup v-if="showInviteesPopup" @close="showInviteesPopup = false"></invitees-popup>
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
      examTypes: ['JEE', 'Eamcet'], // This can be fetched from an API or other data sources
      selectedExamType: '',
      topics: [], // Dynamic topics loaded based on the selected exam type
      startDate: '',
      endDate: '',
      showQuestionPopup: false,
      showInviteesPopup: false,
      currentTopic: null,
      isLoading: false
    }
  },
  computed: {
    ...mapGetters('dashboard', [
      'getExamFormatsData'
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
      'fetchExamFormats'
    ]),
    loadExamFormat () {
      console.log('select exam type', this.selectedExamType)
    },
    openQuestionPopup (topic) {
      this.currentTopic = topic
      this.showQuestionPopup = true
    },
    openInviteesPopup () {
      this.showInviteesPopup = true
    }
  }
}
</script>

<style lang="scss" scoped>
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
