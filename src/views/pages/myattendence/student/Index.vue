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
            {{ $vuetify.lang.t('$vuetify.attendence.daily') }}
          </v-tab>
          <v-tab href="#tab-2" class="text-capitalize">
            {{ $vuetify.lang.t('$vuetify.attendence.lesson') }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tabs" touchless>
          <v-tab-item value="tab-1">
            <daily-page />
          </v-tab-item>
          <v-tab-item value="tab-2">
            <lesson-page />
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import HeaderSchool from '@/components/headers/School'
import DailyPage from '@/views/pages/myattendence/student/Daily.vue'
import LessonPage from '@/views/pages/myattendence/student/Lesson.vue'

export default {
  components: {
    HeaderSchool,
    DailyPage,
    LessonPage
  },

  data() {
    return {
      tabs: "tab-1"
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