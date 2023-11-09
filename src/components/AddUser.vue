<template>
    <div>
        <modal close_button_name="Cancel" ok_button_name="Add" @ok="addUser()" @close="closeModal()">
            <template #header>
                <div class="header">Add User</div>
                <div @click="closeModal()" class="close-icon">
                    <font-awesome-icon icon="xmark" />
                </div>
            </template>
            <template #body>

                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Name*</legend>
                    <input type="text" class="fieldset-input" v-model="newUser.name">
                </fieldset>

                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Email*</legend>
                   <input type="text" class="fieldset-input" v-model="newUser.email" />
                </fieldset>

                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Password*</legend>
                    <input type="password" class="fieldset-input" v-model="newUser.password" />
                </fieldset>

                <div class="select-container">
                    <label for="select-container-legend">Role*</label>
                    <select id="mySelect" v-model="newUser.role">
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                </div>

            </template>
        </modal>
    </div>
</template>

<script>
import Modal from '../components/reusable/Modal.vue'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      newUser: {
        name: '',
        email: '',
        password: '',
        role: ''
      }
    }
  },
  components: {
    modal: Modal
  },
  computed: {
    ...mapGetters('landing', [
      'currentLoggedInUser'
    ])
  },
  methods: {
    addUser () {
      this.$emit('add-user', {
        ...this.newUser,
        instituteId: this.currentLoggedInUser.institute_id,
        instituteName: this.currentLoggedInUser.institute_name
      })
    },
    closeModal () {
      this.$emit('close')
    }
  }
}
</script>
