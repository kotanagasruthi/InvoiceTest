<template>
  <div>
    <button @click="showAddUserPopup">Add User</button>
    <table class="user-table">
      <thead>
        <tr>
          <th class="highlighted">Name</th>
          <th class="highlighted">Website</th>
          <th class="highlighted">Institute ID</th>
          <th class="highlighted">Email</th>
          <th class="highlighted">Phone Number</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in getUsersData" :key="index">
          <td>{{ user.name }}</td>
          <td>{{ user.website_url }}</td>
          <td>{{ user.institute_id }}</td>
          <td>{{ user.primary_user_email }}</td>
          <td>{{ user.phone_number }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-if="isAddUserPopupVisible" class="user-popup">
      <div class="input-container">
        <h2>Add User</h2>
        <input v-model="newUser.name" placeholder="Name" class="rounded-input" />
        <input v-model="newUser.websiteUrl" placeholder="Website URL" class="rounded-input" />
        <input v-model="newUser.instituteId" placeholder="Institute Id" class="rounded-input" />
        <input v-model="newUser.email" placeholder="Email" class="rounded-input" />
        <input v-model="newUser.number" placeholder="Number" class="rounded-input" />
        <div class="popupbuttons">
        <button @click="addUserLocally">Save</button>
        <button @click="closeAddUserPopup">Cancel</button>
        </div>
      </div>
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
        websiteUrl: '',
        instituteId: '',
        email: '',
        number: ''
      }
    }
  },

  computed: {
    ...mapGetters('dashboard', [
      'getUsersData'
    ])
  },
  methods: {
    ...mapActions('dashboard', ['getUsers', 'addUsers']),
    addUserLocally () {
      this.addUsers(this.newUser).then(res => {
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
      this.isLoading = false
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
