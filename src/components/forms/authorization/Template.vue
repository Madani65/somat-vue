<template>
  <v-container class="pa-0 py-2">
    <v-row>
      <v-col cols="12" sm="4" class="py-0">
        <v-text-field
          v-model="template.name"
          label="Name*"
          :error-messages="errors['template.name']"
          required
        />
      </v-col>
      <v-col cols="12" sm="8" class="py-0">
        <v-text-field v-model="template.description" label="Description" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState("global", ["errors"]),
    ...mapState('templates', {
      template : state => state.template
    })
  }
}
</script>

<style>

</style>