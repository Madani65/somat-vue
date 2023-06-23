<template>
  <div>
    <header-school :title="$vuetify.lang.t('$vuetify.class.list')" />
    <v-card
      elevation="1"
      class="mb-2"
    >
      <v-card-text>
        <v-container>
          <v-row class="pb-3">
            <v-btn
              small
              :disabled="loading"
              class="text-capitalize primary white--text"
              @click="addnew()"
            >
              <v-icon size="18" class="mr-1">
                mdi-pencil-plus
              </v-icon>{{ $vuetify.lang.t('$vuetify.button.add') }}
            </v-btn>
            <v-btn
              small
              :loading="loading"
              class="text-capitalize orange white--text ml-2"
              @click="doSave()"
              v-if="shouldBeSave"
            >
              <v-icon size="18" class="mr-1">
                mdi-content-save
              </v-icon>{{ $vuetify.lang.t('$vuetify.button.save') }}
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
                :items="classes"
                :options.sync="options"
                :server-items-length="totalClasses"
                :footer-props="propsFooterTable"
                class="header-table-blue"
                :loading="loading"
                :loading-text="$vuetify.lang.t('$vuetify.loadingdata')"
              >
                <template v-slot:[`item.active_flag`]="props">
                  <span>{{ props.item.active_flag=='Y'?$vuetify.lang.t('$vuetify.active'):$vuetify.lang.t('$vuetify.inactive') }}</span>
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
                      <v-list-item v-if="!props.item.updated" @click="doDelete(props)">
                        <v-list-item-title>
                          <v-icon small>
                            mdi-delete-forever
                          </v-icon> {{ $vuetify.lang.t('$vuetify.button.delete') }}
                        </v-list-item-title>
                      </v-list-item>
                      <v-list-item v-else @click="doCancel( props )">
                        <v-list-item-title>
                          <v-icon small>
                            mdi-close-circle
                          </v-icon> {{ $vuetify.lang.t('$vuetify.button.cancel') }}
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-container>
        <v-dialog v-model="dialogForm" persistent max-width="800px">
          <v-form>
            <v-card>
              <v-card-title>
                <span class="headline">{{ classRoom.class_id ? $vuetify.lang.t('$vuetify.button.update') : $vuetify.lang.t('$vuetify.button.add') }}</span>
              </v-card-title>
              <v-card-text>
                <classes-form />
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1" />
                <v-btn
                  small
                  dark
                  type="submit"
                  :loading="loading"
                  @click.prevent="dialogForm = false"
                  class="text-capitalize green darken-1"
                >
                  <v-icon size="18" class="mr-1">
                    mdi-playlist-plus
                  </v-icon>{{ classRoom.class_id ? $vuetify.lang.t('$vuetify.button.update') : $vuetify.lang.t('$vuetify.button.add') }}
                </v-btn>
                <v-btn
                  small
                  dark
                  :loading="loading"
                  @click="doCancel({item:classRoom, index:editingIndex})"
                  class="text-capitalize red darken-1"
                >
                  <v-icon size="18" class="mr-1">
                    mdi-close-circle-outline
                  </v-icon>{{ $vuetify.lang.t('$vuetify.button.cancel') }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
      </v-card-text> 
    </v-card>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import HeaderSchool from '@/components/headers/School'
import ClassesForm from '@/components/forms/school/Classes'

export default {
  components: {
    HeaderSchool,
    ClassesForm
  },
  data() {
    return {
      loading: false,
      dialogForm: false,
      restoreFlag: false,
      itemSelected: [],
      options: {},
      editingIndex: -1
    }
  },

  computed: {
    ...mapState( 'global', ['propsFooterTable', 'propsConfirmDelete']),
    ...mapState( 'classes', ['classes', 'classRoom', 'totalClasses', 'totalPageClasses', 'beforeSaveClasses']),
    ...mapGetters( 'global', ['getErrorMessage']),
    headers(){
      return [
        { text: this.$vuetify.lang.t('$vuetify.class.name'), value: 'class_name', sortable: true },
        { text: this.$vuetify.lang.t('$vuetify.class.level'), value: 'class_level', sortable: true },
        { text: this.$vuetify.lang.t('$vuetify.class.major.title'), value: 'major_name', sortable: true },
        { text: this.$vuetify.lang.t('$vuetify.class.code'), value: 'class_code', sortable: true },
        { text: this.$vuetify.lang.t('$vuetify.status'), value: 'active_flag', sortable: true },
        { text: this.$vuetify.lang.t('$vuetify.control'), value: 'actions', sortable: false },
      ]
    },
    shouldBeSave(){
      return this.classes.filter( function(item) {
        return item.updated
      }).length
    }
  },

  watch: {
    'options' : {
      handler() {
        this.get()
      }
    }
  },

  created() {
    this.setMasterData()
  },

  methods: {
    setMasterData(){
      this.$store.dispatch('majors/getActive')
    },
    get(){
      this.loading = true
      this.$store.dispatch('classes/get', { 'options' : this.options }).then( () => {
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    doSave(){
      this.loading = true
      this.$store.dispatch('classes/save').then( () => {
        this.$toastr.s("Data Berhasil disimpan")
        this.loading = false
      }).catch((err) => {
        this.loading = false
        this.$store.commit("global/setErrors", err.response.data.errors)
      })
    },
    addnew(){
      this.$store.commit('classes/PUSH_BLANK_DATA')
      let idx = this.classes.length-1
      let data = {
        index : idx,
        item : this.classes[idx]
      }
      this.doEdit(data)
    },
    doEdit(data){
      this.editingIndex = data.index
      this.$store.commit('classes/ASSIGN_FORM', data.item)
      this.classRoom.updated = true
      this.dialogForm = true
    },
    doDelete(data){
      this.$swal({
        ...this.propsConfirmDelete,
        title: this.$vuetify.lang.t('$vuetify.confirmsure'),
        text: this.$vuetify.lang.t('$vuetify.confirmdelete'),
        confirmButtonText: this.$vuetify.lang.t('$vuetify.button.yes'),
        cancelButtonText: this.$vuetify.lang.t('$vuetify.button.no')
      }).then((result) => {
        if (result.value) {
          this.loading = true
          this.$store.dispatch('classes/delete', data.item).then( (resp) => {
            this.loading = false
            if( 'message' in resp ) this.$toastr.s(resp.message)
          }).catch(() => {
            this.loading = false
          })
          this.$store.commit("global/clearErrors")
        }
      })
    },
    doCancel(data){
      this.$store.commit("global/clearErrors")
      if(data.item.class_id) {
        let obj = this.beforeSaveClasses[data.index]
        Object.keys(data.item).forEach(function(key) { data.item[key] = obj[key] })
      }
      else
        this.$store.commit('classes/DELETED_BY_IDX', data.index)
      this.dialogForm = false
    }
  }
}
</script>

<style>

</style>