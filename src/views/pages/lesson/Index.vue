<template>
  <div>
    <header-school :title="$vuetify.lang.t('$vuetify.lesson.list')" />
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
                :items="lessons"
                :options.sync="options"
                :server-items-length="totalLessons"
                :footer-props="propsFooterTable"
                class="header-table-blue"
                :loading="loading"
                :loading-text="$vuetify.lang.t('$vuetify.loadingdata')"
              >
                <template v-slot:[`item.lesson_category`]="props">
                  <span>{{ props.item.lesson_category_id }}</span>
                </template>
                <template v-slot:[`item.lesson_group`]="props">
                  <span>{{ props.item.lesson_group ? props.item.lesson_group.name : null }}</span>
                </template>
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
    <v-dialog v-model="dialogForm" persistent max-width="800px">
      <v-form>
        <v-card>
          <v-card-title>
            <span class="headline">{{ editingIndex>=0 ? $vuetify.lang.t('$vuetify.button.update') : $vuetify.lang.t('$vuetify.button.add') }} {{ $vuetify.lang.t('$vuetify.lesson.title') }}</span>
          </v-card-title>
          <v-card-text class="pb-0">
            <lesson-form />
          </v-card-text>
          <v-card-actions class="px-4 pb-3">
            <div class="flex-grow-1" />
            <v-btn
              small
              type="submit"
              :loading="loading"
              @click.prevent="doSave"
              class="text-capitalize primary white--text"
            >
              Simpan
            </v-btn>
            <v-btn
              small
              :disabled="loading"
              @click="doCancel"
              class="text-capitalize red white--text"
            >
              Batal
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import HeaderSchool from '@/components/headers/School'
import LessonForm from '@/components/forms/Lesson'

export default {
  components: {
    HeaderSchool,
    LessonForm
  },
  
  data() {
    return {
      loading: false,
      dialogForm: false,
      itemSelected: [],
      options: {},
      editingIndex: -1
    }
  },

  computed: {
    ...mapState( 'global', ['propsFooterTable', 'propsConfirmDelete']),
    ...mapState( 'classes', ['classes', 'classRoom', 'totalClasses', 'totalPageClasses', 'beforeSaveClasses']),
    ...mapState( 'lessons', ['lessons', 'lesson', 'totalLessons', 'totalPageLessons', 'beforeSaveLessons']),
    ...mapGetters( 'global', ['getErrorMessage']),
    headers(){
      return [
        { text: this.$vuetify.lang.t('$vuetify.lesson.category'), value: 'lesson_category', sortable: true },
        { text: this.$vuetify.lang.t('$vuetify.group'), value: 'lesson_group', sortable: true },
        { text: this.$vuetify.lang.t('$vuetify.lesson.name'), value: 'name', sortable: true },
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
  methods: {
    get(){
      this.loading = true
      this.$store.dispatch('lessons/get', { 'options' : this.options }).then( () => {
        this.loading = false
      }).finally(() => {
        this.loading = false
      })
    },
    doSave(){
      this.loading = true
      this.$store.dispatch('lessons/save').then( () => {
        this.$toastr.s("Data Berhasil disimpan")
        this.dialogForm = false
      }).catch((err) => {
        this.$store.commit("global/setErrors", err.response.data.errors)
      }).finally( () => {
        this.loading = false
      })
    },
    addnew(){
      this.$store.commit('lessons/CLEAR_FORM')
      this.dialogForm = true
    },
    doEdit(data){
      this.editingIndex = data.index
      this.$store.commit('lessons/ASSIGN_FORM', data.item)
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
          this.$store.dispatch('lessons/delete', data.item).then( (resp) => {
            this.loading = false
            if( 'message' in resp ) this.$toastr.s(resp.message)
          }).finally( () => {
            this.loading = false
          })
          this.$store.commit("global/clearErrors")
        }
      })
    },
    doCancel(){
      this.$store.commit('lessons/CLEAR_FORM')
      this.$store.commit("global/clearErrors")
      this.editingIndex = -1
      this.dialogForm = false
    }
  }
}
</script>

<style>

</style>