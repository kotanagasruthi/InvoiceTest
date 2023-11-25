<template>
  <div class="order-box">
    <div v-if="!hasActiveChildRoute" class="header-container">
      <breadcrumbs></breadcrumbs>
      <div>
        <button class="normal-button" @click="openImportFormatPopup()">Import Exam Format</button>
        <button class="normal-button" @click="openCreatExamFormat()">Create Exam</button>
      </div>
    </div>

    <import-exam-formats v-if="isImportFormatPopup" @close="closeImportExamFormatForm()" @importFormats="importCommonExamFormats" />

    <div v-if="!hasActiveChildRoute">
      <loader v-if="isLoading" :loading="isLoading"></loader>
      <div v-else>
          <div class="exam-card" v-for="(format, index) in getInstituteExamFormatsData" :key="index">
              <div class="header">{{ format.examType }}</div>

              <ul class="topics">
                  <li v-for="(topic, index) in format.topics" :key="index">
                      <div class="bold-font">{{topic.topic_name}}</div>
                      <div>{{topic.marks}} Marks</div>
                      <div>{{topic.no_of_questions}} Questions</div>
                  </li>
              </ul>

              <div class="exam-card-footer">
                <div>Duration: {{format.duration}} mins</div>
                <div>Total Marks: {{format.totalMarks}}</div>
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
import ImportExamFormats from './ImportExamFormats.vue'
export default {
  data () {
    return {
      isLoading: false,
      isCreateExamFormat: false,
      isImportFormatPopup: false
    }
  },
  components: {
    loader: Loader,
    'import-exam-formats': ImportExamFormats,
    breadcrumbs
  },
  created () {
    this.fetchFormats()
  },
  computed: {
    ...mapGetters('dashboard', [
      'getInstituteExamFormatsData'
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
      'fetchInstituteExamFormats',
      'importCommonExamFormatToInstituteExamFormat'
    ]),
    openCreatExamFormat () {
      this.$router.push({ name: 'CreateExamFormatComponent' })
    },
    openImportFormatPopup () {
      this.isImportFormatPopup = true
    },
    closeImportExamFormatForm () {
      this.isImportFormatPopup = false
      this.fetchFormats()
    },
    fetchFormats () {
      this.isLoading = true
      this.fetchInstituteExamFormats(this.currentLoggedInUser.institute_id).then(res => {
        this.isLoading = false
      })
    },
    importCommonExamFormats (selectedFormats) {
      this.importCommonExamFormatToInstituteExamFormat({
        examFormatIds: selectedFormats,
        instituteId: this.currentLoggedInUser.institute_id
      }).then(res => {
        this.closeImportExamFormatForm()
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
</style>
