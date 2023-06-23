<template>
  <v-card
    elevation="1"
    class="mb-2"
  >
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6" class="pt-0">
          <v-autocomplete
            v-model="selectSchool"
            :items="schools"
            return-object
            :label="$vuetify.lang.t('$vuetify.school.name')"
            item-text="name"
            item-value="school_id"
            hide-details="auto"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
          class="pt-0"
          v-if="showAcademicYear"
        >
          <v-autocomplete
            v-model="selectAcademicYear"
            :items="periodYears"
            return-object
            :label="$vuetify.lang.t('$vuetify.academic.period.year')"
            item-text="start_year"
            item-value="academic_year_id"
            hide-details="auto"
          >
            <template v-slot:item="{ item }">
              {{ item.start_year + '/' + item.end_year }}
            </template>
            <template v-slot:selection="{ item }">
              {{ item.start_year + '/' + item.end_year }}
            </template>
          </v-autocomplete>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    title: {
      type: String,
      default: null
    },
    showAcademicYear: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    ...mapState('profiles', [ 'schools', 'selectedSchool', 'selectedAcademicYear'] ),
    ...mapState( 'periodacademic', ['periodYears']),
    selectSchool: {
      get() { return this.selectedSchool },
      set(val) { 
        this.$store.state.profiles.selectedSchool = val.school_id 
        this.$store.state.profiles.selectedSchoolLevel = val.school_level_id 
      }
    },
    selectAcademicYear: {
      get() { return this.selectedAcademicYear },
      set(val) {
        this.$store.state.profiles.selectedAcademicYear = val.academic_year_id
      }
    }
  }
}
</script>

<style>

</style>