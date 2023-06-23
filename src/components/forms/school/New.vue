<template>
  <div>
    <v-container class="px-0 py-2">
      <v-row>
        <v-col cols="12">
          <span class="title">Informasi Sekolah</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="8">
          <v-row>
            <v-col cols="12" md="6" class="pt-0">
              <v-text-field
                v-model="school.registration_number"
                label="NPSN"
                hide-details="auto"
                :error-messages="errors['school.registration_number']"
              />
            </v-col>
            <v-col cols="12" md="6" class="pt-0">
              <v-text-field
                v-model="school.name"
                label="Nama Sekolah"
                hide-details="auto"
                :error-messages="errors['school.name']"
              />
            </v-col>
            <v-col cols="12" md="6" class="pt-0">
              <v-text-field
                v-model="school.nis"
                label="NIS"
                hide-details="auto"
                :error-messages="errors['school.nis']"
              />
            </v-col>
            <v-col cols="12" md="6" class="pt-0">
              <v-text-field
                v-model="school.nss"
                label="NSS"
                hide-details="auto"
                :error-messages="errors['school.nss']"
              />
            </v-col>
            <v-col cols="12" md="6" class="pt-0">
              <v-select
                v-model="school.school_level_id"
                :items="schoolLevels"
                label="Jenjang Pendidikan"
                item-text="name"
                item-value="school_level_id"
                hide-details="auto"
                :error-messages="errors['school.school_level_id']"
              />
            </v-col>
            <v-col cols="12" md="6" class="pt-0">
              <v-select
                v-model="school.status"
                :items="getLookupData('school_status')"
                label="Status Sekolah"
                hide-details="auto"
                :error-messages="errors['school.status']"
              />
            </v-col>
            <v-col cols="12" md="6" class="pt-0">
              <v-select
                v-model="school.acreditation"
                :items="getLookupData('school_accreditation')"
                label="Akreditasi Sekolah"
                hide-details="auto"
                :error-messages="errors['school.acreditation']"
              />
            </v-col>
            <v-col cols="12" md="6" class="pt-0">
              <v-text-field
                v-model="school.curriculum"
                label="Kurikulum"
                hide-details="auto"
              />
            </v-col>
            <v-col cols="12" md="6" class="pt-0">
              <v-text-field
                v-model="school.foundation_name"
                label="Nama Yayasan"
                hide-details="auto"
              />
            </v-col>
            <v-col cols="12" md="6" class="pt-0">
              <v-text-field
                v-model="school.phone_number"
                label="No. Telp"
                hide-details="auto"
              />
            </v-col>
            <v-col cols="12" md="6" class="pt-0">
              <v-text-field
                v-model="school.website"
                label="Website"
                hide-details="auto"
              />
            </v-col>
            <v-col cols="12" md="6" class="pt-0">
              <v-text-field
                v-model="school.email"
                label="Email"
                hide-details="auto"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="4">
          <v-row>
            <v-col cols="12">
              <v-card outlined class="pa-3 d-flex align-center justify-center">
                <v-img
                  v-if="school.image"
                  aspect-ratio="1"
                  src="https://picsum.photos/id/11/500/300"
                />
                <v-icon size="100" class="my-12">
                  mdi-school
                </v-icon>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <form-location />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import FormLocation from '@/components/forms/Location'

export default {
  components: {
    FormLocation
  },
  data() {
    return {
      datepicker1: false,
      datepicker2: false
    }
  },
  computed: {
    ...mapState("global", ["errors"]),
    ...mapState('schools', {
      school : state => state.school
    }),
    ...mapState('schoollevel', {
      schoolLevels : state => state.schoolLevels
    }),
    ...mapState('app', {
      schoolStatus : state => state.lookupData[0].data
    }),
    ...mapGetters('app', ['getLookupData'])
  }
}
</script>

<style>

</style>