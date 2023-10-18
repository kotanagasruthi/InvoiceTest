<template>
  <div class="order-box">
    <loader v-if="isLoading" :loading="isLoading"></loader>
    <div v-else>
        <div class="exam-card" v-for="(exam, index) in getExamData" :key="index">
            <h4>{{ exam.exam_name }}</h4>
            <h5>{{ exam.owner }}</h5>

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
                    <button @click="editExam">Edit</button>
                    <button @click="publishExam">Publish</button>
                </div>
                <div>
                    Exam Type: {{exam.exam_type}}
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Loader from './reusable/Loader.vue'
export default {
  data () {
    return {
      isLoading: false
    }
  },
  components: {
    loader: Loader
  },
  created () {
    this.isLoading = true
    this.fetchExams().then(res => {
      this.isLoading = false
    })
  },
  computed: {
    ...mapGetters('dashboard', [
      'getExamData'
    ])
  },
  methods: {
    ...mapActions('dashboard', [ // specify the 'dashboard' namespace
      'fetchExams'
    ])
  }
}
</script>

<style lang="scss" scoped>
.exam-card {
  border: 1px solid #ddd;
  padding: 0 20px 10px 20px;
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

h2, h4, ul, button {
  margin-bottom: 5px;
}
h5 {
  margin: 0;
  font-weight: 500;
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

button {
  padding: 10px 15px;
  border-radius: 5px;
  margin-right: 5px;
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
