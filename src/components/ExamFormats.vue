<template>
  <div class="exam-format">
    <!-- Exam Format Creation Form -->
      <h2>Create Exam Format</h2>
      <div class="exam-format-type">
            <fieldset class="fieldset">
                  <legend class="fieldset-legend">Exam Type*</legend>
                  <input type="text" class="fieldset-input" v-model="exam.examType">
            </fieldset>
            <div class="add-topic-actions-add" @click="addNewTopic()">
                  <font-awesome-icon class="icon"  icon="plus" />Add New Topic
            </div>
      </div>

      <div v-for="(topic, index) in exam.topics" :key="index" class="add-topic">
            <div class="add-topic-section">
                  <select v-model="topic.topic_name">
                        <option v-for="(availableTopic, index) in availableTopics" :key="index" :value="availableTopic">
                              {{ availableTopic.topic_name }}
                        </option>
                  </select>
                  <fieldset class="fieldset">
                        <legend class="fieldset-legend">No.of Questions*</legend>
                        <input type="number" class="fieldset-input" v-model="topic.no_of_questions">
                  </fieldset>
                  <fieldset class="fieldset">
                        <legend class="fieldset-legend">Marks*</legend>
                        <input type="number" class="fieldset-input" v-model="topic.marks">
                  </fieldset>
            </div>
            <div class="add-topic-actions">
                  <div class="add-topic-actions-remove" @click="removeTopic(index)">
                        <!-- <font-awesome-icon class="icon"  icon="trash" /> -->
                        Remove Topic
                  </div>
                  <div class="add-topic-actions-add" @click="addTopic(availableTopic, index)">
                        <!-- <font-awesome-icon class="icon"  icon="plus" /> -->
                        Add Topic
                  </div>
            </div>
      </div>

      <select v-model="exam.isNegativeMarking">
            <option value="" disabled selected>Is Negative Marking</option>
            <option value=true>True</option>
            <option value=false>False</option>
      </select>

      <fieldset class="fieldset">
          <legend class="fieldset-legend">Negative Marks*</legend>
          <input type="text" class="fieldset-input" v-model="exam.negativeMarks">
      </fieldset>

      <fieldset class="fieldset">
          <legend class="fieldset-legend">Duration (in mins)*</legend>
          <input type="text" class="fieldset-input" v-model="exam.duration">
      </fieldset>

      <button @click="addExamFormat()">Add Exam Format</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      exam: {
        examType: '',
        negativeMarking: false,
        negativeMarksValue: 0,
        duration: 0,
        topics: [],
        activePeriod: {
          startDate: null,
          endDate: null
        },
        invitees: []
      },
      availableTopics: []
    }
  },
  computed: {
    ...mapGetters('landing', [ // specify the 'dashboard' namespace
      'currentLoggedInUser'
    ])
  },
  created () {
    this.fetchTopics(this.currentLoggedInUser.institute_id).then(res => {
      console.log('res data', res.data)
      this.availableTopics = JSON.parse(JSON.stringify(res.data))
    })
  },
  methods: {
    ...mapActions('dashboard', [
      'fetchTopics',
      'setExamFormat'
    ]),
    addNewTopic () {
      this.exam.topics.push({
        topic_name: '',
        marks: 0,
        no_of_questions: 0
      })
      console.log('exam topics in add new topic', this.exam.topics)
    },
    addTopic (topic, index) {
      console.log('topic', topic)
      this.exam.topics[index] = {
        ...this.exam.topics[index].topic_name,
        marks: this.exam.topics[index].marks,
        no_of_questions: this.exam.topics[index].no_of_questions,
        questions: []
      }
      console.log('exam topics in add topic', this.exam)
    },
    addExamFormat () {
      this.setExamFormat(this.exam).then(res => {
        console.log('exam format res', res)
        this.exam = {}
      })
    },
    removeTopic (index) {
      this.exam.topics.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-fieldset {
  position: relative;
  border: 2px groove threedface;
  padding: 10px;
  margin: 20px 0;
  width: 200px;

  label {
    position: absolute;
    top: -10px;
    left: 10px;
    background: white;
    padding: 0 5px;
    font-weight: bold;
  }

  select {
    width: 100%;
    padding: 8px;
    border: none;
    appearance: none; // Remove default styling
    background: none;
    outline: none; // Remove focus outline
    cursor: pointer;

    &:focus {
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }
  }
}

.fieldset {
      border: 1px solid #e0e0e0;
      padding: 5px 10px;
      border-radius: 5px;
      position: relative;
      margin-top: 15px;
      &-legend {
        background-color: #fff;
        padding: 0 5px;
        position: absolute;
        top: -10px;
        left: 10px;
      }

      &-input {
        border: none;
        width: 100%;
        outline: none;
        padding: 8px 0;
      }
    }
/* Basic styling reset */
body, h2, h3, p, label, select, input, button {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
}

/* Container */
.exam-format {
    margin: 20px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    &-type {
      display: flex;
      justify-content: space-between;
      align-items: center;
      >fieldset {
            flex-basis: 75%;
      }
    }
}

.add-topic {
    margin: 20px 0;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 2px 2px 4px 2px  rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-section {
      flex-basis: 75%;
    }
    &-actions {
      margin-left: 10px;
      &-remove, &-add {
            padding: 8px 15px;
            border-radius: 5px;
            margin-right: 5px;
            border: 1px solid black;
            cursor: pointer;
      }
      &-add {
            margin-top: 10px;
      }
    }
}

h2, h3 {
    margin-bottom: 20px;
    color: #333;
}

label {
    display: block;
    margin-bottom: 5px;
    color: #666;
    font-weight: 500;
}

select {
    width: 100%;
    padding: 10px;
    margin-top: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    &:focus {
        border-color: #007BFF;
        outline: none;
        box-shadow: 0 0 5px rgba(0,123,255, 0.5);
    }
}

button {
    padding: 10px 20px;
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
        background-color: #0056b3;
    }
}

ul {
    list-style-type: none;
}

li {
    margin-bottom: 10px;
    font-size: 16px;
}
</style>
