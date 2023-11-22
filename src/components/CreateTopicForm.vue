<template>
    <div>
        <modal close_button_name="Cancel" ok_button_name="Add" @ok="addTopic()" @close="closeModal()">
            <template #header>
                <div class="header">Create Topic</div>
                <div @click="closeModal()" class="close-icon">
                    <font-awesome-icon icon="xmark" />
                </div>
            </template>
            <template #body>
                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Topic Name*</legend>
                    <input type="text" class="fieldset-input" v-model="topicName">
                </fieldset>

                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Topic Description*</legend>
                    <textarea class="fieldset-input" v-model="topicDescription"></textarea>
                </fieldset>
            </template>
        </modal>
    </div>
</template>

<script>
import Modal from '../components/reusable/Modal.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      topicName: '',
      topicDescription: ''
    }
  },
  components: {
    modal: Modal
  },
  computed: {
    ...mapGetters('landing', [ // specify the 'dashboard' namespace
      'currentLoggedInUser'
    ])
  },
  methods: {
    ...mapActions('dashboard', [ // specify the 'dashboard' namespace
      'setTopic'
    ]),
    closeModal () {
      this.$emit('close')
    },
    addTopic () {
      this.setTopic({
        topic_name: this.topicName,
        description: this.topicDescription,
        institute_id: this.currentLoggedInUser.institute_id
      }).then(res => {
        this.$emit('fetch-topics')
      })
      console.log('Topic added:', this.topicName, this.topicDescription)
    }
  }
}
</script>
<style lang="scss" scoped>
  .modal {
    ::v-deep {
      .modal-body {
        height: auto !important;
      }
    }
  }
</style>
