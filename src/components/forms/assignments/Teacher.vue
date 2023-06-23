<template>
  <v-container class="px-0 py-2">
    <v-row>
      <v-col cols="12" class="pt-0">
        <v-card>
          <v-card-text class="pb-6">
            <v-row>
              <v-col cols="12" class="pt-0">
                <v-row>
                  <v-col cols="12" md="6">
                    <api-select 
                      v-model="teacherAssignment.teacher_id"
                      dispatch-name="employees/getTeacher"
                      :label="$vuetify.lang.t('$vuetify.assignment.teacher.name')"
                      item-text="employee_full_name"
                      item-value="employee_id"
                      :error-messages="errors['teacherassignment.teacher_id']"
                    />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card class="mt-3">
          <v-card-title class="pb-1 subtitle-1 font-weight-medium">
            {{ $vuetify.lang.t('$vuetify.assignment.teacher.sk_agreement') }}
          </v-card-title>
          <v-card-text class="pb-6">
            <v-divider class="mb-4" />
            <v-row>
              <v-col cols="12" class="pt-0">
                <v-text-field
                  v-model="teacherAssignment.decree_number"
                  :label="$vuetify.lang.t('$vuetify.assignment.teacher.decree_number')"
                  hide-details="auto"
                  :error-messages="errors['teacherassignment.decree_number']"
                />
              </v-col>
              <v-col cols="12" class="pb-0">
                <span>Masa Berlaku SK:</span>
              </v-col>
              <v-col cols="12" md="6" class="pt-0">
                <v-menu
                  v-model="datepicker1"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="teacherAssignment.effective_start_date"
                      :label="$vuetify.lang.t('$vuetify.start')"
                      prepend-icon="mdi-calendar-range"
                      readonly
                      clearable
                      hide-details="auto"
                      v-bind="attrs"
                      v-on="on"
                      :error-messages="errors['teacherassignment.effective_start_date']"
                    />
                  </template>
                  <v-date-picker
                    v-model="teacherAssignment.effective_start_date"
                    :max="teacherAssignment.effective_end_date"
                    @input="datepicker1 = false"
                    no-title
                  />
                </v-menu>
              </v-col>
              <v-col cols="12" md="6" class="pt-0">
                <v-menu
                  v-model="datepicker2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="teacherAssignment.effective_end_date"
                      :label="$vuetify.lang.t('$vuetify.until')"
                      prepend-icon="mdi-calendar-range"
                      readonly
                      clearable
                      hide-details="auto"
                      v-bind="attrs"
                      v-on="on"
                      :error-messages="errors['teacherassignment.effective_end_date']"
                    />
                  </template>
                  <v-date-picker
                    v-model="teacherAssignment.effective_end_date"
                    :min="teacherAssignment.effective_start_date"
                    @input="datepicker2 = false"
                    no-title
                  />
                </v-menu>
              </v-col>
              <v-col cols="12" class="pt-0">
                <v-file-input
                  show-size
                  :label="$vuetify.lang.t('$vuetify.assignment.teacher.upload_sk')"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card class="mt-3">
          <v-card-title class="pb-1 subtitle-1 font-weight-medium">
            {{ $vuetify.lang.t('$vuetify.assignment.title') }}
          </v-card-title>
          <v-card-text>
            <v-divider class="mb-4" />
            <v-row v-for="(list, i) in teacherAssigmentClass" :key="i">
              <v-col cols="12" md="6" class="pt-0">
                <api-select 
                  v-model="list.lesson_id"
                  dispatch-name="lessons/getActive"
                  :label="$vuetify.lang.t('$vuetify.lesson.title')"
                  item-text="lesson_name"
                  item-value="lesson_id"
                  :prefix="(i+1) + '.'"
                  :error-messages="getErrorMessage(`teacherassignmentclass.${i}.lesson_id`)"
                />
              </v-col>
              <v-col cols="12" md="6" class="pt-0">
                <api-select 
                  v-model="list.class_id"
                  dispatch-name="classes/getActive"
                  :label="$vuetify.lang.t('$vuetify.class.title')"
                  item-text="class_name"
                  item-value="class_id"
                  multiple
                  chips
                  :error-messages="getErrorMessage(`teacherassignmentclass.${i}.lesson_id`)"
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn
              :loading="loading"
              small
              elevation="0"
              @click="addChild"
              class="text-capitalize"
            >
              {{ $vuetify.lang.t('$vuetify.add_new_line') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ApiSelect from '@/components/forms/APISelect'

export default {
  components: {
    ApiSelect
  },
  data() {
    return {
      datepicker: false,
      loading: false,
      datepicker1: false,
      datepicker2: false,
    }
  },
  computed: {
    ...mapState("global", ["errors"]),
    ...mapState('userprofiles', ['profiles','profile']),
    ...mapState('lessons', ['lesson', 'childLessons']),
    ...mapState( 'lessoncategory', ['lessonCategories']),
    ...mapState( 'teacherassignment', ['teacherAssignment', 'teacherAssigmentClass']),
    ...mapGetters( 'global', ['getErrorMessage']),
    statusList(){
      return [
        { text: this.$vuetify.lang.t('$vuetify.active'), value: 'Y' },
        { text: this.$vuetify.lang.t('$vuetify.inactive'), value: 'N' }
      ]
    }
  },
  created() {},
  methods: {
    addChild(){
      console.log('test add')
      this.$store.commit('teacherassignment/ADD_NEW_CHILD')
    }
  }
}
</script>

<style>

</style>