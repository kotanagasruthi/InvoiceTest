<template>
  <div>
    <button @click="showAddInviteeDialog">Add Invitee</button>

    <!-- Add Invitee Pop-up -->
    <div v-if="showDialog" class="popup">
      <h3>Add Invitee</h3>
      <input v-model="newInvitee.firstName" placeholder="First Name" />
      <input v-model="newInvitee.lastName" placeholder="Last Name" />
      <input v-model="newInvitee.email" placeholder="Email" />
      <button @click="addInviteeLocally(newInvitee)">Submit</button>
    </div>

    <!-- Invitee Table -->
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
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      showDialog: false,
      newInvitee: {
        firstName: '',
        lastName: '',
        email: ''
      },
      invitees: [] // This should be populated with data from your API
    }
  },
  computed: {
    ...mapGetters('dashboard', [
      'getInviteesData'
    ])
  },
  methods: {
    ...mapActions('dashboard', ['addInvitee', 'fetchInvitee']),
    showAddInviteeDialog () {
      this.showDialog = true
    },
    addInviteeLocally (newInvitee) {
      // This method is called when the user submits the form
      // You can call the addInvitee action with the newInvitee object as the payload
      this.addInvitee(newInvitee).then(res => {
        this.fetchInvitee()
      })
      this.showDialog = false

      // Reset the newInvitee object after submission
      this.newInvitee = {
        firstName: '',
        lastName: '',
        email: ''
      }
    }

  }
}
</script>

<style>
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  background: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  text-align: center;
}

table {
  margin-top: 20px;
  border-collapse: collapse;
  width: 80%;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>
