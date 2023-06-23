<template>
  <v-container class="px-0 py-2">
    <v-row>
      <v-col cols="12">
        <span class="title px-4">{{ $vuetify.lang.t('$vuetify.employee.title') }}</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="8" class="pt-0">
        <v-card>
          <v-card-text class="pb-6">
            <v-row>
              <v-col cols="12" md="6" class="pt-0">
                <v-text-field
                  v-model="employee.nip"
                  :label="$vuetify.lang.t('$vuetify.employee.nip')"
                  hide-details="auto"
                  :error-messages="errors['employee.nip']"
                />
              </v-col>
              <v-col cols="12" md="6" class="pt-0">
                <v-text-field
                  v-model="employee.nuptk"
                  :label="$vuetify.lang.t('$vuetify.employee.nuptk')"
                  hide-details="auto"
                  :error-messages="errors['employee.nuptk']"
                />
              </v-col>
              <v-col cols="12" md="6" class="pt-0">
                <v-text-field
                  v-model="employee.status"
                  :label="$vuetify.lang.t('$vuetify.employee.status')"
                  hide-details="auto"
                  :error-messages="errors['employee.status']"
                />
              </v-col>
              <v-col cols="12" md="6" class="pt-0">
                <v-text-field
                  v-model="employee.sk"
                  :label="$vuetify.lang.t('$vuetify.employee.sk')"
                  hide-details="auto"
                  :error-messages="errors['employee.sk']"
                />
              </v-col>
              <v-col cols="12" md="6" class="pt-0">
                <v-autocomplete
                  v-model="organizationSelected"
                  :items="organizations"
                  :label="$vuetify.lang.t('$vuetify.organization.division.title')"
                  hide-details="auto"
                  item-text="name"
                  item-value="organization_id"
                  return-object
                />
              </v-col>
              <v-col cols="12" md="6" class="pt-0">
                <v-autocomplete
                  v-model="positionSelected"
                  :items="positions"
                  :label="$vuetify.lang.t('$vuetify.organization.position.title')"
                  hide-details="auto"
                  item-text="name"
                  item-value="position_id"
                  return-object
                />
              </v-col>
              <v-col cols="12" md="6" class="pt-0">
                <v-autocomplete
                  v-model="jobSelected"
                  :items="jobs"
                  :label="$vuetify.lang.t('$vuetify.organization.job.title')"
                  hide-details="auto"
                  item-text="job_name"
                  item-value="job_id"
                  return-object
                />
              </v-col>
              <v-col cols="12" md="6" class="pt-0">
                <v-select
                  v-model="jobClassificationSelected"
                  :items="jobTypeList"
                  :label="$vuetify.lang.t('$vuetify.organization.job.type')"
                  multiple
                  return-object
                  hide-details="auto"
                  item-text="classification_name"
                  item-value="classification_id"
                  :error-messages="errors['employee.jobs']"
                />
              </v-col>
              <v-col cols="12" md="6" class="pt-0">
                <date-picker v-model="employee.effective_start_date" :min="employee.effective_end_date" :label="$vuetify.lang.t('$vuetify.employee.active_start')" />
              </v-col>
              <v-col cols="12" md="6" class="pt-0">
                <date-picker v-model="employee.effective_end_date" :min="employee.effective_start_date" :label="$vuetify.lang.t('$vuetify.employee.active_end')" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4" class="pt-0">
        <v-card>
          <v-card-text class="pb-6">
            <v-row>
              <v-col cols="12" class="pt-0">
                <template 
                  v-for="(list, i) in bidangStudi"
                >
                  <v-text-field
                    :key="i"
                    v-model="bidangStudi[i]"
                    :label="i ? null:$vuetify.lang.t('$vuetify.employee.skill')"
                    hide-details="auto"
                    :prefix="(i+1) + '.'"
                    append-outer-icon="mdi-close-circle"
                    @click:append-outer="removeSkill(i)"
                  />
                </template>
              </v-col>
            </v-row>
            <v-card-actions class="mt-2">
              <v-btn
                small
                :loading="loading"
                class="text-capitalize primary white--text"
                @click="addSkill"
              >
                <v-icon size="18" class="mr-1">
                  mdi-pencil-plus
                </v-icon>{{ $vuetify.lang.t('$vuetify.button.add') }}
              </v-btn>
              <v-spacer />
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import DatePicker from '@/components/forms/DatePicker'

export default {
  components: {
    DatePicker
  },
  data() {
    return {
      loading: false,
      selectedType: [],
      bidangStudi: [''],
      jobTypeList: [
        { classification_id : 1, classification_name : 'Tenaga Pendidik' },
        { classification_id : 2, classification_name : 'Tenaga Kependidikan' },
      ],
      organization_id: '',
      position_id: '',
      job_id: '' 
    }
  },
  
  computed: {
    ...mapState("global", ["errors"]),
    ...mapState('employees', ['employee']),
    ...mapState('classifications', ['classifications', 'multipleSelectedClassification']),
    ...mapState( 'organizations', ['organizations', 'organization','selectedOrganization']),
    ...mapState( 'positions', ['positions', 'position', 'selectedPosition']),
    ...mapState( 'jobs', ['jobs', 'job', 'selectedJob']),
    organizationSelected: {
      get: function () {
        return this.selectedOrganization
      },
      set: function (value) {
        this.$store.commit("organizations/SET_SELECTED_ITEM", value)
        console.log(' organizations '+ value.name)
        this.$store.dispatch('positions/get', {'options' : { 'sortBy': [], 'sortDesc': [], 'page': 1, 'itemsPerPage': 1000}})
      }
    },
    positionSelected: {
      get: function () {
        return this.selectedPosition
      },
      set: function (value) {
        this.$store.commit("positions/SET_SELECTED_ITEM", value)
        console.log(' position '+ value.name)
        this.$store.dispatch('jobs/get', {'options' : { 'sortBy': [], 'sortDesc': [], 'page': 1, 'itemsPerPage': 1000}})
      }
    },
    jobSelected: {
      get: function () {
        return this.selectedJob
      },
      set: function (value) {
        this.$store.commit("jobs/SET_SELECTED_ITEM", value)
        console.log(' job '+ value.job_name)
      }
    },
    jobClassificationSelected: {
      get: function () {
        return this.multipleSelectedClassification
      },
      set: function (value) {
        this.$store.commit("classifications/SET_MULTISELECTED_ITEM", value)
        console.log(value)
      }
    }
  },

  created() {
    this.$store.dispatch('organizations/getNoPaging')
    // this.$store.dispatch('classifications/getNoPaging')
  },

  methods: {
    getPositions(){
      this.$store.dispatch('positions/get')
    },
    removeSkill(idx){
      console.log('delete item')
      if( this.bidangStudi.length > 1 )
        this.bidangStudi.splice(idx, 1)
      else
        this.bidangStudi.splice(idx, 1, '')
    },
    addSkill(){
      console.log('add item')
      this.bidangStudi.push('')
    }
  }
}
</script>

<style>

</style>