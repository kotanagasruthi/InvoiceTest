<template>
  <div>
    <div class="header-container">
        <div class="header">Exam Invitees</div>
        <div class="header-right">
            <button class="normal-button" @click="showAddExamInviteeDialog = true">Add Exam Invitees</button>
            <div class="back" @click="closeExamInvitee()">Back</div>
        </div>
    </div>
    <div>
      <div class="table-container">
        <table v-if="getExamInviteesData.length > 0">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Exam Key</th>
              <th>Invitation</th>
              <th>Status</th>
              <th>Marks Scored</th>
              <th>Time Spent</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(invitee, index) in getExamInviteesData" :key="index">
              <td>{{ invitee.firstName }}</td>
              <td>{{ invitee.lastName }}</td>
              <td>{{ invitee.email }}</td>
              <td>{{ invitee.examKey }}</td>
              <td>{{ invitee.invitation }}</td>
              <td>{{ invitee.status }}</td>
              <td>{{ invitee.marksScored }}</td>
              <td>{{ invitee.timeSpent }}</td>
            </tr>
          </tbody>
        </table>
        <div class="no-data" v-else>
            No Invitees Added!!
        </div>
      </div>
    </div>
    <add-exam-invitees v-if="showAddExamInviteeDialog" @selectedInvitees="setInviteesForExam" @close="showAddExamInviteeDialog = false"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ExamInviteePopup from '../components/ExamInviteesPopup.vue'

export default {
  data () {
    return {
      showAddExamInviteeDialog: false
    }
  },
  props: {
    examId: String
  },
  computed: {
    ...mapGetters('dashboard', [
      'getExamInviteesData'
    ])
  },
  components: {
    'add-exam-invitees': ExamInviteePopup
  },
  created () {
    this.isLoading = true
    this.fetchExamInvitees(this.examId).then(res => {
      this.isLoading = false
    })
  },
  methods: {
    ...mapActions('dashboard', ['fetchExamInvitees', 'setExamInvitees']),
    setInviteesForExam (invitees) {
      this.setExamInvitees({
        exam_id: this.examId,
        invitees: invitees
      }).then(res => {
        this.fetchExamInvitees(this.examId).then(res => {
          this.showAddExamInviteeDialog = false
        })
      })
    },
    closeExamInvitee () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>

.table-container {
  height: 450px;
  overflow-y: scroll;
}

.header-right {
    display: flex;
    align-items: center;
    .back {
        cursor: pointer;
    }
}

.no-data {
    margin-top: 150px;
    font-weight: 600;
}

</style>
