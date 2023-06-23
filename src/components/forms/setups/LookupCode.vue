<template>
  <v-container class="pa-0 py-2">
    <v-row>
      <v-col cols="6" class="py-0">
        <v-text-field
          v-model="lookupCode.code"
          label="Lookup Code*"
          :error-messages="errors['lookupCode.code']"
          required
        />
      </v-col>
      <v-col cols="6" class="py-0">
        <v-text-field
          v-model="lookupCode.value"
          label="Lookup Value*"
          :error-messages="errors['lookupCode.value']"
          required
        />
      </v-col>
      <v-col cols="12" class="py-0">
        <v-text-field v-model="lookupCode.description" label="Description" />
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
              v-model="lookupCode.effective_start_date"
              label="Effective Start Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            />
          </template>
          <v-date-picker
            v-model="lookupCode.effective_start_date"
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
              v-model="lookupCode.effective_end_date"
              label="Effective Start Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            />
          </template>
          <v-date-picker
            v-model="lookupCode.effective_end_date"
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
    ...mapState('lookupcodes', {
      lookupCode : state => state.lookupCode
    })
  }
}
</script>

<style>

</style>