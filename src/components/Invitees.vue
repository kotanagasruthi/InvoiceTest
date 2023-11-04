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
  border-radius: 5px;
  padding: 5px;
  margin: 5px 0;
  width: 100%;
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
  height: 450px;
  overflow-y: scroll;
}

</style>
