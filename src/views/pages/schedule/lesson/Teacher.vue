<template>
  <div>
    <v-card elevation="0" class="mb-0">
      <v-card-text>
        <v-row class="pt-4">
          <v-col cols="12" md="6" class="pt-0">
            <api-select
              v-model="teacherSelected"
              dispatch-name="employees/getTeacher"
              :label="$vuetify.lang.t('$vuetify.assignment.teacher.name')"
              item-text="employee_full_name"
              item-value="employee_id"
              :refresh-icon="false"
            />
          </v-col>
        </v-row>
        <v-row class="pa-3 my-0">
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
            </v-list>
          </v-menu>
        </v-row>
        <v-row class="mt-0">
          <v-col cols="12" class="pt-0">
            <v-simple-table
              fixed-header
              dense
              class="table-border"
            >
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-center bgblue white--text" v-for="(head, i) in headers" :key="i">
                      {{ head.text }}
                    </th>
                  </tr>
                </thead>
                <tbody v-if="schedules.length > 0">
                  <template v-for="day in daysInWeek">
                    <template v-for="(row, j) in getScheduleDay(day.key)">
                      <tr :key="row.schedule_class_id">
                        <td v-if="j==0" :rowspan="getScheduleDay(day.key).length" class="text-center">
                          {{ row.study_day }}
                        </td>
                        <td class="text-center">
                          {{ row.lesson_time_name }}
                        </td>
                        <td class="text-center">
                          {{ row.lesson_name }}
                        </td>
                        <td class="text-center">
                          {{ row.class_name }}
                        </td>
                      </tr>
                    </template>
                  </template>
                </tbody>
                <tbody v-else>
                  <tr>
                    <td colspan="4" class="text-center">
                      {{ $vuetify.lang.t('$vuetify.nodata') }}
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
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
      loading: false,
      teacherSelected: ''
    }
  },

  computed: {
    ...mapState( 'global', ['errors','propsFooterTable', 'propsConfirmDelete']),
    ...mapState( 'schedule', {
      schedules: state => state.teacher
    }),
    ...mapGetters( 'global', ['getErrorMessage']),
    headers(){
      return [
        { text: this.$vuetify.lang.t('$vuetify.day'), value: 'day_name', sortable: true },
        { text: this.$vuetify.lang.t('$vuetify.time'), value: 'time_range', sortable: true },
        { text: this.$vuetify.lang.t('$vuetify.lesson.title'), value: 'lesson_name', sortable: true },
        { text: this.$vuetify.lang.t('$vuetify.class.title'), value: 'class_name', sortable: true },
      ]
    },
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
  },

  watch: {
    teacherSelected: {
      handler() {
        this.get()
      }
    }
  },

  created(){
    //this.get()
  },

  methods: {
    get(){
      this.loading = true
      this.$store.dispatch('schedule/getByTeacher', this.teacherSelected ).finally(() => {
        this.loading = false
      })
    },
    getScheduleDay(key){
      return this.schedules.filter( function(data) { return data.study_day == key } )
    },
    addNew(){},
    doEdit(){},
    doDelete(){},
    doSave(){},
    doReset(){}
  }
}
</script>

<style>

</style>