<template>
  <div>
    <header-school :title="$vuetify.lang.t('$vuetify.academic.period.title')" />
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
              </v-icon>{{ $vuetify.lang.t('$vuetify.button.add') + ' ' + $vuetify.lang.t('$vuetify.academic.period.year') }}
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
          </v-row>
          <v-row>
            <v-tabs
              v-model="activeTab"
              show-arrows
              centered
              center-active
              fixed-tabs
              height="80"
              class="elevation-2 rounded-lg"
              active-class="light-blue darken-1 white--text rounded-lg"
              slider-color="light-blue lighten-3"
            >
              <v-tab v-for="(list, i) in periodYears" :key="i">
                <span class="text-capitalize subtitle-1 font-weight-medium text">{{ $vuetify.lang.t('$vuetify.academic.period.year') }}<br>{{ list.start_year + '/'+ list.end_year }}</span>
              </v-tab>
            </v-tabs>
          </v-row>
          <v-row>
            <v-col cols="12" class="px-0">
              <v-card
                v-for="(row, j) in periodAcademics"
                :key="j"
                outlined
                class="mt-2"
              >
                <v-card-text>
                  <v-row>
                    <v-col cols="12" md="4" class="pt-1">
                      <v-text-field
                        v-model="row.period_name"
                        :label="$vuetify.lang.t('$vuetify.academic.period.name')"
                        hide-details="auto"
                        :prefix="(j+1) + '.'"
                        :error-messages="getErrorMessage(`academicperiod.${j}.period_name`)"
                        @change="row.updated = true"
                      />
                    </v-col>
                    <v-col cols="12" md="4" class="pt-1">
                      <v-menu
                        v-model="row.datepicker_start"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="row.effective_start_date"
                            :label="$vuetify.lang.t('$vuetify.start')"
                            prepend-icon="mdi-calendar"
                            readonly
                            hide-details="auto"
                            v-bind="attrs"
                            v-on="on"
                            :error-messages="getErrorMessage(`academicperiod.${j}.effective_start_date`)"
                          />
                        </template>
                        <v-date-picker
                          v-model="row.effective_start_date"
                          :max="row.effective_end_date"
                          @input="row.datepicker_start = false"
                          @change="row.updated = true"
                          no-title
                        />
                      </v-menu>
                    </v-col>
                    <v-col cols="12" md="4" class="pt-1">
                      <v-menu
                        v-model="row.datepicker_end"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="row.effective_end_date"
                            :label="$vuetify.lang.t('$vuetify.until')"
                            prepend-icon="mdi-calendar"
                            readonly
                            hide-details="auto"
                            v-bind="attrs"
                            v-on="on"
                            @change="row.updated = true"
                            :error-messages="getErrorMessage(`academicperiod.${j}.effective_end_date`)"
                          />
                        </template>
                        <v-date-picker
                          v-model="row.effective_end_date"
                          :min="row.effective_start_date"
                          @input="row.datepicker_end = false"
                          @change="row.updated = true"
                          no-title
                        />
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
              <v-btn
                :loading="loading"
                small
                elevation="0"
                @click="addNewPeriod"
                class="text-capitalize mt-2"
              >
                {{ $vuetify.lang.t('$vuetify.add_new_line') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
    <v-dialog v-model="dialogForm" persistent max-width="600px">
      <v-form>
        <v-card>
          <v-card-title>
            <span class="headline">{{ $vuetify.lang.t('$vuetify.button.add') + ' ' + $vuetify.lang.t('$vuetify.academic.period.year') }}</span>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" class="pb-0">
                <span>{{ $vuetify.lang.t('$vuetify.academic.period.year') }} :</span>
              </v-col>
              <v-col cols="12" md="6" class="pt-0">
                <v-text-field
                  v-model="periodYear.start_year"
                  :label="$vuetify.lang.t('$vuetify.start')"
                  hide-details="auto"
                  type="number"
                  :error-messages="errors['academicyear.start_year']"
                />
              </v-col>
              <v-col cols="12" md="6" class="pt-0">
                <v-text-field
                  v-model="periodYear.end_year"
                  :label="$vuetify.lang.t('$vuetify.until')"
                  hide-details="auto"
                  type="number"
                  :error-messages="errors['academicyear.end_year']"
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1" />
            <v-btn
              small
              type="submit"
              :loading="loading"
              @click.prevent="doSaveYear"
              class="text-capitalize primary white--text"
            >
              {{ $vuetify.lang.t('$vuetify.button.save') }}
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

export default {
  components: {
    HeaderSchool
  },

  data() {
    return {
      loading: false,
      dialogForm: false,
      activeTab: null,
      datepicker1: false,
      datepicker2: false
    }
  },

  computed: {
    ...mapState( 'global', ['errors','propsFooterTable', 'propsConfirmDelete']),
    ...mapState( 'periodacademic', ['periodYears', 'periodYear', 'periodAcademics']),
    ...mapGetters( 'global', ['getErrorMessage']),
    shouldBeSave(){
      return this.periodAcademics.filter( function(item) {
        return item.updated
      }).length
    }
  },

  watch: {
    periodYear: {
      deep: true,
      handler(val) {
        if(val.start_year)
          this.periodYear.end_year = Number(val.start_year) + 1
      }
    },
    activeTab: {
      handler(val) {
        this.$store.commit("global/clearErrors")
        if(val >= 0)
          this.$store.commit('periodacademic/ASSIGN_CHILD_DATA', this.periodYears[val])
      }
    }
  },

  created() {
    this.get()
  },

  methods: {
    get(){
      this.loading = true
      this.$store.dispatch('periodacademic/get').then( (resp) => {
        this.activeTab = resp.data.data.length -1
      }).finally(() => {
        this.loading = false
      })
    },
    addNew(){
      console.log('add new data.')
      this.dialogForm = true
    },
    async doSaveYear(){
      let periodYear = this.periodYear
      let activeTab = null
      if( periodYear.start_year && periodYear.end_year) {
        await this.periodYears.some( function(list, idx) {
          if( list.start_year == periodYear.start_year && list.end_year == periodYear.end_year ) {
            console.log('Tahun ajaran sudah ada.')
            activeTab = idx
            return true
          }
        })
        if(activeTab)
          this.activeTab = activeTab
        else {
          await this.$store.commit('periodacademic/PUSH_DATA', this.periodYear)
          this.activeTab = this.periodYears.length - 1
        }
        this.doReset()
      }
    },
    addNewPeriod(){
      console.log('add new period.')
      this.$store.commit('periodacademic/ADD_NEW_CHILD')
    },
    doEdit(data){
      console.log('edit data.')
      console.log(data)
    },
    doDelete(data){
      console.log('delete data.')
      console.log(data)
    },
    doSave(){
      console.log('save data.')
      this.loading = true
      this.$store.dispatch('periodacademic/save', this.activeTab).then( () => {
        this.$toastr.s("Data Berhasil disimpan")
        this.get()
      }).catch((err) => {
        if(err.response.state == 422)
          this.$store.commit("global/setErrors", err.response.data.errors)
      }).finally(() => {
        this.loading = false
      })
    },
    doReset(){
      this.$store.commit('periodacademic/CLEAR_FORM')
      this.$store.commit("global/clearErrors")
      this.dialogForm = false
    }
  }
}
</script>

<style>

</style>