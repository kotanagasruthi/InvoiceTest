<template>
    <div>
        <modal close_button_name="Cancel" ok_button_name="Download" :header="false" @ok="downloadPdf" @close="closeModal()">
            <template #body>
                <loader v-if="isLoading" />
                <div v-else ref="content" id="question-paper" class="question-paper">
                    <header class="question-paper-header">
                        <h2>{{currentLoggedInUser.institute_name}}</h2>
                        <h3>{{currentExamDetails.exam_name}}</h3>
                        <div class="header-details">
                            <span>Date: {{currentExamDetails.activePeriod.startDate.slice(0,10)}}</span>
                            <span>Time: {{currentExamDetails.duration}} Mins.</span>
                            <span>Marks: {{currentExamDetails.totalMarks}}</span>
                        </div>
                    </header>
                    <main>
                        <section v-for="(topic, index) in currentExamDetails.topics" :key="index" class="topic">
                            <h3 class="topic-title">{{topic.topic_name}}</h3>
                            <div class="topic-container-questions" v-if="topic?.sub_topics.length">
                                <div v-for="(subTopic, subTopicIndex)  in topic.sub_topics" :key="subTopicIndex">
                                    <ol class="questions-list">
                                        <li v-for="(question, index)  in subTopic.questions" :key="question.question_id" class="question">
                                            <div class="question-text">
                                                <div>{{index + 1}}.</div> <div>{{ question.question_text }}</div>
                                            </div>
                                            <ol class="options-list">
                                            <li v-for="option in question.options" :key="option">
                                                {{ option }}
                                            </li>
                                            </ol>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </template>
        </modal>
    </div>
</template>

<script>
import Modal from '../components/reusable/Modal.vue'
import Loader from './reusable/Loader.vue'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    examId: String
  },
  data () {
    return {
      currentExamDetails: {},
      isLoading: false
    }
  },
  components: {
    modal: Modal,
    loader: Loader
  },
  computed: {
    ...mapGetters('landing', [
      'currentLoggedInUser'
    ])
  },
  created () {
    this.isLoading = true
    this.fetchExamDetails(this.examId).then(res => {
      console.log('exam details', res.data)
      this.currentExamDetails = JSON.parse(JSON.stringify(res.data))
      this.isLoading = false
    })
  },
  methods: {
    ...mapActions('dashboard', [
      'fetchExamDetails'
    ]),
    closeModal () {
      this.$emit('close')
    },
    async downloadPdf () {
      await this.$nextTick() // Ensure Vue has updated the DOM
      const element = this.$refs.content // Make sure 'content' is the correct ref

      if (element) {
        const canvas = await html2canvas(element, {
          scale: 1, // Adjust scale as needed
          useCORS: true, // If you're loading images from external sources
          scrollX: 0,
          scrollY: -window.scrollY // Adjust if the content is within a scrollable area
        })
        const imgData = canvas.toDataURL('image/png')
        // eslint-disable-next-line new-cap
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: 'a4'
        })

        // Calculate the proportion of the image to the PDF page size
        const imgProps = pdf.getImageProperties(imgData)
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
        pdf.save('question-paper.pdf')
      } else {
        console.error('Element not found or not rendered yet')
      }
    }

  }
}
</script>

<style scoped>
.question-paper {
  font-family: Arial, sans-serif;
  padding: 20px;
}

.question-paper-header {
  text-align: center;
  border-bottom: 2px solid #000;
  margin-bottom: 20px;
}

.question-paper-header h1,
.question-paper-header h2 {
  margin: 0;
}

.header-details {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}

.topic-title {
  font-size: 20px;
  text-decoration: underline;
}

.questions-list {
  list-style: none;
  padding: 0;
}

.questions-list .question {
  margin-bottom: 10px;
}

.options-list {
  list-style-type: lower-alpha;
  padding-left: 20px;
  display: flex;
  justify-content: space-between;
}

.question-text {
    display: flex;
    margin-bottom: 10px;
}

.options-list li {
  margin-bottom: 5px;
}
</style>
