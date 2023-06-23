<template>
  <div>
    <header-school :title="$vuetify.lang.t('$vuetify.organization.manage')" />
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
          <v-tab href="#tab-div" class="text-capitalize">
            {{ $vuetify.lang.t('$vuetify.organization.division.title') }}
          </v-tab>
          <v-tab href="#tab-pos" class="text-capitalize" :disabled="disabledPos">
            {{ $vuetify.lang.t('$vuetify.organization.position.title') }}
          </v-tab>
          <v-tab href="#tab-job" class="text-capitalize" :disabled="disabledJob">
            {{ $vuetify.lang.t('$vuetify.organization.job.title') }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tabs">
          <v-tab-item value="tab-div">
            <organization />
          </v-tab-item>
          <v-tab-item value="tab-pos">
            <position />
          </v-tab-item>
          <v-tab-item value="tab-job">
            <job />
          </v-tab-item>
        </v-tabs-items>
      </v-card-text> 
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import HeaderSchool from '@/components/headers/School'
import Organization from '@/views/pages/settings/organization/Division'
import Position from '@/views/pages/settings/organization/Position'
import Job from '@/views/pages/settings/organization/Job'

export default {
  components: {
    HeaderSchool,
    Organization,
    Position,
    Job
  },
  data() {
    return {
      tabs: "tab-div"
    }
  },
  computed: {
    ...mapState( 'organizations', ['selectedOrganization']),
    ...mapState( 'positions', ['selectedPosition']),
    disabledPos(){
      return this.selectedOrganization ? false : true
    },
    disabledJob(){
      return this.selectedPosition ? false : true
    }
  },
}
</script>

<style>

</style>