<template>
    <div>
        <div v-if="!isOpenSubTopicQuestions">
            <header class="header-container">
                <div class="large-header">SubTopics</div>
                <button class="normal-button" @click="openCreateSubTopicForm()">Create SubTopic</button>
            </header>
            <div>
                <loader v-if="isLoading" :loading="isLoading"></loader>
                <div v-else-if="!getSubTopicsData">
                No sub topics found
                </div>
                <div class="grid-container" v-else>
                    <div class="card" v-for="(topic, index) in getSubTopicsData" :key="index" @click="OpenSubTopicQuestions(topic)">
                        <h2>{{subtopic.topic_name}}</h2>
                        <p>{{ subtopic.description }}</p>
                        <div class="buttons">
                        <button class="normal-button">EDIT</button>
                        <button class="normal-button">DELETE</button>
                        </div>
                    </div>
                </div>
            </div>
            <create-topic-form v-if="showSubTopicForm" from="subtopic" @close="closeForm" @fetchTopics="refreshSubTopics()" />
        </div>
        <topic-questions :topic="currentSubTopic" @back="displaySubTopics()" v-else />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CreateTopicForm from './CreateTopicForm.vue'
import TopicQuestions from './TopicQuestions.vue'
import Loader from './reusable/Loader.vue'
export default {
  data () {
    return {
      isLoading: false,
      showSubTopicForm: false,
      isOpenSubTopicQuestions: false,
      currentSubTopic: {}
    }
  },
  props: {
    topic: Object
  },
  computed: {
    ...mapGetters('landing', [
      'currentLoggedInUser'
    ]),
    ...mapGetters('dashboard', [
      'getSubTopicsData'
    ])
  },
  components: {
    loader: Loader,
    'create-topic-form': CreateTopicForm,
    'topic-questions': TopicQuestions
  },
  created () {
    this.isLoading = true
    console.log('loggged in user', this.currentLoggedInUser)
    this.fetchSubTopics(this.currentLoggedInUser.institute_id).then(res => {
      this.isLoading = false
    })
  },
  methods: {
    ...mapActions('dashboard', [ // specify the 'dashboard' namespace
      'fetchSubTopics'
    ]),
    openCreateSubTopicForm () {
      this.showSubTopicForm = true
    },
    closeForm () {
      this.showSubTopicForm = false
    },
    OpenSubTopicQuestions (subtopic) {
      this.currentSubTopic = JSON.parse(JSON.stringify(subtopic))
      this.isOpenSubTopicQuestions = true
    },
    refreshSubTopics () {
      this.showSubTopicForm = false
      this.isLoading = true
      console.log('loggged in user', this.currentLoggedInUser)
      this.fetchTopics(this.currentLoggedInUser.institute_id).then(res => {
        this.isLoading = false
        console.log('topics res', res)
      })
    },
    displaySubTopics () {
      this.isOpenSubTopicQuestions = false
    }
  }
}
</script>

<style lang="scss" scoped>
.grid-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 15px;
  gap: 10px;
}
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card {
  border: 1px solid #e0e0e0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  // max-width: 400px; /* You can adjust this value */
}
h2 {
  font-size: 1.5rem;
  margin-bottom: 15px;
}
p {
  margin-bottom: 20px;
}
.buttons {
  display: flex;
  justify-content: space-between;
}
.edit-btn, .delete-btn {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}
.edit-btn {
  background-color: #ffa500;
  color: white;
}
.delete-btn {
  background-color: #ff4500;
  color: white;
}

</style>
