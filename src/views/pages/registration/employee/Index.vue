<template>
  <div>
    <header-school :title="$vuetify.lang.t('$vuetify.employee.title')" />
    <v-card
      v-if="formShow"
      elevation="1"
      class="mb-2"
    >
      <v-card-text>
        <form-personal />
        <form-employee />
        <form-location :title="$vuetify.lang.t('$vuetify.detail_loc')" />
        <v-card-actions class="mt-5">
          <v-spacer />
          <v-btn
            small
            :loading="loading"
            class="text-capitalize primary white--text"
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
            @click="clearForm()"
          >
            <v-icon size="18" class="mr-1">
              mdi-close
            </v-icon>Batal
          </v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
    <v-card
      v-if="!formShow"
      elevation="1"
    >
      <v-card-text>
        <v-row class="pa-3">
          <v-btn
            small
            :disabled="loading"
            class="text-capitalize primary white--text"
            @click="addNew()"
          >
            <v-icon size="18" class="mr-1">
              mdi-pencil-plus
            </v-icon>{{ $vuetify.lang.t('$vuetify.button.add') }}
          </v-btn>
          <v-spacer />
          <v-menu offset-y transition="scroll-y-transition">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                small
                :disabled="loading"
                class="text-capitalize blue white--text ml-2"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon size="18" class="mr-1">
                  mdi-format-list-checks
                </v-icon>{{ $vuetify.lang.t('$vuetify.button.bulkaction') }}
              </v-btn>
            </template>
            <v-list dense>
              <v-list-item link>
                <v-icon class="mr-2">
                  mdi-delete-forever
                </v-icon>
                <v-list-item-title>{{ $vuetify.lang.t('$vuetify.bulkaction.delete') }}</v-list-item-title>
              </v-list-item>
              <v-list-item link>
                <v-icon class="mr-2">
                  mdi-file-export
                </v-icon>
                <v-list-item-title>{{ $vuetify.lang.t('$vuetify.bulkaction.export') }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-row>
        <v-row>
          <v-col cpls="12" class="pt-0">
            <v-data-table
              v-model="itemSelected"
              show-select
              item-key="key"
              :headers="headers"
              :items="employees"
              :options.sync="options"
              :server-items-length="totalEmployees"
              :footer-props="propsFooterTable"
              class="header-table-blue"
              :loading="loading"
              :loading-text="$vuetify.lang.t('$vuetify.loadingdata')"
            >
              <template v-slot:[`item.full_name`]="{ item }">
                {{ item.profiles.first_name+' '+item.profiles.last_name }}
              </template>
              <template v-slot:[`item.date_of_birth`]="{ item }">
                {{ new Date(item.profiles.date_of_birth) | dateFormat('DD-MMM-YYYY') }}
              </template>
              <template v-slot:[`item.actions`]="props">
                <v-menu
                  v-if="!props.item.updated"
                  bottom
                  left
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list dense class="py-0">
                    <v-list-item @click="doEdit(props)">
                      <v-list-item-title>
                        <v-icon small>
                          mdi-pencil
                        </v-icon> Ubah
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="doPrint(props)">
                      <v-list-item-title>
                        <v-icon small>
                          mdi-printer
                        </v-icon> Print
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
                <v-btn
                  v-if="props.item.updated"
                  small
                  class="text-capitalize red white--text"
                  @click="doCancel(props)"
                  :disabled="loading"
                >
                  <v-icon size="18" class="mr-1">
                    mdi-close-circle
                  </v-icon>{{ $vuetify.lang.t('$vuetify.button.cancel') }}
                </v-btn>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import HeaderSchool from '@/components/headers/School'
import FormPersonal from '@/components/forms/employee/Personal'
import FormEmployee from '@/components/forms/employee/Form'
import FormLocation from '@/components/forms/Location'

export default {
  components: {
    HeaderSchool,
    FormPersonal,
    FormLocation,
    FormEmployee
  },
  data() {
    return {
      loading: false,
      formDialog: false,
      formShow: false,
      itemSelected: [],
      options: {},
    }
  },

  computed: {
    ...mapState( 'global', ['propsFooterTable', 'propsConfirmDelete']),
    ...mapState( 'employees', ['employees', 'employee', 'totalEmployees', 'totalPageEmployees']),
    ...mapGetters( 'global', ['getErrorMessage']),
    headers(){
      return [
        { text: this.$vuetify.lang.t('$vuetify.employee.full_name'), value: 'full_name', sortable: true },
        { text: this.$vuetify.lang.t('$vuetify.employee.nip'), value: 'nip', sortable: true },
        { text: this.$vuetify.lang.t('$vuetify.personal.dateofbirth'), value: 'date_of_birth', sortable: true },
        { text: this.$vuetify.lang.t('$vuetify.personal.empstatus'), value: 'status', sortable: true },
        { text: this.$vuetify.lang.t('$vuetify.personal.position'), value: 'position', sortable: true },
        { text: this.$vuetify.lang.t('$vuetify.status'), value: 'active_flag', sortable: true },
        { text: this.$vuetify.lang.t('$vuetify.control'), value: 'actions', width: '120', sortable: false },
      ]
    },
  },

  watch: {
    'options' : {
      handler() {
        this.get()
      }
    }
  },

  methods: {
    get(){
      this.loading = true
      this.$store.commit('employees/CLEAR_DATA')
      this.$store.dispatch('employees/get', { 'options' : this.options }).then( () => {
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    addNew(){
      this.formShow = true
    },
    doEdit(props){
      this.formShow = true
      console.log(props)
      this.$store.commit('employees/ASSIGN_FORM', props.item)
      this.$store.commit('employees/ASSIGN_FORM_PROFILE', props.item.profiles)
      this.$store.commit('locations/ASSIGN_FORM', props.item.profiles.location)
    },
    doPrint(props){
      console.log(props)
    },
    clearForm(){
      this.formShow = false
      this.$store.commit('employees/CLEAR_FORM')
      this.$store.commit('locations/CLEAR_FORM')
      this.$store.commit('classifications/SET_SELECTED_BLANK')
      this.$store.commit("global/clearErrors")
    },
    doSave(){
      this.loading = true
      this.$store.dispatch('employees/save').then( () => {
        this.clearForm()
        this.$toastr.s("Data Berhasil disimpan")
        // this.get()
      }).catch( (err) => {
        if(err.response.status == 422) 
          this.$store.commit("global/setErrors", err.response.data)
      }).finally( () => {
        this.loading = false
      })
    }
  }
}
</script>

<style>

</style>