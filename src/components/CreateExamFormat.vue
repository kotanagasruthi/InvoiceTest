<template>
  <div>
    <div class="header-container">
      <breadcrumbs></breadcrumbs>
    </div>
    <div class="exam-format">
          <div class="exam-format-type">
              <fieldset class="fieldset">
                  <legend class="fieldset-legend">Exam Type*</legend>
                  <input type="text" class="fieldset-input" v-model="exam.examType">
              </fieldset>
              <button class="normal-button" @click="addNewTopic()">
                  <font-awesome-icon class="icon"  icon="plus" />Add New Topic
              </button>
          </div>

          <div v-for="(topic, index) in exam.topics" :key="index" class="add-topic">
              <div class="add-topic-section">
                  <div class="select-container">
                      <label for="select-container-legend">Select Topic*</label>
                      <select id="mySelect" v-model="topic.topic_name">
                          <option v-for="(availableTopic, index) in availableTopics" :key="index" :value="availableTopic">
                                {{ availableTopic.topic_name }}
                          </option>
                      </select>
                  </div>

                  <fieldset class="fieldset">
                      <legend class="fieldset-legend">No.of Questions*</legend>
                      <input type="number" class="fieldset-input" v-model="topic.no_of_questions">
                  </fieldset>

                  <fieldset class="fieldset">
                      <legend class="fieldset-legend">Topic Marks*</legend>
                      <input type="number" class="fieldset-input" v-model="topic.marks">
                  </fieldset>

                  <fieldset class="fieldset">
                      <legend class="fieldset-legend">Each Question Marks*</legend>
                      <input type="number" class="fieldset-input" v-model="topic.question_marks">
                  </fieldset>
              </div>
              <div class="add-topic-actions">
                  <button class="normal-button" @click="removeTopic(index)">Remove Topic</button>
                  <button class="normal-button button-margin" @click="addTopic(availableTopic, index)">Add Topic</button>
              </div>
          </div>

          <div class="select-container">
              <label for="select-container-legend">Is Negative Marking*</label>
              <select id="mySelect" v-model="exam.negativeMarking">
                  <option value=true>True</option>
                  <option value=false>False</option>
              </select>
          </div>

          <fieldset class="fieldset">
              <legend class="fieldset-legend">Negative Marks*</legend>
              <input type="text" class="fieldset-input" v-model="exam.negativeMarksValue">
          </fieldset>

          <fieldset class="fieldset">
              <legend class="fieldset-legend">Duration (in mins)*</legend>
              <input type="text" class="fieldset-input" v-model="exam.duration">
          </fieldset>

          <button class="normal-button button-margin" @click="addExamFormat()">Add Exam Format</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import breadcrumbs from '../components/reusable/BreadCrumbs.vue'
export default {
  data () {
    return {
      exam: {
        examType: '',
        negativeMarking: false,
        negativeMarksValue: 0,
        duration: 0,
        topics: [],
        activePeriod: {
          startDate: null,
          endDate: null
        },
        invitees: []
      },
      availableTopics: []
    }
  },
  components: {
    breadcrumbs
  },
  computed: {
    ...mapGetters('landing', [ // specify the 'dashboard' namespace
      'currentLoggedInUser'
    ])
  },
  created () {
    this.fetchTopics(this.currentLoggedInUser.institute_id).then(res => {
      this.availableTopics = JSON.parse(JSON.stringify(res.data))
    })
  },
  methods: {
    ...mapActions('dashboard', [
      'fetchTopics',
      'setExamFormat'
    ]),
    addNewTopic () {
      this.exam.topics.push({
        topic_name: '',
        marks: 0,
        question_marks: 0,
        no_of_questions: 0
      })
    },
    addTopic (topic, index) {
      this.exam.topics[index] = {
        ...this.exam.topics[index].topic_name,
        marks: this.exam.topics[index].marks,
        question_marks: this.exam.topics[index].question_marks,
        no_of_questions: this.exam.topics[index].no_of_questions,
        questions: []
      }
    },
    addExamFormat () {
      this.setExamFormat({
        ...this.exam,
        instituteId: this.currentLoggedInUser.institute_id
      }).then(res => {
        this.exam = {}
      })
    },
    removeTopic (index) {
      this.exam.topics.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.exam-format {
    margin-top: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    height: 70vh;
    overflow-y: scroll;
    &-type {
      display: flex;
      justify-content: space-between;
      align-items: center;
      >fieldset {
            flex-basis: 75%;
      }
    }
}

.add-topic {
    margin: 20px 0;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 2px 2px 4px 2px  rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-section {
      flex-basis: 75%;
    }
    &-actions {
        margin-left: 10px;
        display: flex;
        flex-direction: column;
    }
}
</style>
