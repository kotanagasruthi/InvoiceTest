<template>
  <div>
    <add-user v-if="isAddUserPopupVisible" @add-user="addUserLocally" @close="closeAddUserPopup"/>

    <div class="header-container">
        <div class="header"> Users </div>
        <button class="normal-button" @click="showAddUserPopup">Add User</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>User Id</th>
          <th>Institute ID</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in getUsersData" :key="index">
          <td>{{ user.name }}</td>
          <td>{{ user.user_id }}</td>
          <td>{{ user.institute_id }}</td>
          <td>{{ user.role }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AddUser from '../components/AddUser.vue'
export default {
  data () {
    return {
      isAddUserPopupVisible: false
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
  components: {
    'add-user': AddUser
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
    this.getUsers(this.currentLoggedInUser.institute_id).then(res => {
      this.newUser.instituteId = this.currentLoggedInUser.institute_id
      this.newUser.instituteName = this.currentLoggedInUser.institute_name
    })
  }

}
</script>

<style scoped>

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
