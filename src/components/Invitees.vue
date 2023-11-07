<template>
  <div>
    <div class="header-container">
        <div class="header">Manage Invitees</div>
        <button class="normal-button" @click="showAddInviteeDialog">Add Invitee</button>
    </div>
    <div>
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
    ])
  },
  components: {
    'add-invitee': AddInvitee
  },
  created () {
    this.isLoading = true
    this.fetchInvitees().then(res => {
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
        this.fetchInvitees()
      })
      this.showDialog = false
    },
    closeAddInvitee () {
      this.showDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>

.table-container {
  height: 450px;
  overflow-y: scroll;
}

</style>
