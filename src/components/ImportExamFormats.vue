<template>
    <div>
        <modal close_button_name="Cancel" ok_button_name="Import" @ok="importExamFormats()" @close="closeModal()">
            <template #header>
                <div class="header">Select Formats</div>
                <div @click="closeModal()" class="close-icon">
                    <font-awesome-icon icon="xmark" />
                </div>
            </template>
            <template #body>
                <div>
                  <div class="exam-card" v-for="(format, index) in getExamFormatsData" :key="index">
                    <input type="checkbox" :id="format.examFormatId" v-model="selectedFormats" :value="format.examFormatId">
                    <div class="header">{{ format.examType }}</div>

                    <ul class="topics">
                        <li v-for="(topic, index) in format.topics" :key="index">
                            <div class="bold-font">{{topic.topic_name}}</div>
                            <div>{{topic.marks}} Marks</div>
                            <div>{{topic.no_of_questions}} Questions</div>
                        </li>
                    </ul>

                    <div class="exam-card-footer">
                        <div>Duration: {{format.duration}}mins</div>
                        <div>Total Marks: {{format.totalMarks}}</div>
                    </div>
                  </div>
                </div>
            </template>
        </modal>
    </div>
</template>

<script>
import Modal from '../components/reusable/Modal.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      topicName: '',
      topicDescription: '',
      selectedFormats: []
    }
  },
  components: {
    modal: Modal
  },
  computed: {
    ...mapGetters('landing', [ // specify the 'dashboard' namespace
      'currentLoggedInUser'
    ]),
    ...mapGetters('dashboard', [
      'getExamFormatsData'
    ])
  },
  created () {
    this.fetchCommonExamFormats()
  },
  methods: {
    ...mapActions('dashboard', [ // specify the 'dashboard' namespace
      'fetchAllExamFormats'
    ]),
    fetchCommonExamFormats () {
      this.isLoading = true
      this.fetchAllExamFormats(this.currentLoggedInUser.institute_id).then(res => {
        this.isLoading = false
      })
    },
    importExamFormats () {
      this.$emit('importFormats', this.selectedFormats)
    },
    closeModal () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
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
    width: 100%;
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
.modal {
    ::v-deep {
      .modal-body {
        margin-top: 0px !important
      }
    }
  }
</style>
