<template>
  <v-container class="pa-0 py-2">
    <v-row>
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
          <v-col cols="12" class="pt-0">
            <v-text-field
              v-model="school.foundation_name"
              label="Kepala Sekolah"
              readonly
              hide-details="auto"
            />
          </v-col>
          <v-col cols="12" class="pt-0">
            <v-text-field
              v-model="school.study_time_status"
              label="Waktu Kegiatan"
              readonly
              hide-details="auto"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="8">
        <v-row>
          <v-col cols="12" md="6" class="pt-0">
            <v-text-field
              v-model="school.registration_number"
              label="NPSN"
              readonly
              hide-details="auto"
            />
          </v-col>
          <v-col cols="12" md="6" class="pt-0">
            <v-text-field
              v-model="school.nis"
              label="NIS"
              readonly
              hide-details="auto"
            />
          </v-col>
          <v-col cols="12" md="6" class="pt-0">
            <v-text-field
              v-model="school.nss"
              label="NSS"
              readonly
              hide-details="auto"
            />
          </v-col>
          <v-col cols="12" md="6" class="pt-0">
            <v-text-field
              v-model="school.education_level.name"
              label="Jenjang Pendidikan"
              readonly
              hide-details="auto"
            />
          </v-col>
          <v-col cols="12" md="6" class="pt-0">
            <v-text-field
              v-model="school.school_status"
              label="Status Sekolah"
              readonly
              hide-details="auto"
            />
          </v-col>
          <v-col cols="12" md="6" class="pt-0">
            <v-text-field
              v-model="school.acreditation"
              label="Akreditasi Sekolah"
              readonly
              hide-details="auto"
            />
          </v-col>
          <v-col cols="12" md="6" class="pt-0">
            <v-text-field
              v-model="school.curriculum"
              label="Kurikulum"
              readonly
              hide-details="auto"
            />
          </v-col>
          <v-col cols="12" md="6" class="pt-0">
            <v-text-field
              v-model="school.foundation_name"
              label="Nama Yayasan"
              readonly
              hide-details="auto"
            />
          </v-col>
          <v-col cols="12" md="6" class="pt-0">
            <v-text-field
              v-model="school.phone_number"
              label="No. Telp"
              readonly
              hide-details="auto"
            />
          </v-col>
          <v-col cols="12" md="6" class="pt-0">
            <v-text-field
              v-model="school.email"
              label="Email"
              readonly
              hide-details="auto"
            />
          </v-col>
          <v-col cols="12" md="6" class="pt-0">
            <v-text-field
              v-model="school.website"
              label="Website"
              readonly
              hide-details="auto"
            />
          </v-col>
          <v-col cols="12" class="pt-0">
            <v-textarea
              v-model="school.location.location_name"
              label="Alamat"
              readonly
              hide-details="auto"
              auto-grow
              rows="1"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
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
    })
  }
}
</script>

<style>

</style>