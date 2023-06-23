<template>
  <div>
    <v-card
      elevation="1"
    >
      <v-container>
        <v-row class="pt-4 pb-3">
          <v-btn
            small
            :disabled="loading"
            class="text-capitalize primary white--text"
            @click="addnew()"
          >
            <v-icon size="18" class="mr-1">
              mdi-pencil-plus
            </v-icon>{{ $vuetify.lang.t('$vuetify.button.add') }}
          </v-btn>
          <v-btn
            small
            :loading="loading"
            class="text-capitalize orange white--text ml-2"
            @click="doSave()"
            v-if="shouldBeSave"
          >
            <v-icon size="18" class="mr-1">
              mdi-content-save
            </v-icon>{{ $vuetify.lang.t('$vuetify.button.save') }}
          </v-btn>
          <v-spacer />
          <v-menu offset-y transition="scroll-y-transition">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                small
                :disabled="loading"
                class="text-capitalize blue white--text ml-2"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon size="18" class="mr-1">
                  mdi-format-list-checks
                </v-icon>{{ $vuetify.lang.t('$vuetify.button.bulkaction') }}
              </v-btn>
            </template>
            <v-list dense>
              <v-list-item link>
                <v-icon class="mr-2">
                  mdi-delete-forever
                </v-icon>
                <v-list-item-title>{{ $vuetify.lang.t('$vuetify.bulkaction.delete') }}</v-list-item-title>
              </v-list-item>
              <v-list-item link>
                <v-icon class="mr-2">
                  mdi-file-export
                </v-icon>
                <v-list-item-title>{{ $vuetify.lang.t('$vuetify.bulkaction.export') }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-row>
        <v-row>
          <v-col cols="12" class="pa-0">
            <v-data-table
              v-model="itemSelected"
              show-select
              item-key="uuid"
              :headers="headers"
              :items="lessonTimes[code]"
              :options.sync="options"
              :server-items-length="totalLessonTimes[code]"
              :footer-props="propsFooterTable"
              class="header-table-blue"
              :loading="loading"
              :loading-text="$vuetify.lang.t('$vuetify.loadingdata')"
            >
              <template v-slot:[`item.start_time`]="props">
                <v-text-field
                  v-if="props.item.updated"
                  v-model="props.item.start_time"
                  dense
                  filled
                  readonly
                  hide-details="auto"
                  class="ma-1"
                  required
                  :error-messages="getErrorMessage(`lessontime.${props.index}.start_time`)"
                  @click="setTimePicker(props,'start_time')"
                />
                <span v-else>{{ props.item.start_time }}</span>
              </template>
              <template v-slot:[`item.end_time`]="props">
                <v-text-field
                  v-if="props.item.updated"
                  v-model="props.item.end_time"
                  dense
                  filled
                  readonly
                  hide-details="auto"
                  class="ma-1"
                  required
                  :error-messages="getErrorMessage(`lessontime.${props.index}.end_time`)"
                  @click="setTimePicker(props,'end_time')"
                />
                <span v-else>{{ props.item.end_time }}</span>
              </template>
              <template v-slot:[`item.study_time`]="props">
                <v-select
                  v-if="props.item.updated"
                  v-model="props.item.study_time"
                  :items="studyTime"
                  class="ma-1"
                  filled
                  dense
                  hide-details="auto"
                  :error-messages="getErrorMessage(`lessontime.${props.index}.study_time`)"
                />
                <span v-else>{{ props.item.study_time == 'P' ? 'Pagi' : 'Siang' }}</span>
              </template>
              <template v-slot:[`item.active_flag`]="props">
                <v-switch
                  v-if="props.item.updated"
                  v-model="props.item.active_flag"
                  :label="props.item.active_flag=='Y'?$vuetify.lang.t('$vuetify.active'):$vuetify.lang.t('$vuetify.inactive')"
                  color="primary"
                  true-value="Y"
                  false-value="N"
                  class="ma-1"
                  filled
                  dense
                  hide-details="auto"
                />
                <span v-else>{{ props.item.active_flag=='Y'?$vuetify.lang.t('$vuetify.active'):$vuetify.lang.t('$vuetify.inactive') }}</span>
              </template>
              <template v-slot:[`item.actions`]="props">
                <v-menu
                  v-if="!props.item.updated"
                  bottom
                  left
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list dense class="py-0">
                    <v-list-item @click="props.item.updated=true">
                      <v-list-item-title>
                        <v-icon small>
                          mdi-pencil
                        </v-icon> Ubah
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="doDelete(props)">
                      <v-list-item-title>
                        <v-icon small>
                          mdi-delete-forever
                        </v-icon> Hapus
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
                <v-btn
                  v-if="props.item.updated"
                  small
                  class="text-capitalize red white--text"
                  @click="doCancel(props)"
                  :disabled="loading"
                >
                  <v-icon size="18" class="mr-1">
                    mdi-close-circle
                  </v-icon>{{ $vuetify.lang.t('$vuetify.button.cancel') }}
                </v-btn>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-container>
      <v-dialog
        ref="dialog"
        v-model="selectedTime.dialog"
        width="290px"
      >
        <v-time-picker
          v-if="selectedTime.dialog"
          v-model="selectTime"
          :min="selectedTime.name == 'start_time' ? null : selectedTime.start"
          :max="selectedTime.name == 'end_time' ? null : selectedTime.end"          
          full-width
          format="24hr"
          @click:minute="selectedTime.dialog = false"
        />
      </v-dialog>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  props: {
    code: {
      type: String,
      default: 'study'
    }
  },
  data() {
    return {
      loading: false,
      itemSelected: [],
      options: {},
      timePickerDialog: false,
      timePickerDialog2: false,
      selectedTime: {
        start: '',
        end: '',
        index: -1,
        name: '',
        dialog: false
      },
      origItems: []
    }
  },

  computed: {
    ...mapState( 'global', ['propsFooterTable', 'propsConfirmDelete']),
    ...mapState( 'lessontime',['lessonTimes', 'lessonTime', 'totalLessonTimes', 'totalPageLessonTimes', 'studyTime']),
    ...mapGetters( 'global', ['getErrorMessage']),
    headers(){
      return [
        { text: this.$vuetify.lang.t('$vuetify.setup.time.start'), value: 'start_time', width: '200', sortable: true },
        { text: this.$vuetify.lang.t('$vuetify.setup.time.end'), value: 'end_time', width: '200', sortable: true },
        { text: this.$vuetify.lang.t('$vuetify.setup.time.activity'), value: 'study_time', width: '200', sortable: true },
        { text: this.$vuetify.lang.t('$vuetify.status'), value: 'active_flag', width: '170', sortable: true },
        { text: this.$vuetify.lang.t('$vuetify.control'), value: 'actions', width: '120', sortable: false },
      ]
    },
    shouldBeSave(){
      return this.lessonTimes[this.code].filter( function(item) {
        return item.updated
      }).length
    },
    selectTime: {
      get: function() {
        if( this.selectedTime.index in this.lessonTimes[this.code] ) return this.lessonTimes[this.code][this.selectedTime.index][this.selectedTime.name]
        else return null
      },
      set: function(val) {
        this.lessonTimes[this.code][this.selectedTime.index][this.selectedTime.name] = val+':00'
      }
    }
  },

  watch: {
    'options' : {
      handler() {
        this.get()
      }
    }
  },

  methods: {
    setOrigItems(items){
      let list = []
      items.data.forEach( function(item){ list.push(item) })
      this.origItems = list
    },
    get(){
      this.loading = true
      this.$store.commit('lessontime/CLEAR_DATA', this.code)
      this.$store.dispatch('lessontime/get', { 'options' : this.options, type: this.code }).then( (resp) => {
        this.loading = false
        this.setOrigItems(resp.data)
      }).catch(() => {
        this.loading = false
      })
    },
    doSave(){
      this.loading = true
      this.$store.dispatch('lessontime/save', this.code).then( (resp) => {
        // this.$store.commit('lookupcodes/CLEAR_DATA')
        this.$toastr.s("Data Berhasil disimpan")
        this.loading = false
        this.setOrigItems(resp)
        // this.get()
      }).catch((err) => {
        this.loading = false
        this.$store.commit("global/setErrors", err.response.data.errors)
      })
    },
    addnew(){
      this.$store.commit('lessontime/PUSH_BLANK_DATA', this.code)
    },
    doDelete(data){
      this.$swal({
        ...this.propsConfirmDelete,
        title: this.$vuetify.lang.t('$vuetify.confirmsure'),
        text: this.$vuetify.lang.t('$vuetify.confirmdelete'),
        confirmButtonText: this.$vuetify.lang.t('$vuetify.button.yes'),
        cancelButtonText: this.$vuetify.lang.t('$vuetify.button.no')
      }).then((result) => {
        if (result.value) {
          this.loading = true
          this.$store.dispatch('lessontime/delete', { ...data.item, type: this.code }).then( (resp) => {
            this.origItems.splice(data.index, 1)
            this.loading = false
            if( 'message' in resp ) this.$toastr.s(resp.message)
          }).catch(() => {
            this.loading = false
          })
          this.$store.commit("global/clearErrors")
        }
      })
    },
    doCancel(data){
      this.$store.commit("global/clearErrors")
      if(data.item.lesson_time_id) {
        data.item.start_time = this.origItems[data.index].start_time
        data.item.end_time = this.origItems[data.index].end_time
        data.item.study_time = this.origItems[data.index].study_time
        data.item.active_flag = this.origItems[data.index].active_flag
        data.item.updated = false
      }
      else
        this.$store.commit('lessontime/DELETED_BY_IDX', { ...data, type: this.code})
    },
    setTimePicker(props, type){
      this.selectedTime.start = props.item.start_time
      this.selectedTime.end = props.item.end_time
      this.selectedTime.index = props.index
      this.selectedTime.name = type
      this.selectedTime.dialog = true
    }
  }
}
</script>

<style>

</style>