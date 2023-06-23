<template>
  <div>
    <v-card elevation="0" class="mb-2">
      <v-card-text class="px-1 px-md-3">
        <v-row v-if="!dialogForm" class="pb-3">
          <v-col cols="12" md="4">
            <v-row>
              <v-col cols="12">
                <date-picker
                  v-model="selectedDate"
                  :label="$vuetify.lang.t('$vuetify.date')"
                />
              </v-col>
              <v-col cols="12" class="pb-0">
                <span>
                  {{ $vuetify.lang.t('$vuetify.attendence.class_now') }} :
                </span>
              </v-col>
              <v-col cols="12" class="pt-0">
                <span class="title">X-IPS-1 Matematika</span>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="8">
            <template v-for="i in 7">
              <v-card
                link
                @click="showAttendence"
                :key="i"
                :class="((i < 4) ? 'bggreen2':'bggray2') + ' mb-3'"
              >
                <v-card-text>
                  <v-row class="px-2 px-md-4 py-4 subtitle-2">
                    <span>{{ i }}.</span>
                    <v-spacer />
                    <span>
                      X-IPA-1 Matematika
                    </span>
                    <v-spacer />
                    <span>
                      <v-row class="pr-3">08:30 - 09:00</v-row>
                      <v-row class="pr-3">08:30 - 09:00</v-row>
                    </span>
                  </v-row>
                </v-card-text>
              </v-card>
            </template>
          </v-col>
        </v-row>
        <v-row v-else class="pb-3" no-gutters>
          <v-col cols="12">
            <v-row>
              <v-col cols="12" class="pb-0">
                <span class="title">{{ $vuetify.lang.t('$vuetify.class.title') }}: X-IPA-1</span>
              </v-col>
              <v-col cols="12" class="pt-0">
                <span class="subtitle-1 font-weight-bold">{{ new Date(selectedDate) | dateFormat('DD MMMM YYYY') }}</span>
              </v-col>
            </v-row>
            <v-row class="mt-2 mb-1 mx-0">
              <v-btn
                small
                :disabled="loading"
                class="text-capitalize primary white--text"
                @click="attendAll"
              >
                <v-icon size="18" class="mr-1">
                  mdi-fingerprint
                </v-icon>{{ $vuetify.lang.t('$vuetify.attendence.attend_all') }}
              </v-btn>
              <v-btn
                small
                :disabled="loading"
                class="text-capitalize orange white--text ml-2"
                @click="doSave"
              >
                <v-icon size="18" class="mr-1">
                  mdi-content-save
                </v-icon>{{ $vuetify.lang.t('$vuetify.button.save') }}
              </v-btn>
              <v-spacer />
              <v-btn
                small
                :disabled="loading"
                class="text-capitalize red white--text"
                @click="doReset"
              >
                <v-icon size="18" class="mr-1">
                  mdi-close
                </v-icon>{{ $vuetify.lang.t('$vuetify.button.cancel') }}
              </v-btn>
            </v-row>
            <lesson-attendence />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import DatePicker from '@/components/forms/DatePicker'
import LessonAttendence from '@/views/pages/attendences/Lesson.vue'

export default {
  components: {
    DatePicker,
    LessonAttendence
  },

  data() {
    return {
      loading: false,
      dialogForm: false,
      selectedDate: ''
    }
  },

  computed: {
    ...mapState( 'global', ['errors','propsFooterTable', 'propsConfirmDelete']),
    ...mapGetters( 'global', ['getErrorMessage']),
  },

  watch: {

  },

  created(){
    let now = new Date()
    this.selectedDate = now.toISOString().substr(0, 10)
  },

  methods: {
    get(){},
    addNew(){},
    showAttendence(){
      console.log('Show Attendences')
      this.dialogForm = true
    },
    attendAll(){},
    doEdit(){},
    doDelete(){},
    doSave(){},
    doReset(){
      this.dialogForm = false
    }
  }
}
</script>

<style>

</style>