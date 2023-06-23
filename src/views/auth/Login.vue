<template>
  <v-card outlined elevation="1" class="rounded-lg">
    <v-card-title class="justify-center">
      School Management
    </v-card-title>
    <v-form
      ref="form"
      v-model="formValid"
      lazy-validation
      @submit.prevent="doLogin"
    >
      <v-card-text>
        <v-text-field
          v-model="formModel.username"
          label="Username"
          :rules="formRule.username"
          :error-messages="errors.username"
          outlined
          prepend-inner-icon="mdi-account"
        />
        <v-text-field
          v-model="formModel.password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          hide-details="auto"
          :rules="formRule.password"
          :error-messages="errors.password"
          outlined
          @click:append="showPassword = !showPassword"
          prepend-inner-icon="mdi-lock"
        />
        <v-row no-gutters class="d-flex align-end">
          <v-checkbox label="Ingatkan Password" hide-details="true">
            I
          </v-checkbox>
          <v-spacer />
          <v-btn
            text
            x-small
            class="text-capitalize"
            @click="doForget()"
          >
            Lupa Password?
          </v-btn>
        </v-row>
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
              Login
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
      showPassword: false,
      loading: false,
      formValid: false,
      errorLogin: [],
      formModel: {
        username: null,
        password: null,
      },
      formRule: {
        username: [(v) => !!v || "Username is Required"],
        password: [(v) => !!v || "Password is Required"],
      },
    }
  },

  computed: {
    ...mapState("global", ["errors"]),
  },

  methods: {
    doLogin() {
      if (this.$refs.form.validate()) {
        this.loading = true
        this.$store.commit("global/clearErrors")
        this.$store
          .dispatch("auth/login", this.formModel)
          .then(() => {
            this.loading = false
            this.$router.push("/")
          })
          .catch((err) => {
            this.$store.commit("global/setErrors", err.response.data.errors)
            this.loading = false
          })
      }
    },
    doForget(){
      this.$router.push("/auth/forget")
    }
  },
}
</script>