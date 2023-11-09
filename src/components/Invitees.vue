<template>
  <div>
    <div class="header-container">
        <div class="large-header">Candidates</div>
        <button class="normal-button" @click="showAddInviteeDialog">Add Candidate</button>
    </div>
    <div class="table-container">
      <table v-if="getInviteesData.length > 0">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(invitee, index) in getInviteesData" :key="index">
            <td>{{ invitee.firstName }}</td>
            <td>{{ invitee.lastName }}</td>
            <td>{{ invitee.email }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <add-invitee v-if="showDialog" @add-invitee="addInviteeLocally" @close="closeAddInvitee"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AddInvitee from '../components/AddInvitees.vue'

export default {
  data () {
    return {
      showDialog: false,
      invitees: [] // This should be populated with data from your API
    }
  },
  computed: {
    ...mapGetters('dashboard', [
      'getInviteesData'
    ]),
    ...mapGetters('landing', [
      'currentLoggedInUser'
    ])
  },
  components: {
    'add-invitee': AddInvitee
  },
  created () {
    this.isLoading = true
    this.fetchInvitees(this.currentLoggedInUser.institute_id).then(res => {
      this.isLoading = false
    })
  },
  methods: {
    ...mapActions('dashboard', ['addInvitee', 'fetchInvitees']),
    showAddInviteeDialog () {
      this.showDialog = true
    },
    addInviteeLocally (newInvitee) {
      this.addInvitee(newInvitee).then(res => {
        this.fetchInvitees(this.currentLoggedInUser.institute_id)
      })
      this.showDialog = false
    },
    closeAddInvitee () {
      this.showDialog = false
    }
  }
}
</script>
