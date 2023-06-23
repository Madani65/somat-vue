<template>
  <v-container class="pa-0 py-2">
    <v-row>
      <v-col cols="12" sm="6" class="py-0">
        <v-text-field
          v-model="role.name"
          label="Name*"
          :error-messages="errors['role.name']"
          required
        />
      </v-col>
      <v-col cols="12" sm="6" class="py-0">
        <v-text-field
          v-model="role.slug"
          label="Slug*"
          :error-messages="errors['role.slug']"
          required
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data(){
    return {}
  },
  computed: {
    ...mapState("global", ["errors"]),
    ...mapState('roles', {
      role : state => state.role
    })
  }
}
</script>

<style>

</style>