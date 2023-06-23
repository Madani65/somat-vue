<template>
  <div>
    <v-card elevation="0" class="mb-2">
      <v-card-text>
        <v-row class="pb-3">
          <v-col cols="12" md="3">
            <api-select
              dispatch-name="classes/getActive"
              :label="$vuetify.lang.t('$vuetify.class.title')"
              item-text="class_name"
              item-value="class_id"
              :refresh-icon="false"
              hide-details="auto"
            />
          </v-col>
          <v-col cols="12" md="3">
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
          <v-col cols="12" md="3">
            <period-select v-model="periodSelected" return-object multiple />
          </v-col>
          <v-col cols="12" md="3" class="d-flex align-center">
            <v-btn
              small
              width="120"
              :disabled="loading"
              class="text-capitalize primary white--text"
              @click="doFind"
            >
              <v-icon size="18" class="mr-1">
                mdi-text-box-search-outline
              </v-icon>{{ $vuetify.lang.t('$vuetify.button.search') }}
            </v-btn>
          </v-col>
          <v-spacer />
        </v-row>
        <v-row justify="center">
          <v-expansion-panels v-model="panel">
            <v-expansion-panel
              v-for="(item,i) in dailyAttendences"
              :key="i"
            >
              <v-expansion-panel-header class="subtitle-2">
                {{ item.text+' '+item.year }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <span class="subtitle-2">{{ $vuetify.lang.t('$vuetify.assignment.teacher.name') }} : Budiono</span>
                <daily-class :month="item.month" :year="item.year" />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import ApiSelect from '@/components/forms/APISelect'
import PeriodSelect from '@/components/forms/PeriodSelect'
import DailyClass from '@/views/pages/attendences/DailyClass.vue'

export default {
  components: {
    ApiSelect,
    PeriodSelect,
    DailyClass
  },

  data() {
    return {
      loading: false,
      lessonSelected: '',
      periodSelected: [],
      dailyAttendences: [],
      panel: []
    }
  },

  computed: {
    ...mapState( 'global', ['errors','propsFooterTable', 'propsConfirmDelete']),
    ...mapGetters( 'global', ['getErrorMessage']),
  },

  watch: {

  },

  created(){

  },

  methods: {
    get(){},
    addNew(){},
    doEdit(){},
    doDelete(){},
    doSave(){},
    doReset(){},
    doFind(){
      this.panel = []
      let _vue = this
      this.dailyAttendences = []
      this.periodSelected.forEach( function(list){
        _vue.dailyAttendences.push(list)
      })
    }
  }
}
</script>

<style>

</style>