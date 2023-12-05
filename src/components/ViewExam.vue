<template>
    <div>
      <div class="header-container">
        <breadcrumbs></breadcrumbs>
      </div>
        <loader v-if="isLoading" :loading="isLoading"></loader>
        <div v-else class="exam-form">
            <div class="exam-form-details-sub">
                Exam Name: <div class="header"> {{currentExamDetails.exam_name}} </div>
            </div>
            <div class="exam-form-details">
                <div class="exam-form-details-sub">
                    Start Date: <div class="header"> {{currentExamDetails.activePeriod.startDate.slice(0,10)}} </div>
                </div>
                <div class="exam-form-details-sub">
                    End Date: <div class="header"> {{currentExamDetails.activePeriod.endDate.slice(0,10)}} </div>
                </div>
            </div>
            <div class="exam-form-details">
                <div class="exam-form-details-sub">
                    Is Negative Marking: <div class="header"> {{currentExamDetails.negativeMarking}} </div>
                </div>
                <div class="exam-form-details-sub">
                    Negative Marks: <div class="header"> {{currentExamDetails.negativeMarksValue}} </div>
                </div>
            </div>
            <div class="exam-form-details">
                <div class="exam-form-details-sub">
                    Total Marks: <div class="header"> {{currentExamDetails.totalMarks}} </div>
                </div>
                <div class="exam-form-details-sub">
                    Duration (in Mins): <div class="header"> {{currentExamDetails.duration}} </div>
                </div>
            </div>
            <div class="add-topic" v-if="currentExamDetails.topics.length">
                <div v-for="(topic, index) in currentExamDetails.topics" :key="index" class="topic-container">
                    <div class="topic-container-header">
                        <div class="header">{{ topic.topic_name }}</div>
                        <div class="small-header">No.of Questions:{{topic.no_of_questions}}</div>
                        <div>Marks:{{topic.marks}}</div>
                    </div>
                    <div class="topic-container-questions" v-if="topic?.sub_topics.length">
                        <div v-for="(subTopic, subTopicIndex)  in topic.sub_topics" :key="subTopicIndex">
                            <div class="topic-container-questions-question" v-for="(question, index)  in subTopic.questions" :key="question.question_id">
                                <div class="topic-container-questions-question-text">
                                    {{index + 1}}. {{question.question_text}}
                                </div>
                                <div class="topic-container-questions-question-options">
                                <div class="topic-container-questions-question-options-option" v-for="(option, index) in question.options" :key="index">
                                    {{optionsMap[index+1]}}. {{option}}
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import breadcrumbs from '../components/reusable/BreadCrumbs.vue'
import Loader from './reusable/Loader.vue'
import { mapActions } from 'vuex'

export default {
  components: {
    loader: Loader,
    breadcrumbs
  },
  data () {
    return {
      currentExamDetails: {},
      optionsMap: {
        1: 'a',
        2: 'b',
        3: 'c',
        4: 'd'
      },
      isLoading: false
    }
  },
  created () {
    this.isLoading = true
    this.fetchExamDetails(this.$route.params.examId).then(res => {
      console.log('exam details', res.data)
      this.currentExamDetails = JSON.parse(JSON.stringify(res.data))
      this.isLoading = false
    })
  },
  methods: {
    ...mapActions('dashboard', [
      'fetchExamDetails'
    ])
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
  &-details {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    &-sub {
        display: flex;
        .header {
            margin-left: 10px;
        }
    }
  }

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
