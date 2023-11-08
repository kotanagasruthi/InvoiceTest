<template>
    <div>
        <modal close_button_name="Cancel" ok_button_name="Add" @ok="addInvitee()" @close="closeModal()">
            <template #header>
                <div class="header">Add Candidate</div>
                <div @click="closeModal()" class="close-icon">
                    <font-awesome-icon icon="xmark" />
                </div>
            </template>
            <template #body>

                <fieldset class="fieldset">
                    <legend class="fieldset-legend">First Name*</legend>
                    <input type="text" class="fieldset-input" v-model="newInvitee.firstName">
                </fieldset>

                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Last Name*</legend>
                   <input type="text" class="fieldset-input" v-model="newInvitee.lastName" />
                </fieldset>

                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Email*</legend>
                    <input type="text" class="fieldset-input" v-model="newInvitee.email" />
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
      newInvitee: {
        firstName: '',
        lastName: '',
        email: ''
      }
    }
  },
  components: {
    modal: Modal
  },
  methods: {
    addInvitee () {
      this.$emit('add-invitee', this.newInvitee)
    },
    closeModal () {
      this.$emit('close')
    }
  }
}
</script>
