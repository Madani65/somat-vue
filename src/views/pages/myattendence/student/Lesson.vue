<template>
  <div>
    <v-card elevation="0" class="mb-2">
      <v-card-text class="px-0 px-md-3">
        <v-row class="pb-3" no-gutters>
          <v-col cols="12">
            <span class="subtitle-2">{{ $vuetify.lang.t('$vuetify.student.name') }}: Reyhan Adian Putra</span>
          </v-col>
          <v-col cols="12">
            <span class="subtitle-2 font-weight-regular">{{ $vuetify.lang.t('$vuetify.student.nis') }}: 123123123</span>
          </v-col>
        </v-row>
        <v-row class="pb-3 mt-0 d-flex align-center">
          <v-col
            cols="12"
            md="4"
            order="1"
            order-md="0"
            class="pt-0"
          >
            <period-select v-model="periodSelected" return-object />
          </v-col>
          <v-col
            cols="12"
            md="4"
            order="2"
            order-md="1"
            class="pt-0"
          >
            <api-select
              v-model="lessonSelected"
              dispatch-name="lessons/getActive"
              :label="$vuetify.lang.t('$vuetify.lesson.title')"
              item-text="lesson_name"
              item-value="lesson_id"
              :refresh-icon="false"
              return-object
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="8"
            order="2"
            order-sm="1"
          >
            <v-simple-table dense class="table-border table-sticky table-striped">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-center bgblue white--text col-freeze" style="left:0px;width:50px">
                      No.
                    </th>
                    <th class="text-center bgblue white--text col-freeze" style="left:52px;width:130px">
                      {{ $vuetify.lang.t('$vuetify.date') }}
                    </th>
                    <th class="text-center bgblue white--text" style="width:130px">
                      {{ $vuetify.lang.t('$vuetify.attendence.status') }}
                    </th>
                    <th class="text-center bgblue white--text">
                      {{ $vuetify.lang.t('$vuetify.attendence.detail') }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="d in getLastDate" :key="d">
                    <td class="text-center col-freeze" style="left:0px;">
                      {{ d }}
                    </td>
                    <td class="text-center col-freeze" style="left:52px">
                      {{ new Date(periodSelected.value+'-'+d) | dateFormat('DD MMM YYYY') }}
                    </td>
                    <td :class="getBgColor(d,'H')">
                      <v-icon v-if="!getHoliday(d)" v-text="getIcon('H')" color="white" /> <span v-if="!getHoliday(d)" class="white--text">{{ getTitle['H'] }}</span>
                    </td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr v-if="!periodSelected">
                    <td colspan="4" class="text-center">
                      {{ $vuetify.lang.t('$vuetify.attendence.please_select_period') }}
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
          <v-col
            cols="12"
            md="4"
            order="1"
            order-sm="2"
          >
            <v-row>
              <v-col cols="12">
                <v-card elevation="0" outlined>
                  <v-card-title class="justify-center py-1 subtitle-2">
                    {{ $vuetify.lang.t('$vuetify.attendence.percentage') }}
                  </v-card-title>
                  <v-card-text class="pt-1">
                    <apexchart
                      ref="absensi"
                      height="335"
                      type="donut"
                      :options="chart.absensi.options"
                      :series="chart.absensi.series"
                    />
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12">
                <v-card elevation="0" outlined>
                  <v-card-title class="justify-center py-1 subtitle-2">
                    {{ $vuetify.lang.t('$vuetify.attendence.permit_letter_title') }}
                  </v-card-title>
                  <v-card-text class="py-1 px-0">
                    <v-list dense class="py-0">
                      <template v-for="(event, i) in events" two-line>
                        <v-divider :key="i+'key'" />
                        <v-list-item :key="i">
                          <v-list-item-content>
                            <v-list-item-title
                              v-if="event.start == event.end"
                            >
                              {{ new Date(event.start) | dateFormat('DD MMM YYYY') }}
                            </v-list-item-title>
                            <v-list-item-title
                              v-if="event.start < event.end"
                            >
                              {{ new Date(event.start) | dateFormat('DD MMM YYYY') }} s.d. {{ new Date(event.end) | dateFormat('DD MMM YYYY') }}
                            </v-list-item-title>
                            <v-list-item-subtitle v-text="event.title" />
                          </v-list-item-content>
                        </v-list-item>
                      </template>
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import VueApexCharts from "vue-apexcharts"
import * as dummy from "@/dummy"
import Util from "@/util"
import PeriodSelect from '@/components/forms/PeriodSelect'
import ApiSelect from '@/components/forms/APISelect'

export default {
  components: {
    PeriodSelect,
    ApiSelect,
    apexchart: VueApexCharts,
  },

  data() {
    return {
      loading: false,
      periodSelected: '',
      lessonSelected: '',
      events: [],
      chart: {
        absensi: {
          options: {
            legend: {
              show: true,
              position: "bottom",
              horizontalAlign: "center",
              verticalAlign: "middle",
              floating: false,
              fontSize: "14px",
              offsetX: 0,
              offsetY: 7,
            },
            colors: ["#3CBE6D", "#FACA42", "#F05857", "#2773C1"],
            tooltip: {
              y: {
                formatter(val) {
                  return val + " Hari"
                },
              },
            },
            labels: [],
          },
          series: [],
        },
      }
    }
  },

  computed: {
    ...mapState( 'global', ['errors','propsFooterTable', 'propsConfirmDelete']),
    ...mapGetters( 'global', ['getErrorMessage']),
    lastDate(){
      return new Date((new Date(this.periodSelected.year, this.periodSelected.month+1, 1)) - 1)      
    },
    getLastDate(){
      if(this.periodSelected)
        return this.lastDate.getDate()
      else
        return 0
    },
    getTitle(){
      return {
        'H': this.$vuetify.lang.t('$vuetify.attendence.present'),
        'I': this.$vuetify.lang.t('$vuetify.attendence.permit'),
        'S': this.$vuetify.lang.t('$vuetify.attendence.sick'),
        'A': this.$vuetify.lang.t('$vuetify.attendence.alpha'),
      }
    }
  },

  watch: {
    periodSelected: {
      handler(){
        this.getAbsensi()
      }
    }
  },

  mounted(){
    
  },

  created(){
    this.events = dummy.dashboard.permitLetter
  },

  methods: {
    getDate(d){
      return new Date(new Date(this.periodSelected.year, this.periodSelected.month, d))
    },
    getHoliday(d){
      let day = this.getDate(d).getDay()
      if( (day === 0 || day === 6) )
        return true
      else
        return false
    },
    getIcon(type){
      if( type == 'H' )
        return 'mdi-fingerprint'
      else if( type == 'S' )
        return 'mdi-plus-box'
      else if( type == 'I' )  
        return 'mdi-email-newsletter'
      else if( type == 'A' )
        return 'mdi-alpha-a-box'
    },
    getBgColor(d,t){
      if(this.getHoliday(d)) return 'px-1 bgred text-center'
      else {
        if(t=='H')
          return 'px-1 bggreen text-center'
        else if(t=='I')
          return 'px-1 bgorange text-center'
        else if(t=='S')
          return 'px-1 bgred text-center'
        else
          return 'px-1 bgblue text-center'
      }
    },
    getAbsensi() {
      const data = dummy.dashboard.absensi
      this.chart.absensi.series = Util.getSingleDataSeries(data, "value")
      this.$refs.absensi.updateOptions({
        labels: Util.getSingleDataSeries(data),
      })
    },
    get(){},
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