<template>
    <div>
        <modal close_button_name="Cancel" ok_button_name="Add" @ok="addTopic()" @close="closeModal()">
            <template #header>
                <div class="header">Select Formats</div>
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
  created () {
    this.fetchCommonExamFormats()
  },
  methods: {
    ...mapActions('dashboard', [ // specify the 'dashboard' namespace
      'fetchAllExamFormats'
    ]),
    fetchCommonExamFormats () {
      this.isLoading = true
      this.fetchAllExamFormats(this.currentLoggedInUser.institute_id).then(res => {
        this.isLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
