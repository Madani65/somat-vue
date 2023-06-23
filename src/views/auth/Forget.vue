<template>
  <v-card outlined elevation="1" class="rounded-lg">
    <v-card-title class="justify-center">
      School Management
    </v-card-title>
    <v-form
      ref="form"
      v-model="formValid"
      lazy-validation
      @submit.prevent="doEmailReset"
    >
      <v-card-text>
        <v-text-field
          v-model="formModel.email"
          label="Username"
          :rules="formRule.email"
          :error-messages="errors.email"
          prepend-inner-icon="mdi-email"
          outlined
        />
        <v-row class="py-3">
          <v-col cols="12" class="d-flex justify-end">
            <v-btn
              type="submit"
              large
              :loading="loading"
              color="primary"
              class="text-capitalize"
              width="200"
            >
              Reset Password
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-form>
  </v-card>
</template>

<script>
import { mapState } from "vuex"
export default {
  data() {
    return {
      loading: false,
      formValid: false,
      errorLogin: [],
      formModel: {
        email: null,
      },
      formRule: {
        email: [(v) => !!v || "Email is Required"]
      },
    }
  },

  computed: {
    ...mapState("global", ["errors"]),
  },

  methods: {
    doEmailReset() {
      if (this.$refs.form.validate()) {
        this.$toastr.s('Email berhasil dikirim /n Silahkah email anda untuk langkah selanjutnya.')
      }
    },
  },
}
</script>