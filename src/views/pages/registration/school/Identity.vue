<template>
  <div>
    <header-school :title="$vuetify.lang.t('$vuetify.school.identity')" />
    <v-card
      elevation="1"
    >
      <v-card-text>
        <v-row class="pa-3">
          <span class="title" v-if="!showForm">{{ school.name }}</span>
          <v-spacer />
          <v-btn
            small
            :disabled="loading"
            class="text-capitalize primary"
            dark
            v-if="!school.school_id && !showForm"
            @click="newForm()"
          >
            <v-icon size="18" class="mr-1">
              mdi-pencil
            </v-icon>Isi Kelengkapan Data
          </v-btn>
          <v-btn
            small
            :disabled="loading"
            class="text-capitalize primary"
            dark
            v-if="school.school_id && !showForm"
            @click="showForm = true"
          >
            <v-icon size="18" class="mr-1">
              mdi-pencil
            </v-icon>Ubah
          </v-btn>
        </v-row>
        <new-school v-if="showForm" />
        <view-school v-if="!showForm" />
        <v-card-actions class="mt-5">
          <v-spacer />
          <v-btn
            small
            :loading="loading"
            class="text-capitalize primary white--text"
            v-if="showForm"
            @click="doSave()"
          >
            <v-icon size="18" class="mr-1">
              mdi-content-save
            </v-icon>Simpan
          </v-btn>
          <v-btn
            small
            :disabled="loading"
            class="text-capitalize red white--text"
            v-if="showForm"
            @click="cancelForm()"
          >
            <v-icon size="18" class="mr-1">
              mdi-close
            </v-icon>Batal
          </v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import HeaderSchool from '@/components/headers/School'
import NewSchool from '@/components/forms/school/New'
import ViewSchool from '@/components/forms/school/View'

export default {
  components: {
    HeaderSchool,
    NewSchool,
    ViewSchool
  },
  data() {
    return {
      loading: false,
      schoolSelected: '',
      schoolLevel: [],
      showForm: false,
      itemSelected: []
    }
  },

  computed: {
    ...mapState('schools', {
      schools: state => state.schools,
      school : state => state.school,
      totalSchools: state => state.totalSchools,
      totalPageSchools: state => state.totalPageSchools
    }),
    ...mapState('profiles', {
      schools : state => state.schools,
      selectedSchool : state => state.selectedSchool
    }),
    ...mapGetters('profiles', ['getSchool'])
  },

  watch: {
    selectedSchool(val){
      this.getItem(val)
    }
  },

  created() {
    this.setMasterData()
    if(this.selectedSchool) this.getItem(this.selectedSchool)
  },

  methods: {
    ...mapActions('app', ['setLookupData']),
    setMasterData(){
      this.$store.dispatch('schoollevel/getActive')
      this.setLookupData('school_status')
      this.setLookupData('school_accreditation')
    },
    getItem(item){
      let data = this.getSchool(item)
      this.$store.commit('schools/ASSIGN_FORM', data)
      this.$store.commit('locations/ASSIGN_FORM', data.location)
    },
    doSave(){
      this.loading = true
      this.$store.dispatch('schools/save').then( () => {
        this.$toastr.s("Data Berhasil disimpan")
        this.getItem(this.selectedSchool)
        this.loading = false
        this.showForm = false
      }).catch((err) => {
        this.$store.commit("global/setErrors", err.response.data.errors)
        this.loading = false
      })
    },
    clearForm(){
      this.$store.commit('schools/CLEAR_FORM')
      this.$store.commit('locations/CLEAR_FORM')
      this.$store.commit("global/clearErrors")
      if(this.selectedSchool) this.getItem(this.selectedSchool)
    },
    cancelForm(){
      this.clearForm()
      this.showForm = false
    },
    doEdit(){
      if(this.selectedSchool) this.getItem(this.selectedSchool)
      this.showForm = true
    }
  }
}
</script>

<style>

</style>