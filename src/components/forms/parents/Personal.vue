<template>
  <v-container class="px-0 py-2">
    <v-row>
      <v-col cols="12">
        <span class="title px-4">{{ $vuetify.lang.t('$vuetify.personal.data') }}</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="8" class="pt-0">
        <v-card>
          <v-card-text class="pb-6">
            <v-row>
              <v-col cols="12" md="6" class="pt-0">
                <api-select
                  v-model="profile.relationship"
                  dispatch-name="lookupcodes/getActive"
                  dispatch-params="family_relation"
                  :label="$vuetify.lang.t('$vuetify.student.parents.relation')"
                  item-text="value"
                  item-value="value"
                  :error-messages="errors['profile.relationship']"
                />
              </v-col>
              <v-col cols="12" md="6" class="pt-0">
                <v-text-field
                  v-model="profile.nik"
                  :label="$vuetify.lang.t('$vuetify.personal.nik')"
                  hide-details="auto"
                  :error-messages="getErrorMessage('parent.0.profile.nik')"
                />
              </v-col>
              <v-col cols="12" md="6" class="pt-0">
                <v-text-field
                  v-model="profile.first_name"
                  :label="$vuetify.lang.t('$vuetify.personal.first_name')"
                  hide-details="auto"
                  :error-messages="errors['profile.first_name']"
                />
              </v-col>
              <v-col cols="12" md="6" class="pt-0">
                <v-text-field
                  v-model="profile.last_name"
                  :label="$vuetify.lang.t('$vuetify.personal.last_name')"
                  hide-details="auto"
                  :error-messages="errors['profile.last_name']"
                />
              </v-col>
              <v-col cols="12" md="6" class="pt-0">
                <v-text-field
                  v-model="profile.place_of_birth"
                  :label="$vuetify.lang.t('$vuetify.personal.placeofbirth')"
                  hide-details="auto"
                  :error-messages="errors['profile.place_of_birth']"
                />
              </v-col>
              <v-col cols="12" md="6" class="pt-0">
                <date-picker v-model="profile.date_of_birth" :label="$vuetify.lang.t('$vuetify.personal.dateofbirth')" />
              </v-col>
              <v-col cols="12" md="6" class="pt-0">
                <v-select
                  v-model="profile.gender"
                  :items="genderList"
                  :label="$vuetify.lang.t('$vuetify.personal.gender')"
                  hide-details="auto"
                  :error-messages="errors['profile.gender']"
                />
              </v-col>
              <v-col cols="12" md="6" class="pt-0">
                <api-select
                  v-model="profile.religion"
                  dispatch-name="lookupcodes/getActive"
                  dispatch-params="religions"
                  :label="$vuetify.lang.t('$vuetify.personal.religion')"
                  item-text="value"
                  item-value="value"
                  :error-messages="errors['profile.religion']"
                />
              </v-col>
              <v-col cols="12" md="6" class="pt-0">
                <v-radio-group
                  class="mt-2"
                  :label="$vuetify.lang.t('$vuetify.personal.citizenship')"
                  v-model="profile.citizenship"
                  hide-details="auto"
                >
                  <v-radio value="WNI" label="WNI" />          
                  <v-radio value="WNA">
                    <template v-slot:label>
                      <div>WNA </div>
                      <v-text-field
                        class="ml-2"
                        style="margin-top:-2px"
                        single-line
                        v-model="profile.country"
                        hide-details="auto"
                        dense
                        :error-messages="errors['profile.place_of_birth']"
                      />
                    </template>
                  </v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12" md="6" class="pt-0 d-flex align-end justify-end">
                <api-select
                  v-model="profile.blood_type"
                  dispatch-name="lookupcodes/getActive"
                  dispatch-params="blood_types"
                  :label="$vuetify.lang.t('$vuetify.personal.blood_type')"
                  item-text="value"
                  item-value="value"
                  :error-messages="errors['profile.blood_type']"
                />
              </v-col>
              <v-col cols="12" md="6" class="pt-0">
                <v-text-field
                  v-model="profile.kk"
                  :label="$vuetify.lang.t('$vuetify.personal.kk')"
                  hide-details="auto"
                  :error-messages="errors['profile.kk']"
                />
              </v-col>
              <v-col cols="12" md="6" class="pt-0">
                <api-select
                  v-model="profile.graduated"
                  dispatch-name="lookupcodes/getActive"
                  dispatch-params="last_graduation"
                  :label="$vuetify.lang.t('$vuetify.personal.last_graduated')"
                  item-text="value"
                  item-value="value"
                  :error-messages="errors['profile.graduated']"
                />
              </v-col>
              <v-col cols="12" md="6" class="pt-0">
                <v-text-field
                  v-model="profile.job"
                  :label="$vuetify.lang.t('$vuetify.personal.job')"
                  hide-details="auto"
                  :error-messages="errors['profile.job']"
                />
              </v-col>
              <v-col cols="12" md="6" class="pt-0">
                <v-select
                  v-model="profile.salary"
                  :items="[]"
                  :label="$vuetify.lang.t('$vuetify.personal.salary')"
                  hide-details="auto"
                  :error-messages="errors['profile.salary']"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4" class="pt-0">
        <v-card>
          <v-card-text class="pb-6">
            <v-row>
              <v-col cols="12">
                <v-card elevation="0" class="pa-3 d-flex align-center justify-center">
                  <v-img
                    v-if="profile.profile_image"
                    aspect-ratio="1"
                    src="https://picsum.photos/id/11/500/300"
                  />
                  <v-icon size="105" class="my-13">
                    mdi-school
                  </v-icon>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card>
          <v-card-text class="mt-4 pb-6">
            <v-row>
              <v-col cols="12" class="pt-0">
                <v-text-field
                  v-model="profile.phone_no"
                  :label="$vuetify.lang.t('$vuetify.personal.phone')"
                  hide-details="auto"
                  :error-messages="errors['profile.phone_no']"
                />
              </v-col>
              <v-col cols="12" class="pt-0">
                <v-text-field
                  v-model="profile.mobile_number"
                  :label="$vuetify.lang.t('$vuetify.personal.mobile')"
                  hide-details="auto"
                  :error-messages="errors['profile.mobile_number']"
                />
              </v-col>
              <v-col cols="12" class="pt-0">
                <v-text-field
                  v-model="profile.email"
                  :label="$vuetify.lang.t('$vuetify.personal.email')"
                  hide-details="auto"
                  :error-messages="errors['profile.email']"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ApiSelect from '@/components/forms/APISelect'
import DatePicker from '@/components/forms/DatePicker'

export default {
  components: {
    ApiSelect,
    DatePicker
  },
  data() {
    DatePicker
    return {
      datepicker: false,
      genderList: [
        {text: 'Laki-laki', value:'L'},
        {text: 'Perempuan', value:'P'},
      ],
      statusList: [],
    }
  },
  computed: {
    ...mapState("global", ["errors"]),
    ...mapState('parents', ['profile']),
    ...mapState('students', ['student']),
    ...mapGetters('global', ['getErrorMessage']),
  },
  created() {},
  methods: {}
}
</script>

<style>

</style>