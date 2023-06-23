<template>
  <v-container class="pa-0 py-2">
    <v-row>
      <v-col cols="12" class="py-0">
        <v-text-field
          v-model="lookup.lookup_name"
          label="Lookup Name*"
          :error-messages="errors['lookup.lookup_name']"
          required
        />
      </v-col>
      <v-col cols="12" class="py-0">
        <v-text-field v-model="lookup.description" label="Description" />
      </v-col>
      <v-col cols="12" sm="6" class="py-0">
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
              v-model="lookup.effective_start_date"
              label="Effective Start Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            />
          </template>
          <v-date-picker
            v-model="lookup.effective_start_date"
            @input="datepicker1 = false"
            no-title
          />
        </v-menu>
      </v-col>
      <v-col cols="12" sm="6" class="py-0">
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
              v-model="lookup.effective_end_date"
              label="Effective Start Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            />
          </template>
          <v-date-picker
            v-model="lookup.effective_end_date"
            @input="datepicker2 = false"
            no-title
          />
        </v-menu>
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
    ...mapState('lookups', {
      lookup : state => state.lookup
    })
  }
}
</script>

<style>

</style>