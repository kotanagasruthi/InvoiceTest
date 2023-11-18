<template>
  <div class="order-box">
    <div>
      <div class="header-container" v-if="isCreateExamFormat">
        <div class="large-header">Create Exam Format</div>
        <div class="back" @click="closeCreateExam()">Back</div>
      </div>
    </div>
    <create-exam-format v-if="isCreateExamFormat" @close="closeCreateExam()" />
    <div v-else>
      <loader v-if="isLoading" :loading="isLoading"></loader>
      <div v-else>
          <div class="exam-card" v-for="(format, index) in getExamFormatsData" :key="index">
              <div class="header">{{ format.examType }}</div>

              <ul class="topics">
                  <li v-for="(topic, index) in format.topics" :key="index">
                      <div class="bold-font">{{topic.topic_name}}</div>
                      <div>{{topic.marks}} Marks</div>
                      <div>{{topic.no_of_questions}} Questions</div>
                  </li>
              </ul>

              <div class="exam-card-footer">
                  <div>
                      <button class="normal-button" v-if="format.commonFormat" @click="importExamFormat(format.examFormatId)">Import</button>
                  </div>
                  <div>
                      <div>Duration: {{format.duration}}mins</div>
                      <div>Total Marks: {{format.totalMarks}}</div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Loader from './reusable/Loader.vue'
import CreateExamFormat from './CreateExamFormat.vue'
export default {
  data () {
    return {
      isLoading: false,
      isCreateExamFormat: false,
      isExamInviteesPage: false,
      currentExamId: ''
    }
  },
  components: {
    loader: Loader,
    'create-exam-format': CreateExamFormat
  },
  created () {
    this.isLoading = true
    this.fetchAllExamFormats(this.currentLoggedInUser.institute_id).then(res => {
      this.isLoading = false
    })
  },
  computed: {
    ...mapGetters('dashboard', [
      'getExamFormatsData'
    ]),
    ...mapGetters('landing', [
      'currentLoggedInUser'
    ])
  },
  methods: {
    ...mapActions('dashboard', [ // specify the 'dashboard' namespace
      'fetchAllExamFormats'
    ]),
    openCreatExam () {
      this.isCreateExamFormatFormat = true
    },
    closeCreateExam () {
      this.isCreateExamFormat = false
      this.isLoading = true
      this.fetchAllExamFormats(this.currentLoggedInUser.institute_i).then(res => {
        this.isLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.back {
  cursor: pointer;
}
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  &-text {
    font-weight: 600;
  }
}
.exam-card {
  border: 1px solid #ddd;
  padding: 10px 20px 10px 20px;
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

.topics {
    width: 50%;
    font-weight: 300;
    margin-bottom: 10px;
    >li {
        display: flex;
        align-items: center;
        >div {
          flex-basis: 30%;
        }
    }
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
