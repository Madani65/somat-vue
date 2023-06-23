<template>
  <div>
    <header-school :title="$vuetify.lang.t('$vuetify.setup.category.title')" />
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
            {{ $vuetify.lang.t('$vuetify.setup.category.lesson.title') }}
          </v-tab>
          <v-tab class="text-capitalize">
            {{ $vuetify.lang.t('$vuetify.setup.category.extschool.title') }}
          </v-tab>
          <v-tab class="text-capitalize">
            {{ $vuetify.lang.t('$vuetify.setup.category.activity.title') }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tabs">
          <v-tab-item><lesson-category /></v-tab-item>
          <v-tab-item><ext-school-category /></v-tab-item>
          <v-tab-item><activity-category /></v-tab-item>
        </v-tabs-items>
      </v-card-text> 
    </v-card>
  </div>
</template>

<script>
import HeaderSchool from '@/components/headers/School'
import LessonCategory from '@/views/pages/settings/category/Lesson'
import ActivityCategory from '@/views/pages/settings/category/Activity'
// import ExtSchoolCategory from '@/views/pages/settings/category/ExtraCurricular'
import ExtSchoolCategory from '@/views/pages/Soon.vue'

export default {
  components: {
    HeaderSchool,
    LessonCategory,
    ActivityCategory,
    ExtSchoolCategory
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