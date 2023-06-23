<template>
  <div>
    <header-school :title="$vuetify.lang.t('$vuetify.student.title')" />
    <v-card v-if="!dialogForm" elevation="1" class="mb-2">
      <v-card-text>
        <v-container>
          <v-row class="pb-3">
            <v-btn
              small
              :disabled="loading"
              class="text-capitalize primary white--text"
              @click="addNew"
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
            <v-col cols="12" class="pa-0">
              <v-data-table
                v-model="itemSelected"
                show-select
                item-key="uuid"
                :headers="headers"
                :items="students"
                :options.sync="options"
                :server-items-length="totalStudents"
                :footer-props="propsFooterTable"
                class="header-table-blue"
                :loading="loading"
                :loading-text="$vuetify.lang.t('$vuetify.loadingdata')"
              >
                <template v-slot:[`item.actions`]="props">
                  <v-menu
                    
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
                      <v-list-item @click="doView(props)">
                        <v-list-item-title>
                          <v-icon small>
                            mdi-text-box-search
                          </v-icon> {{ $vuetify.lang.t('$vuetify.button.view') }}
                        </v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="doEdit(props)">
                        <v-list-item-title>
                          <v-icon small>
                            mdi-pencil
                          </v-icon> {{ $vuetify.lang.t('$vuetify.button.update') }}
                        </v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="doPrint(props)">
                        <v-list-item-title>
                          <v-icon small>
                            mdi-printer
                          </v-icon> {{ $vuetify.lang.t('$vuetify.button.print') }}
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
    <v-card
      v-if="dialogForm"
      elevation="1"
      class="mb-2"
    >
      <v-card-text>
        <form-personal />
        <form-location v-model="location" :title="$vuetify.lang.t('$vuetify.detail_loc')" />
        <data-parents />
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
            </v-icon>{{ $vuetify.lang.t('$vuetify.button.save') }}
          </v-btn>
          <v-btn
            small
            :disabled="loading"
            class="text-capitalize red white--text"
            @click="doReset()"
          >
            <v-icon size="18" class="mr-1">
              mdi-close
            </v-icon>{{ $vuetify.lang.t('$vuetify.button.cancel') }}
          </v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
    <v-dialog
      v-model="dialogView"
      persistent
      max-width="900px"
      scrollable
    >
      <v-card>
        <v-card-title class="py-2">
          <span class="headline">{{ $vuetify.lang.t('$vuetify.student.title') }}</span>
          <v-spacer />
          <v-btn
            small
            icon
            :disabled="loading"
            @click="doPrint"
          >
            <v-icon>
              mdi-printer
            </v-icon>
          </v-btn>
          <v-btn
            small
            icon
            :disabled="loading"
            @click="doEdit(rowProps)"
            class="mx-3"
          >
            <v-icon>
              mdi-pencil
            </v-icon>
          </v-btn>
          <v-btn
            small
            icon
            :disabled="loading"
            @click="dialogView = false"
          >
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
        </v-card-title>
        <v-divider />
        <v-card-text class="pt-4">
          <v-row>
            <v-col cols="12" md="8">
              <v-simple-table dense>
                <template v-slot:default>
                  <tbody>
                    <tr
                      v-for="(item, j) in details.left"
                      :key="j"
                    >
                      <td><v-row>{{ item.title }}<v-spacer />:</v-row></td>
                      <td class="pl-1">
                        <span class="font-weight-medium">{{ item.value }}</span>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
            <v-col cols="12" md="4">
              <photo class-icon="my-10" />
              <v-simple-table dense class="mt-3">
                <template v-slot:default>
                  <tbody>
                    <tr
                      v-for="(item, k) in details.right"
                      :key="k"
                    >
                      <td><v-row>{{ item.title }}<v-spacer />:</v-row></td>
                      <td class="pl-1">
                        <span class="font-weight-medium">{{ item.value }}</span>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import HeaderSchool from '@/components/headers/School'
import FormPersonal from '@/components/forms/student/Personal'
import FormLocation from '@/components/forms/Locations'
import Photo from '@/components/forms/Photo'
import DataParents from '@/views/pages/registration/parent/Index.vue'

