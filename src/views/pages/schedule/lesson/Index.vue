<template>
  <div>
    <header-school :title="$vuetify.lang.t('$vuetify.schedule.lesson.title')" show-academic-year />
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
            {{ $vuetify.lang.t('$vuetify.schedule.lesson.setup') }}
          </v-tab>
          <v-tab href="#tab-2" class="text-capitalize">
            {{ $vuetify.lang.t('$vuetify.schedule.lesson.teacher') }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tabs">
          <v-tab-item value="tab-1">
            <daily-schedule />
          </v-tab-item>
          <v-tab-item value="tab-2">
            <teacher-schedule />
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import HeaderSchool from '@/components/headers/School'
import DailySchedule from '@/views/pages/schedule/lesson/Daily.vue'
import TeacherSchedule from '@/views/pages/schedule/lesson/Teacher.vue'

export default {
  components: {
    HeaderSchool,
    DailySchedule,
    TeacherSchedule
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