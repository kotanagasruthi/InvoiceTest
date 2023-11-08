<template>
    <div>
        <div v-if="!isOpenTopicQuestions">
            <header class="header-container">
                <div class="header">Topics</div>
                <button class="normal-button" @click="openCreateTopicForm()">Create Topic</button>
            </header>
            <div>
                <loader v-if="isLoading" :loading="isLoading"></loader>
                <div v-else-if="!getTopicsData">
                No topics found
                </div>
                <div class="grid-container" v-else>
                    <div class="card" v-for="(topic, index) in getTopicsData" :key="index" @click="OpenTopicQuestions(topic)">
                        <h2>{{topic.topic_name}}</h2>
                        <p>{{ topic.description }}</p>
                        <div class="buttons">
                        <button class="normal-button">EDIT</button>
                        <button class="normal-button">DELETE</button>
                        </div>
                    </div>
                </div>
            </div>
            <create-topic-form v-if="showTopicForm" @close="closeForm" @fetchTopics="refreshTopics()" />
        </div>
        <topic-questions :topic="currentTopic" @back="displayTopics()" v-else />
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
      showTopicForm: false,
      isOpenTopicQuestions: false,
      currentTopic: {}
    }
  },
  computed: {
    ...mapGetters('landing', [
      'currentLoggedInUser'
    ]),
    ...mapGetters('dashboard', [
      'getTopicsData'
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
    this.fetchTopics(this.currentLoggedInUser.institute_id).then(res => {
      this.isLoading = false
    })
  },
  methods: {
    ...mapActions('dashboard', [ // specify the 'dashboard' namespace
      'fetchTopics'
    ]),
    openCreateTopicForm () {
      this.showTopicForm = true
    },
    closeForm () {
      this.showTopicForm = false
    },
    OpenTopicQuestions (topic) {
      this.currentTopic = JSON.parse(JSON.stringify(topic))
      this.isOpenTopicQuestions = true
    },
    refreshTopics () {
      this.showTopicForm = false
      this.isLoading = true
      console.log('loggged in user', this.currentLoggedInUser)
      this.fetchTopics(this.currentLoggedInUser.institute_id).then(res => {
        this.isLoading = false
        console.log('topics res', res)
      })
    },
    displayTopics () {
      this.isOpenTopicQuestions = false
    }
  }
}
</script>

<style lang="scss" scoped>
.grid-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
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
  max-width: 400px; /* You can adjust this value */
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