export default {
  components: {
    HeaderSchool,
    FormPersonal,
    FormLocation,
    Photo,
    DataParents
  },

  data() {
    return {
      loading: false,
      dialogForm: false,
      dialogView: false,
      options: {},
      itemSelected: [],
      rowProps: '',
      totalItems: 0,
    }
  },

  computed: {
    ...mapState( 'global', ['errors','propsFooterTable', 'propsConfirmDelete']),
    ...mapState( 'students', ['students','totalStudents']),
    ...mapGetters( 'global', ['getErrorMessage']),
    headers(){
      return [
        { text: this.$vuetify.lang.t('$vuetify.student.name'), value: 'name', sortable: true },
        { text: this.$vuetify.lang.t('$vuetify.student.nis'), value: 'nis', sortable: true },
        { text: this.$vuetify.lang.t('$vuetify.student.nisn'), value: 'nisn', sortable: true },
        { text: this.$vuetify.lang.t('$vuetify.personal.dateofbirth'), value: 'dateofbirth', sortable: true },
        { text: this.$vuetify.lang.t('$vuetify.personal.gender'), value: 'gender', sortable: true },
        { text: this.$vuetify.lang.t('$vuetify.status'), value: 'status', sortable: true },
        { text: this.$vuetify.lang.t('$vuetify.control'), value: 'actions', sortable: false },
      ]
    },
    location: {
      get() { return this.$store.state.students.location },
      set(val) { this.$store.commit('students/ASSIGN_LOCATION', val)}
    },
    details(){
      return { 
        left : [
          { title: this.$vuetify.lang.t('$vuetify.personal.fullname'), value: this.rowProps.item.name },
          { title: this.$vuetify.lang.t('$vuetify.student.nisn'), value: this.rowProps.item.nisn },
          { title: this.$vuetify.lang.t('$vuetify.student.nis'), value: this.rowProps.item.nis },
          { title: this.$vuetify.lang.t('$vuetify.personal.placeofbirth'), value: this.rowProps.item.profile.place_of_birth },
          { title: this.$vuetify.lang.t('$vuetify.personal.dateofbirth'), value: this.rowProps.item.profile.date_of_birth },
          { title: this.$vuetify.lang.t('$vuetify.personal.gender'), value: this.rowProps.item.profile.gender },
          { title: this.$vuetify.lang.t('$vuetify.personal.religion'), value: this.rowProps.item.profile.religion },
          { title: this.$vuetify.lang.t('$vuetify.personal.citizenship'), value: this.rowProps.item.profile.citizenship },
          { title: this.$vuetify.lang.t('$vuetify.personal.blood_type'), value: this.rowProps.item.profile.blood_type },
          { title: this.$vuetify.lang.t('$vuetify.student.in_period_year'), value: this.rowProps.item.academic_start.start_year },
          { title: this.$vuetify.lang.t('$vuetify.personal.location.address'), value: this.rowProps.item.profile.location.address },
          { title: this.$vuetify.lang.t('$vuetify.personal.phone'), value: this.rowProps.item.profile.phone_no },
          { title: this.$vuetify.lang.t('$vuetify.personal.mobile'), value: this.rowProps.item.profile.mobile_number },
          { title: this.$vuetify.lang.t('$vuetify.personal.email'), value: this.rowProps.item.profile.email },
        ],
        right: [
          { title: this.$vuetify.lang.t('$vuetify.class.title'), value: '' },
          { title: this.$vuetify.lang.t('$vuetify.status'), value: '' },
        ]
      }
    }
  },

  watch: {
    options: {
      handler(){
        this.get()
      }
    }
  },

  created(){

  },

  methods: {
    get(){
      this.loading = true
      this.$store.dispatch('students/get', { 'options' : this.options }).finally(() => {
        this.loading = false
      })
    },
    addNew(){
      this.dialogForm = true
    },
    doEdit(props){
      console.log(props)
      this.dialogForm = true
      this.dialogView = false
      this.$store.commit('students/ASSIGN_FORM', props.item)
      this.$store.commit('parents/ASSIGN_DATA', props.item.profile.family)
    },
    doView(props){
      console.log(props)
      this.dialogView = true
      this.rowProps = props
    },
    doPrint(props){
      console.log(props)
    },
    doSave(){
      this.loading = true
      this.$store.dispatch('students/save').then( () => {
        this.$toastr.s('Data Berhasil disimpan')
        this.doReset()
        this.get()
      }).catch( (err) => {
        if(err.response.status  == 422)
          this.$store.commit("global/setErrors", err.response.data.errors)
      }).finally( () => {
        this.loading = false
      })
    },
    doReset(){
      this.dialogForm = false
      this.$store.commit("global/clearErrors")
      this.$store.commit("students/CLEAR_FORM")
      this.$store.commit("parents/CLEAR_DATA")
    }
  }
}
</script>

<style>

</style>