<template>
  <div>
    <header-school :title="$vuetify.lang.t('$vuetify.attendence.student')" show-academic-year />
    <v-card elevation="1" class="mb-2">
      <v-card-text>
        <v-tabs
          flat
          primary
          v-model="tabs"
          active-class="blue-grey lighten-5 rounded-t-lg"
          class="border-b-solid"
        >
          <v-tab href="#tab-1" class="text-capitalize">
            {{ $vuetify.lang.t('$vuetify.attendence.today') }}
          </v-tab>
          <v-tab href="#tab-2" class="text-capitalize">
            {{ $vuetify.lang.t('$vuetify.attendence.daily') }}
          </v-tab>
          <v-tab href="#tab-3" class="text-capitalize">
            {{ $vuetify.lang.t('$vuetify.attendence.lesson') }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tabs" touchless>
          <v-tab-item value="tab-1">
            <today-attendence />
          </v-tab-item>
          <v-tab-item value="tab-2">
            <daily-attendence />
          </v-tab-item>
          <v-tab-item value="tab-3">
            <daily-lesson-attendence />
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import HeaderSchool from '@/components/headers/School'
import TodayAttendence from '@/views/pages/attendences/Today.vue'
import DailyAttendence from '@/views/pages/attendences/Daily.vue'
import DailyLessonAttendence from '@/views/pages/attendences/DailyLesson.vue'

export default {
  components: {
    HeaderSchool,
    TodayAttendence,
    DailyAttendence,
    DailyLessonAttendence
  },

  data() {
    return {
      tabs: "tab-div"
    }
  },

  computed: {
    
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
    doReset(){}
  }
}
</script>

<style>

</style>