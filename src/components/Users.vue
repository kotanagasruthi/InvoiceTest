<template>
  <div>
    <add-user v-if="isAddUserPopupVisible" @add-user="addUserLocally" @close="closeAddUserPopup"/>

    <div class="header-container">
        <div class="header"> Users </div>
        <button class="normal-button" @click="showAddUserPopup">Add User</button>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in getUsersData" :key="index">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
          </tr>
        </tbody>
      </table>
    </div>
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
    ...mapActions('dashboard', ['fetchUsers', 'addUsers']),
    addUserLocally (newUser) {
      this.addUsers(newUser).then(res => {
        this.isAddUserPopupVisible = false
        this.fetchUsers(this.currentLoggedInUser.institute_id)
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
    this.fetchUsers(this.currentLoggedInUser.institute_id).then(res => {
      this.isLoading = false
    })
  }

}
</script>
