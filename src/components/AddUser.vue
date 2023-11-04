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
                    <legend class="fieldset-legend">User Id*</legend>
                   <input type="text" class="fieldset-input" v-model="newUser.user_id" />
                </fieldset>

                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Password*</legend>
                    <input type="password" class="fieldset-input" v-model="newUser.password" />
                </fieldset>

                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Role*</legend>
                    <input type="password" class="fieldset-input" v-model="newUser.role" />
                </fieldset>

            </template>
        </modal>
    </div>
</template>

<script>
import Modal from '../components/reusable/Modal.vue'

export default {
  data () {
    return {
      newUser: {
        name: '',
        user_id: '',
        password: '',
        role: ''
      }
    }
  },
  components: {
    modal: Modal
  },
  methods: {
    addUser () {
      this.$emit('add-user', this.newUser)
    },
    closeModal () {
      this.$emit('close')
    }
  }
}
</script>
