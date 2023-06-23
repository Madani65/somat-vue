<template>
  <div>
    <header-school :title="$vuetify.lang.t('$vuetify.setup.time.title')" />
    <v-card
      elevation="1"
    >
      <v-card-text>
        <v-tabs
          flat
          primary
          v-model="tabs"
          active-class="blue-grey lighten-5 rounded-t-lg"
          class="border-b-solid"
        >
          <v-tab class="text-capitalize">
            {{ $vuetify.lang.t('$vuetify.setup.time.lesson.title') }}
          </v-tab>
          <v-tab class="text-capitalize">
            {{ $vuetify.lang.t('$vuetify.setup.time.extschool.title') }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tabs">
          <v-tab-item><lesson-time-setup /></v-tab-item>
          <v-tab-item><lesson-time-setup code="extra" /></v-tab-item>
        </v-tabs-items>
      </v-card-text> 
    </v-card>
  </div>
</template>

<script>
import HeaderSchool from '@/components/headers/School'
import LessonTimeSetup from '@/views/pages/settings/time/Lesson'

export default {
  components: {
    HeaderSchool,
    LessonTimeSetup
  },
  data() {
    return {
      tabs: null
    }
  }
}
</script>

<style>

</style>