<template>
  <div class="order-box">
    <div v-if="!hasActiveChildRoute" class="header-container">
      <breadcrumbs></breadcrumbs>
      <button class="normal-button" @click="openCreatExam()">Create Exam</button>
    </div>
    <div v-if="!hasActiveChildRoute">
      <loader v-if="isLoading" :loading="isLoading"></loader>
      <div v-else>
          <div class="exam-card" v-for="(exam, index) in getExamData" :key="index">
              <div class="header">{{ exam.exam_name }}</div>
              <div class="small-header">{{ exam.owner }}</div>

              <ul class="collaborators">
                  <li v-for="(collaborator, index) in exam.collaborators" :key="index">
                      <div>{{ collaborator }}</div>
                      <div v-if="index !== (exam.collaborators.length - 1)" class="separator">.</div>
                  </li>
              </ul>

              <div v-if="exam.is_active" class="active-check">
                  <label class="custom-checkbox">
                      <input type="checkbox" checked />
                      <span class="checkmark"></span>
                  </label>
              </div>

              <div class="exam-card-footer">
                  <div>
                      <button class="normal-button" @click="editExam">Edit</button>
                      <button class="normal-button" @click="openExamInviteesPage(exam.exam_id)">Candidates</button>
                      <button class="normal-button" v-if="!exam.is_active" @click="publishExam(exam.exam_id)">Publish</button>
                  </div>
                  <div>
                      Exam Type: {{exam.exam_type}}
                  </div>
              </div>
          </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Loader from './reusable/Loader.vue'
import breadcrumbs from '../components/reusable/BreadCrumbs.vue'
export default {
  data () {
    return {
      isLoading: false,
      isCreateExam: false,
      isExamInviteesPage: false,
      currentExamId: ''
    }
  },
  components: {
    loader: Loader,
    breadcrumbs
  },
  created () {
    this.isLoading = true
    this.fetchExams(this.currentLoggedInUser.institute_id).then(res => {
      this.isLoading = false
    })
  },
  computed: {
    ...mapGetters('dashboard', [
      'getExamData'
    ]),
    ...mapGetters('landing', [
      'currentLoggedInUser'
    ]),
    hasActiveChildRoute () {
      return this.$route.matched.length > 2
    }
  },
  methods: {
    ...mapActions('dashboard', [ // specify the 'dashboard' namespace
      'fetchExams',
      'publishInstituteExam'
    ]),
    openCreatExam () {
      this.$router.push({ name: 'CreateExamComponent' })
    },
    publishExam (examId) {
      this.publishInstituteExam(examId).then(res => {
        this.isLoading = true
        this.fetchExams(this.currentLoggedInUser.institute_id).then(res => {
          this.isLoading = false
        })
      })
    },
    closeCreateExam () {
      this.isLoading = true
      this.fetchExams(this.currentLoggedInUser.institute_id).then(res => {
        this.isLoading = false
      })
    },
    openExamInviteesPage (examId) {
      this.$router.push({ name: 'ExamInviteesComponent', params: { examId } })
    },
    closeExamInvitees () {
      this.isExamInviteesPage = false
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
