<template>
  <div class="popup-container">
      <div class="popup">
            <loader v-if="isLoading" :loading="isLoading"></loader>
            <div v-else>
                  <h3>Select Invitees</h3>
                  <ul>
                        <li v-for="(invitee, index) in getInviteesData" :key="index">
                              <input type="checkbox" :id="invitee.email" v-model="selectedInvitees" :value="invitee.email" @change="InviteeSelected(invitee)">
                              <label :for="invitee.email">{{ invitee.firstName }} {{ invitee.lastName }} - {{invitee. email}}</label>
                        </li>
                  </ul>
                  <button @click="confirmSelection()">Confirm</button>
                  <button @click="closeInviteesPopup()">Close</button>
            </div>
      </div>
  </div>
</template>

<script>
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
    loader: Loader
  },
  created () {
    this.isLoading = true
    this.fetchInvitees().then(res => {
      this.isLoading = false
      console.log('invitees res', res)
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
      console.log('selected invitees', this.selectedInvitees)
      if (this.selectedInvitees.includes(currentInvitee.email)) {
        this.selectedInviteesForExams.push(currentInvitee)
      } else {
        this.selectedInviteesForExams = this.selectedInviteesForExams.filter(invitee => invitee.email !== currentInvitee.email)
      }
      console.log('invitee', currentInvitee)
      console.log('selected invitees for exams', this.selectedInviteesForExams)
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
.popup-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;

  .popup {
    width: 400px;
    max-height: 80vh;
    overflow-y: auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);

    h3 {
      margin-top: 0;
    }

    ul {
      margin: 20px 0;
      list-style-type: none;
      padding: 0;

      li {
        margin: 10px 0;

        label {
          margin-left: 10px;
        }
      }
    }

    button {
      padding: 10px 15px;
      margin: 5px;
      border: none;
      border-radius: 3px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:nth-child(1) {
        background-color: #28a745;
        color: #fff;

        &:hover {
          background-color: #218838;
        }
      }

      &:nth-child(2) {
        background-color: #dc3545;
        color: #fff;

        &:hover {
          background-color: #c82333;
        }
      }
    }
  }
}

</style>
