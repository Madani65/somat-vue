<template>
  <div>
    <v-row>
      <v-col cols="12" class="my-3">
        <span class="title px-4">{{ $vuetify.lang.t('$vuetify.student.parents.data') }}</span>
      </v-col>
    </v-row>
    <v-card elevation="1" class="mb-2">
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
          </v-row>
          <v-row>
            <v-col cols="12" class="pa-0">
              <v-data-table
                v-model="itemSelected"
                :headers="headers"
                :items="parents"
                hide-default-footer
                class="header-table-blue"
                :loading="loading"
                :loading-text="$vuetify.lang.t('$vuetify.loadingdata')"
              >
                <template v-slot:[`item.full_name`]="props">
                  {{ props.item.profile.first_name + ' ' + props.item.profile.last_name }}
                </template>
                <template v-slot:[`item.relation`]="props">
                  {{ props.item.profile.relationship }}
                </template>
                <template v-slot:[`item.job`]="props">
                  {{ props.item.profile.job }}
                </template>
                <template v-slot:[`item.address`]="props">
                  {{ props.item.location.address }}
                </template>
                <template v-slot:[`item.mobile_number`]="props">
                  {{ props.item.profile.mobile_number }}
                </template>
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
                      <v-list-item @click="doEdit(props)">
                        <v-list-item-title>
                          <v-icon small>
                            mdi-pencil
                          </v-icon> {{ $vuetify.lang.t('$vuetify.button.update') }}
                        </v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="doDelete(props)">
                        <v-list-item-title>
                          <v-icon small>
                            mdi-delete-forever
                          </v-icon> {{ $vuetify.lang.t('$vuetify.button.delete') }}
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
    <v-dialog
      v-model="dialogForm"
      persistent
      max-width="1000px"
      scrollable
    >
      <v-form>
        <v-card>
          <v-card-title>
            <span class="headline">{{ editingIndex>=0 ? $vuetify.lang.t('$vuetify.button.update') : $vuetify.lang.t('$vuetify.button.add') }} {{ $vuetify.lang.t('$vuetify.student.parents.data') }}</span>
          </v-card-title>
          <v-divider />
          <v-card-text class="pb-0">
            <form-personal />
            <form-location v-model="location" error-key="parent.0.location" :title="$vuetify.lang.t('$vuetify.detail_loc')" />
          </v-card-text>
          <v-divider />
          <v-card-actions class="px-4 pb-3">
            <div class="flex-grow-1" />
            <v-btn
              small
              type="submit"
              :loading="loading"
              @click.prevent="doSave"
              class="text-capitalize primary white--text"
            >
              {{ $vuetify.lang.t('$vuetify.button.add') }}
            </v-btn>
            <v-btn
              small
              :disabled="loading"
              @click="doReset"
              class="text-capitalize red white--text"
            >
              {{ $vuetify.lang.t('$vuetify.button.cancel') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import FormPersonal from '@/components/forms/parents/Personal'
import FormLocation from '@/components/forms/Locations'

export default {
  components: {
    FormPersonal,
    FormLocation
  },

  data() {
    return {
      loading: false,
      dialogForm: false,
      editingIndex: -1,
      options: {},
      itemSelected: [],
      items: [],
      totalItems: 0,
    }
  },

  computed: {
    ...mapState( 'global', ['errors','propsFooterTable', 'propsConfirmDelete']),
    ...mapState( 'parents', ['parents']),
    ...mapGetters( 'global', ['getErrorMessage']),
    headers(){
      return [
        { text: this.$vuetify.lang.t('$vuetify.personal.name'), value: 'full_name', sortable: true },
        { text: this.$vuetify.lang.t('$vuetify.student.parents.relation'), value: 'relation', sortable: true },
        { text: this.$vuetify.lang.t('$vuetify.student.parents.job'), value: 'job', sortable: true },
        { text: this.$vuetify.lang.t('$vuetify.personal.location.address'), value: 'address', sortable: true },
        { text: this.$vuetify.lang.t('$vuetify.personal.mobile'), value: 'mobile_number', sortable: true },
        { text: this.$vuetify.lang.t('$vuetify.control'), value: 'actions', sortable: false },
      ]
    },
    location: {
      get() { return this.$store.state.parents.location },
      set(val) { this.$store.commit('parents/ASSIGN_LOCATION', val)}
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
    get(){},
    addNew(){
      this.dialogForm = true
      this.$store.commit('parents/ASSIGN_LOCATION', this.$store.state.students.location)
    },
    doEdit(props){
      console.log(props)
      this.dialogForm = true
      this.editingIndex = props.index
      this.$store.commit('parents/ASSIGN_FORM', props.item)
    },
    doDelete(props){
      console.log(props)
      this.$swal({
        ...this.propsConfirmDelete,
        title: this.$vuetify.lang.t('$vuetify.confirmsure'),
        text: this.$vuetify.lang.t('$vuetify.confirmdelete'),
        confirmButtonText: this.$vuetify.lang.t('$vuetify.button.yes'),
        cancelButtonText: this.$vuetify.lang.t('$vuetify.button.no')
      }).then((result) => {
        if (result.value) {
          if(props.item.profile.relation_id){
            this.loading = true
            this.$store.dispatch('parents/delete', props).then( (resp) => {
              if( 'message' in resp ) this.$toastr.s(resp.message)
            }).finally( () => {
              this.loading = false
              this.doReset()
            })
          } else {
            this.$store.commit('parents/DELETED_BY_IDX', props.index)
          }
        }
      })
    },
    doSave(){
      this.loading = true
      this.$store.dispatch('parents/validation').then( () => {
        if(this.editingIndex >= 0)
          this.$store.commit('parents/UPDATE_DATA', this.editingIndex)
        else
          this.$store.commit('parents/PUSH_DATA')
        this.doReset()
      }).catch( (err) => {
        if(err.response.status == 422) 
          this.$store.commit("global/setErrors", err.response.data.errors)
      }).finally( () => {
        this.loading = false
      })
    },
    doReset(){
      this.$store.commit('parents/CLEAR_FORM')
      this.$store.commit("global/clearErrors")
      this.dialogForm = false
      this.editingIndex = -1
    }
  }
}
</script>

<style>

</style>