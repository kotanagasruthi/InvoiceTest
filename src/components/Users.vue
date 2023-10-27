<template>
  <div>
    <div v-if="isAddUserPopupVisible" class="user-popup">
      <div class="input-container">
        <h2>Add User</h2>
        <input v-model="newUser.name" placeholder="Name" class="rounded-input" />
        <input v-model="newUser.user_id" placeholder="User Id" class="rounded-input" />
        <input v-model="newUser.password" placeholder="Password" class="rounded-input" />
        <input v-model="newUser.role" placeholder="Role" class="rounded-input" />
        <div class="popupbuttons">
        <button @click="addUserLocally">Save</button>
        <button @click="closeAddUserPopup">Cancel</button>
        </div>
      </div>
    </div>
    <button @click="showAddUserPopup">Add User</button>
    <table class="user-table">
      <thead>
        <tr>
          <th class="highlighted">Name</th>
          <th class="highlighted">User Id</th>
          <th class="highlighted">Institute ID</th>
          <th class="highlighted">Role</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in getUsersData" :key="index">
          <td>{{ user.name }}</td>
          <td>{{ user.user_id }}</td>
          <td>{{ user.instituteId }}</td>
          <td>{{ user.role }}</td>
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
      isAddUserPopupVisible: false,
      newUser: {
        name: '',
        user_id: '',
        instituteId: '',
        password: '',
        role: ''
      }
    }
  },

  computed: {
    ...mapGetters('dashboard', [
      'getUsersData'
    ]),
    ...mapGetters('landing', [
      'currentLoggedInUser'
    ])
  },
  methods: {
    ...mapActions('dashboard', ['getUsers', 'addUsers']),
    addUserLocally () {
      this.addUsers(this.newUser).then(res => {
        this.isAddUserPopupVisible = false
        this.getUsers()
      })
    },
    showAddUserPopup () {
      this.isAddUserPopupVisible = true
    },
    closeAddUserPopup () {
      this.isAddUserPopupVisible = false
    }
  },

  created () {
    this.isLoading = true
    this.getUsers().then(res => {
      this.newUser.instituteId = this.currentLoggedInUser.institute_id
    })
  }

}
</script>

<style scoped>
.user-table {
  width: 100%;
  border-collapse: collapse;
}

.user-table th {
  padding: 10px;
  background-color: #0074d9; /* Highlighted background color for table headers */
  color: #fff;
}

.user-table td {
  padding: 10px;
}

.highlighted {
  background-color: #0074d9; /* Highlighted background color for table headers */
  color: #fff;
}

.input-container {
  position: absolute;
  background-color: green;
  width: 500px;
  height: 300px;
  border-radius: 5px;
  text-align: center;
  display: flex; /* Use flexbox */
  flex-direction: column; /* Stack the input boxes vertically */
  justify-content: center; /* Center vertically */
  align-items: center; /* Center horizontally */
}

.rounded-input{
  width:200px;
  height:25px;
}

</style>
