<template>
  <div>
    <header-school :title="$vuetify.lang.t('$vuetify.class.mapping.title')" show-academic-year />
    <v-card elevation="1" class="mb-2">
      <v-card-text>
        <v-row class="pt-0 pb-3">
          <v-col cols="12" md="6" class="pt-0">
            <api-select
              dispatch-name="classes/getActive"
              :label="$vuetify.lang.t('$vuetify.class.title')"
              item-text="class_name"
              item-value="class_id"
              :refresh-icon="false"
            />
          </v-col>
          <v-col cols="12" md="6" class="pt-0">
            <api-select
              dispatch-name="employees/getTeacher"
              :label="$vuetify.lang.t('$vuetify.class.teacher')"
              item-text="employee_full_name"
              item-value="employee_id"
              :refresh-icon="false"
            />
          </v-col>
          <v-col cols="12" md="6" class="pt-0">
            <v-select 
              :label="$vuetify.lang.t('$vuetify.setup.time.activity')"
              :items="[]"
              hide-details="auto"
            />
          </v-col>
          <v-col cols="12" md="6" class="pt-0">
            <v-text-field
              :label="$vuetify.lang.t('$vuetify.class.capacity')"
              hide-details="auto"
              type="number"
            />
          </v-col>
          <v-col cols="12" md="6" class="pt-0">
            <span class="font-weight-bold">{{ $vuetify.lang.t('$vuetify.class.total') }}: {{ totalStudentClass }}</span>
          </v-col>
        </v-row>
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
                :headers="headers(false)"
                :items="studentClass"
                hide-default-footer
                disable-pagination
                class="header-table-blue mb-2"
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
            <span class="headline">{{ $vuetify.lang.t('$vuetify.button.add') }} {{ $vuetify.lang.t('$vuetify.student.title') }}</span>
          </v-card-title>
          <v-card-text class="pb-0">
            <v-data-table
              item-key="uuid"
              :headers="headers(true)"
              :items="studentList"
              :options.sync="options"
              :server-items-length="totalStudents"
              :footer-props="propsFooterTable"
              class="header-table-blue"
              :loading="loading"
              :loading-text="$vuetify.lang.t('$vuetify.loadingdata')"
            >
              <template v-slot:[`item.actions`]="props">
                <v-simple-checkbox
                  v-model="props.item.selected"
                  :ripple="false"
                />
              </template>
            </v-data-table>
          </v-card-text>
          <v-card-actions class="px-4 pb-3">
            <div class="flex-grow-1" />
            <v-btn
              small
              type="submit"
              :loading="loading"
              @click.prevent="doAdd"
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
import HeaderSchool from '@/components/headers/School'
import ApiSelect from '@/components/forms/APISelect'

export default {
  components: {
    HeaderSchool,
    ApiSelect
  },

  data() {
    return {
      loading: false,
      dialogForm: false,
      options: {},
      itemSelected: [],
      items: [],
      totalItems: 0,
    }
  },

  computed: {
    ...mapState( 'global', ['errors','propsFooterTable', 'propsConfirmDelete']),
    ...mapState( 'students', ['students','totalStudents']),
    ...mapState( 'classmap', ['studentClass','totalStudentClass']),
    ...mapGetters( 'global', ['getErrorMessage']),
    studentList(){
      return this.students.map( function(row) {
        return {
          ...row,
          selected: false
        }
      })
    },
    shouldBeSave(){
      return this.studentClass.filter( function(item) {
        return item.updated
      }).length
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
    this.$store.commit('classmap/CLEAR_DATA')
  },

  methods: {
    headers(type){
      return [
        { text: this.$vuetify.lang.t('$vuetify.student.nis'), value: 'nis', sortable: true },
        { text: this.$vuetify.lang.t('$vuetify.student.nisn'), value: 'nisn', sortable: true },
        { text: this.$vuetify.lang.t('$vuetify.student.name'), value: 'name', sortable: true },
        { text: this.$vuetify.lang.t('$vuetify.personal.gender'), value: 'gender', sortable: true },
        { text: (type) ? this.$vuetify.lang.t('$vuetify.select') : this.$vuetify.lang.t('$vuetify.control'), value: 'actions', sortable: false },
      ]
    },
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
    },
    doDelete(props){
      console.log(props)
    },
    doSave(){},
    doAdd(){
      let selectedList = this.studentList.filter( function(list){
        return list.selected == true
      })
      this.$store.commit('classmap/PUSH_DATA', selectedList)
      this.doReset()
    },
    doReset(){
      this.$store.commit("global/clearErrors")
      this.dialogForm = false
      this.studentList.some( function(data) {
        data.selected = false
      })
    }
  }
}
</script>

<style>

</style>