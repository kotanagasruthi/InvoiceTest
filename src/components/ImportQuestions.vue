<template>
    <div>
        <modal close_button_name="Cancel" ok_button_name="Import" @ok="importExamFormats()" @close="closeModal()">
            <template #header>
                <div class="header">Select SubTopics</div>
                <div @click="closeModal()" class="close-icon">
                    <font-awesome-icon icon="xmark" />
                </div>
            </template>
            <template #body>
                <div>
                  <div class="exam-card" v-for="(subtopicobject, index) in getCommmonSubTopicsData" :key="index">
                    <input type="checkbox" :id="subtopicobject.subtopic_name" v-model="selectedSubTopics" :value="subtopicobject.subtopic_name">
                    <div>{{ topic_name }}</div>
                    <div>{{subtopicobject.subtopic_name}}</div>
                    <div>{{subtopicobject.numQuestions}}</div>
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
      selectedSubTopics: []
    }
  },

  props: {
    topic_name: String
  },
  components: {
    modal: Modal
  },
  computed: {
    ...mapGetters('landing', [ // specify the 'dashboard' namespace
      'currentLoggedInUser'
    ]),
    ...mapGetters('dashboard', [
      'getCommmonSubTopicsData'
    ])
  },
  created () {
    console.log('Fetching subtopics and questions', this.topic_name)
    this.fetchSubTopicsAndQuestions(this.topic_name)
  },
  methods: {
    ...mapActions('dashboard', [ // specify the 'dashboard' namespace
      'fetchSubTopicsAndQuestions'
    ])
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
