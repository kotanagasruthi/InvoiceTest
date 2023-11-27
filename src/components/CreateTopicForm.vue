<template>
    <div>
        <modal
            close_button_name="Cancel"
            ok_button_name="Add"
            @ok="addForm()"
            @close="closeModal()"
        >
            <template #header>
                <div class="header">{{ from === 'subtopic' ? 'Create Subtopic' : 'Create Topic' }}</div>
                <div @click="closeModal()" class="close-icon">
                    <font-awesome-icon icon="xmark" />
                </div>
            </template>
            <template #body>
                <fieldset class="fieldset">
                    <legend class="fieldset-legend">{{ from === 'subtopic' ? 'SubTopic Name' : 'Topic Name' }}*</legend>
                    <input type="text" class="fieldset-input" v-model="topicName">
                </fieldset>

                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Description*</legend>
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
  props: {
    from: String
  },
  components: {
    modal: Modal
  },
  computed: {
    ...mapGetters('landing', [ // specify the 'dashboard' namespace
      'currentLoggedInUser'
    ]),
    currentTopicName () {
      return this.$route.params.topic
    }
  },
  methods: {
    ...mapActions('dashboard', [ // specify the 'dashboard' namespace
      'setTopic',
      'setSubTopic'
    ]),
    closeModal () {
      this.$emit('close')
    },

    addForm () {
      if (this.from === 'subtopic') {
        this.addSubTopic()
      } else {
        this.addTopic()
      }
    },

    addTopic () {
      this.setTopic({
        topic_name: this.topicName,
        description: this.topicDescription,
        institute_id: this.currentLoggedInUser.institute_id
      }).then(res => {
        this.$emit('fetch-topics')
      })
    },
    addSubTopic () {
      this.setSubTopic({
        topic_name: this.currentTopicName,
        subtopic_name: this.topicName,
        subtopic_description: this.topicDescription,
        institute_id: this.currentLoggedInUser.institute_id
      }).then(res => {
        this.$emit('fetch-sub-topics')
      })
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
