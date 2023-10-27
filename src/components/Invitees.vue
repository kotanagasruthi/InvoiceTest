<template>
  <div>
    <button @click="showAddInviteeDialog" class = 'inviteeswitch'>Add Invitee</button>
       <div>
      <!-- Invitee Table with scrollable container -->
      <div class="table-container">
        <table v-if="getInviteesData.length > 0" class="scrollable-table">
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
  </div>
    <!-- Add Invitee Pop-up -->
  <div v-if="showDialog" class="popup">
      <h3>Add Invitee</h3>
      <div class="input-container">
        <input v-model="newInvitee.firstName" placeholder="First Name" class="rounded-input" />
        <input v-model="newInvitee.lastName" placeholder="Last Name" class="rounded-input" />
        <input v-model="newInvitee.email" placeholder="Email" class="rounded-input" />
      </div>
      <button @click="addInviteeLocally(newInvitee)" class = 'submit'>Submit</button>
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
      // This method is called when the user submits the form
      // You can call the addInvitee action with the newInvitee object as the payload
      this.addInvitee(newInvitee).then(res => {
        this.fetchInvitees()
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
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  width:500px;
  height:300px;
  transform: translate(-50%, -50%);
  padding: 10px;
  background: grey;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  /* z-index: 1000; */
  text-align: center;
  border-radius: 5px;
}
.submit{
  width:80px;
  height:30px;
  border-radius: 5px;
  background-color: orange;
  margin-top: 25px;
}
.input-container {
  display: flex;
  flex-direction: column;
  width: 270px;
}

.rounded-input {
  border: 1px solid #ccc;
  border-radius: 5px; /* Adjust the radius as needed */
  padding: 5px;
  margin: 5px 0; /* Add margin to separate input fields */
  width: 100%; /* Make input fields fill the width of the container */
}

.inviteeswitch{
  width: 100px;
  height: 30px;
  border-radius: 5px;
  background-color: orange;
  top:50%;
  left:50%;
}

.table-container {
  max-height: 80%; /* Set a maximum height for the container */
  overflow-y: auto; /* Enable vertical scrolling */
}

.scrollable-table {
  width: 100%;
}

/* Rest of your existing styles... */

h3{
  color: black;
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
