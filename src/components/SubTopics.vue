<template>
    <div>
      <div v-if="!hasActiveChildRoute" class="header-container">
        <breadcrumbs></breadcrumbs>
        <button class="normal-button" @click="openCreateSubTopicForm()">Create SubTopic</button>
      </div>
      <div v-if="!hasActiveChildRoute">
          <div>
              <loader v-if="isLoading" :loading="isLoading"></loader>
              <div v-else-if="!getSubTopicsData">
                No sub topics found
              </div>
              <div class="grid-container" v-else>
                  <div class="card" v-for="(subTopic, index) in getSubTopicsData" :key="index" @click="OpenSubTopicQuestions(topic)">
                      <h2>{{subTopic.subtopic_name}}</h2>
                      <p>{{ subTopic.subtopic_discription }}</p>
                      <div class="buttons">
                      <button class="normal-button">EDIT</button>
                      <button class="normal-button">DELETE</button>
                      </div>
                  </div>
              </div>
          </div>
          <create-topic-form v-if="showSubTopicForm" from="subtopic" @close="closeForm" @fetchTopics="refreshSubTopics()" />
      </div>
        <router-view/>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CreateTopicForm from './CreateTopicForm.vue'
import Loader from './reusable/Loader.vue'
export default {
  data () {
    return {
      isLoading: false,
      showSubTopicForm: false
    }
  },
  computed: {
    ...mapGetters('landing', [
      'currentLoggedInUser'
    ]),
    ...mapGetters('dashboard', [
      'getSubTopicsData'
    ]),
    hasActiveChildRoute () {
      return this.$route.matched.length > 2
    },
    topicName () {
      return this.$route.params.topic
    }
  },
  components: {
    loader: Loader,
    'create-topic-form': CreateTopicForm
  },
  created () {
    this.isLoading = true
    this.fetchSubTopics({
      instituteId: this.currentLoggedInUser.institute_id,
      topicName: this.topicName
    }).then(res => {
      this.isLoading = false
    })
  },
  methods: {
    ...mapActions('dashboard', [
      'fetchSubTopics'
    ]),
    openCreateSubTopicForm () {
      this.showSubTopicForm = true
    },
    closeForm () {
      this.showSubTopicForm = false
    },
    OpenSubTopicQuestions (subTopic) {
      this.$router.push({ name: 'TopicQuestionsComponent', params: { subTopic: subTopic.subtopic_name } })
    },
    refreshSubTopics () {
      this.showSubTopicForm = false
      this.isLoading = true
      this.fetchSubTopics({
        instituteId: this.currentLoggedInUser.institute_id,
        topicName: this.topicName
      }).then(res => {
        this.isLoading = false
      })
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
