<template>
  <v-menu
    v-model="datepicker"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="localState"
        :label="label"
        prepend-icon="mdi-calendar"
        readonly
        hide-details="auto"
        v-bind="attrs"
        v-on="on"
        :error-messages="errorMessages"
      />
    </template>
    <v-date-picker
      v-model="localState"
      :min="min"
      :max="max"
      @input="datepicker = false"
      no-title
    />
  </v-menu>
</template>

<script>
export default {
  props: {
    value: {
      type: [String],
      default: null
    },
    label: {
      type: String,
      default: null
    },
    min: {
      type: String,
      default: null
    },
    max: {
      type: String,
      default: null
    },
    errorMessages: {
      type: Array,
      default: function() {
        return []
      }
    },
  },

  data: function(){
    return {
      datepicker: false
    }
  },

  computed: {
    localState: {
      get(){ return this.value },
      set(val) { this.$emit('input', val)}
    }
  },
}
</script>

<style>

</style>