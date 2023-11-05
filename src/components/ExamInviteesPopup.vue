<template>
  <div>
    <modal close_button_name="Cancel" ok_button_name="Confirm" @ok="confirmSelection()" @close="closeInviteesPopup()">
        <template #header>
            <div class="header">Select Invitees</div>
            <div @click="closeInviteesPopup()" class="close-icon">
                <font-awesome-icon icon="xmark" />
            </div>
        </template>
        <template #body>
            <loader v-if="isLoading" :loading="isLoading"></loader>
            <div v-else>
                <div class="invitees-wrapper" v-if="getInviteesData.length">
                    <div class="invitees-wrapper-invitee" v-for="(invitee, index) in getInviteesData" :key="index">
                        <input type="checkbox" :id="invitee.email" v-model="selectedInvitees" :value="invitee.email" @change="InviteeSelected(invitee)">
                        <label :for="invitee.email">{{ invitee.firstName }} {{ invitee.lastName }} - {{invitee. email}}</label>
                    </div>
                </div>
                <div v-else>
                    No Invitees Found!!
                </div>
            </div>
        </template>
    </modal>
  </div>
</template>

<script>
import Modal from '../components/reusable/Modal.vue'
import { mapActions, mapGetters } from 'vuex'
import Loader from './reusable/Loader.vue'
export default {
  data () {
    return {
      isLoading: false,
      selectedInvitees: [],
      selectedInviteesForExams: []
    }
  },
  components: {
    loader: Loader,
    modal: Modal
  },
  created () {
    this.isLoading = true
    this.fetchInvitees().then(res => {
      this.isLoading = false
    })
  },
  computed: {
    ...mapGetters('dashboard', [
      'getInviteesData'
    ])
  },
  methods: {
    ...mapActions('dashboard', [
      'fetchInvitees'
    ]),
    InviteeSelected (currentInvitee) {
      if (this.selectedInvitees.includes(currentInvitee.email)) {
        this.selectedInviteesForExams.push({
          ...currentInvitee,
          examKey: '',
          invitation: '',
          status: '',
          marksScored: 0,
          timeSpent: 0
        })
      } else {
        this.selectedInviteesForExams = this.selectedInviteesForExams.filter(invitee => invitee.email !== currentInvitee.email)
      }
    },
    confirmSelection () {
      this.$emit('selectedInvitees', this.selectedInviteesForExams)
    },
    closeInviteesPopup () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
  .invitees-wrapper {
    &-invitee {
      display: flex;
      >label {
        margin-left: 10px;
      }
    }
  }
</style>
