<template>
  <div>
    <v-card
      elevation="1"
    >
      <v-card-title>{{ $vuetify.lang.t('$vuetify.school.level.title') }}</v-card-title>
      <v-card-text>
        <v-tabs
          flat
          primary
          v-model="tabs"
          active-class="blue-grey lighten-5 rounded-t-lg"
          class="border-b-solid"
        >
          <v-tab href="#tab-school" class="text-capitalize">
            {{ $vuetify.lang.t('$vuetify.school.level.title') }}
          </v-tab>
          <v-tab href="#tab-class" class="text-capitalize" :disabled="disabledClass">
            {{ $vuetify.lang.t('$vuetify.school.level.class') }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tabs">
          <v-tab-item value="tab-school">
            <school-level />
          </v-tab-item>
          <v-tab-item value="tab-class">
            <class-level />
          </v-tab-item>
        </v-tabs-items>
      </v-card-text> 
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SchoolLevel from '@/views/pages/settings/level/School'
import ClassLevel from '@/views/pages/settings/level/Classes'

export default {
  components: {
    SchoolLevel,
    ClassLevel
  },
  data() {
    return {
      tabs: "tab-div"
    }
  },
  computed: {
    ...mapState( 'schoollevel', ['selectedSchoolLevel']),
    disabledClass(){
      return false //this.selectedSchoolLevel ? false : true
    },
  },
}
</script>

<style>

</style>