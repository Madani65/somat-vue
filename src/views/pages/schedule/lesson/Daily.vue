<template>
  <div>
    <v-card elevation="0" class="mb-2">
      <v-card-text class="px-0">
        <v-row class="py-4">
          <v-col cols="12" md="6" class="pt-0">
            <api-select
              dispatch-name="classes/getActive"
              :label="$vuetify.lang.t('$vuetify.class.title')"
              item-text="class_name"
              item-value="class_id"
              :refresh-icon="false"
            />
          </v-col>
        </v-row>
        <v-row class="pb-3 px-3">
          <v-btn
            small
            :disabled="loading"
            class="text-capitalize primary white--text"
            @click="doSave"
          >
            <v-icon size="18" class="mr-1">
              mdi-content-save
            </v-icon>{{ $vuetify.lang.t('$vuetify.button.save') }}
          </v-btn>
          <v-btn
            small
            :disabled="loading"
            class="text-capitalize red white--text ml-2"
          >
            <v-icon size="18" class="mr-1">
              mdi-earth
            </v-icon>{{ $vuetify.lang.t('$vuetify.button.publish') }}
          </v-btn>
          <v-spacer />
        </v-row>
        <v-row>
          <v-col cols="12">
            <splide :options="options">
              <splide-slide v-for="(day, i) in daysInWeek" :key="i">
                <v-card elevation="1" class="mb-2">
                  <v-card-title class="blueheader white--text py-1 justify-center" v-text="day.name" />
                  <v-card-text class="mt-3">
                    <v-list
                      subheader
                      two-line
                    >
                      <v-list-item v-for="(list, d) in getScheduleDay(day.key)" :key="d" class="outlined rounded-lg pr-2 yellowheader mb-2">
                        <v-list-item-content>
                          <v-list-item-subtitle v-text="list.lesson_time_name" />
                          <v-list-item-subtitle v-text="list.lesson_name" />
                        </v-list-item-content>
                        <v-list-item-action>
                          <v-menu
                            bottom
                            left
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                icon
                                small
                                v-bind="attrs"
                                v-on="on"
                              >
                                <v-icon>mdi-dots-vertical</v-icon>
                              </v-btn>
                            </template>
                            <v-list dense class="py-0">
                              <v-list-item>
                                <v-list-item-title>
                                  <v-icon small>
                                    mdi-pencil
                                  </v-icon> {{ $vuetify.lang.t('$vuetify.button.update') }}
                                </v-list-item-title>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-title>
                                  <v-icon small>
                                    mdi-delete-forever
                                  </v-icon> {{ $vuetify.lang.t('$vuetify.button.delete') }}
                                </v-list-item-title>
                              </v-list-item>
                            </v-list>
                          </v-menu>
                        </v-list-item-action>
                      </v-list-item>
                      <v-list-item class="outlined rounded-lg pr-0 yellowheader justify-center">
                        <v-list-item-action>
                          <v-btn icon @click="addNew()">
                            <v-icon>mdi-plus-circle-outline</v-icon>
                          </v-btn>
                        </v-list-item-action>
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                </v-card>
              </splide-slide>
            </splide>
          </v-col>
        </v-row>
        <v-row class="mt-0">
          <v-col cols="12">
            <v-alert
              dense
              text
              type="error"
              border="left"
              class="body-2"
            >
              Terdapat jadwal dengan waktu yang bersamaan. <v-btn
                plain
                small
                dense
                color="black"
                class="text-capitalize text-decoration-underline"
                @click="dialogTable = true"
              >
                Lihat Daftar
              </v-btn>
            </v-alert>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <span class="subtitle-2">Informasi Guru :</span>
          </v-col>
        </v-row>
        <v-card elevation="0">
          <v-card-text>
            <v-row>
              <v-col
                cols="12"
                md="4"
                v-for="i in 12"
                :key="i"
                class="pt-0 pb-1"
              >
                <v-row no-gutters>
                  <v-col cols="5" class="d-flex align-center">
                    Bahasa Indonesia
                  </v-col>
                  <v-col cols="7" class="d-flex align-center">
                    : Sarah Andini S.Pd
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-card-text>
    </v-card>
    <v-dialog v-model="dialogForm" persistent max-width="450px">
      <v-form>
        <v-card>
          <v-card-title class="greenheader white--text py-2">
            {{ $vuetify.lang.t('$vuetify.schedule.lesson.form') }}
          </v-card-title>
          <v-card-text class="pb-0 px-0">
            <v-tabs
              flat
              primary
              fixed-tabs
              v-model="tabs"
              active-class="blue-grey lighten-5"
              class="border-b-solid"
              height="45"
            >
              <v-tab href="#tab-1" class="text-capitalize subtitle-2">
                {{ $vuetify.lang.t('$vuetify.schedule.lesson.title') }}
              </v-tab>
              <v-tab href="#tab-2" class="text-capitalize subtitle-2">
                {{ $vuetify.lang.t('$vuetify.schedule.activity.title') }}
              </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tabs">
              <v-tab-item value="tab-1">
                <v-row class="px-6 pt-2 pb-4">
                  <v-col cols="12" class="pt-0">
                    <api-select
                      dispatch-name="lessontime/getNoPaging"
                      dispatch-params="P"
                      :label="$vuetify.lang.t('$vuetify.setup.time.lesson.title')"
                      item-text="lesson_time_title"
                      item-value="lesson_time_id"
                      :refresh-icon="false"
                    />
                  </v-col>
                  <v-col cols="12" class="pt-0">
                    <api-select
                      dispatch-name="lessons/getActive"
                      :label="$vuetify.lang.t('$vuetify.lesson.name')"
                      item-text="lesson_name"
                      item-value="lesson_id"
                      :refresh-icon="false"
                    />
                  </v-col>
                  <v-col cols="12" class="pt-0">
                    <api-select
                      dispatch-name="employees/getTeacher"
                      :label="$vuetify.lang.t('$vuetify.assignment.teacher.name')"
                      item-text="employee_full_name"
                      item-value="employee_id"
                      :refresh-icon="false"
                    />
                  </v-col>
                </v-row>
              </v-tab-item>
              <v-tab-item value="tab-2">
                <v-row class="px-6 py-4">
                  <v-col cols="12" class="pt-0">
                    <api-select
                      dispatch-name="lessontime/getNoPaging"
                      dispatch-params="P"
                      :label="$vuetify.lang.t('$vuetify.setup.time.lesson.title')"
                      item-text="lesson_time_title"
                      item-value="lesson_time_id"
                      :refresh-icon="false"
                    />
                  </v-col>
                  <v-col cols="12" class="pt-0">
                    <api-select
                      dispatch-name="activity/getActive"
                      :label="$vuetify.lang.t('$vuetify.setup.category.activity.select')"
                      item-text="activity_name"
                      item-value="activity_id"
                      :refresh-icon="false"
                    />
                  </v-col>
                </v-row>
              </v-tab-item>
            </v-tabs-items>
          </v-card-text>
          <v-divider />
          <v-card-actions class="px-4 py-3">
            <div class="flex-grow-1" />
            <v-btn
              small
              type="submit"
              :loading="loading"
              @click.prevent="doSave"
              class="text-capitalize primary white--text"
            >
              {{ $vuetify.lang.t('$vuetify.button.add') }}
            </v-btn>
            <v-btn
              small
              :disabled="loading"
              @click="doReset"
              class="text-capitalize red white--text"
            >
              {{ $vuetify.lang.t('$vuetify.button.cancel') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
    <v-dialog v-model="dialogTable" persistent max-width="800px">
      <v-card>
        <v-card-title class="greenheader white--text py-2">
          {{ $vuetify.lang.t('$vuetify.schedule.lesson.intersect') }}
          <v-spacer />
          <v-btn icon small @click="dialogTable = false">
            <v-icon color="white">
              mdi-close
            </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="pa-4">
          <v-row class="pa-3 mb-0">
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
              <v-list dense class="py-0">
                <v-list-item link>
                  <v-icon class="mr-2">
                    mdi-file-export
                  </v-icon>
                  <v-list-item-title>{{ $vuetify.lang.t('$vuetify.bulkaction.export') }}</v-list-item-title>
                </v-list-item>
                <v-list-item link>
                  <v-icon class="mr-2">
                    mdi-printer
                  </v-icon>
                  <v-list-item-title>{{ $vuetify.lang.t('$vuetify.bulkaction.print') }}</v-list-item-title>
                </v-list-item>
                <v-list-item link>
                  <v-icon class="mr-2">
                    mdi-autorenew
                  </v-icon>
                  <v-list-item-title>{{ $vuetify.lang.t('$vuetify.bulkaction.autofix') }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-row>
          <v-data-table 
            :items="items"
            :headers="headers"
            hide-default-footer
            disable-pagination
            class="header-table-blue mb-2"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import ApiSelect from '@/components/forms/APISelect'

export default {
  components: {
    ApiSelect
  },

  data() {
    return {
      items: [],
      loading: false,
      dialogForm: false,
      dialogTable: false,
      activeDayLength: 5,
      tabs: 0,
      options: {
        rewind: true,
        gap: "1rem",
        perMove: 1,
        pagination: false,
        breakpoints: {
          1920: {
            perPage: 4,
            gap: "1rem",
          },
          1600: {
            perPage: 3,
            gap: "1rem",
          },
          960: {
            perPage: 2,
            gap: "1rem",
          },
          640: {
            perPage: 1,
            gap: "1rem",
          },
        },
        padding: {
          left: '10px',
          right: '10px'
        }
      },
      lessonList: [
        { time: '07:00 - 07:45', activity: 'Upacara'}
      ]
    }
  },

  computed: {
    ...mapState( 'global', ['errors','propsFooterTable', 'propsConfirmDelete']),
    ...mapState( 'schedule', {
      schedules: state => state.class
    }),
    ...mapGetters( 'global', ['getErrorMessage']),
    daysInWeek(){
      return [
        { key: 'Senin', name: this.$vuetify.lang.t('$vuetify.days_in_week.mon') },
        { key: 'Selasa', name: this.$vuetify.lang.t('$vuetify.days_in_week.tue') },
        { key: 'Rabu', name: this.$vuetify.lang.t('$vuetify.days_in_week.wed') },
        { key: 'Kamis', name: this.$vuetify.lang.t('$vuetify.days_in_week.thu') },
        { key: 'Jumat', name: this.$vuetify.lang.t('$vuetify.days_in_week.fri') },
        { key: 'Sabtu', name: this.$vuetify.lang.t('$vuetify.days_in_week.sat') },
      ]
    },
    headers(){
      return [
        { text: this.$vuetify.lang.t('$vuetify.day'), value: 'day_name', sortable: true },
        { text: this.$vuetify.lang.t('$vuetify.time'), value: 'time_range', sortable: true },
        { text: this.$vuetify.lang.t('$vuetify.class.title'), value: 'class_name', sortable: true },
        { text: this.$vuetify.lang.t('$vuetify.lesson.title'), value: 'lesson_name', sortable: true },
        { text: this.$vuetify.lang.t('$vuetify.assignment.teacher.name'), value: 'teacher_name', sortable: true },
      ]
    }
  },

  watch: {

  },

  created(){
    this.get()
  },

  methods: {
    get(){
      this.loading = true
      this.$store.dispatch('schedule/getByClass').finally(() => {
        this.loading = false
      })
    },
    getScheduleDay(key){
      return this.schedules.filter( function(data) { return data.study_day == key } )
    },
    addNew(){
      this.dialogForm = true
    },
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