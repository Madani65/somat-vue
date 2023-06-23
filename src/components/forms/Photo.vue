<template>
  <v-row>
    <v-col cols="12">
      <v-card elevation="0" outlined class="pa-3 d-flex align-center justify-center">
        <v-img
          v-if="imgPath"
          aspect-ratio="1"
          src="https://picsum.photos/id/11/500/300"
        />
        <v-icon size="105" :class="classIcon">
          mdi-school
        </v-icon>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Object],
      default: null
    },
    classImg: {
      type: String,
      default: null
    },
    classIcon: {
      type: String,
      default: "my-8"
    }
  },

  computed: {
    imgPath: {
      get(){ return this.value },
      set(val) { this.$emit('input', val) }
    }
  }
}
</script>

<style>

</style>