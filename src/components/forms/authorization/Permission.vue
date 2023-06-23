<template>
  <v-container class="pa-0 py-2">
    <v-row>
      <v-col cols="12" sm="6" class="py-0">
        <v-text-field
          v-model="permission.name"
          label="Name*"
          :error-messages="errors['permission.name']"
          required
        />
      </v-col>
      <v-col cols="12" sm="6" class="py-0">
        <v-text-field
          v-model="permission.slug"
          label="Slug"
          :error-messages="errors['permission.slug']"
          required
        />
      </v-col>
      <v-col cols="12" sm="3" class="py-0">
        <v-select
          v-model="permission.http_method"
          hint="Fill empty for all method"
          :items="methodList"
          label="Method"
          persistent-hint
          :error-messages="errors['permission.http_method']"
        />
      </v-col>
      <v-col cols="12" sm="9" class="py-0">
        <v-text-field
          v-model="permission.http_path"
          label="Path"
          :error-messages="errors['permission.http_path']"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data(){
    return {
      methodList : [
        '','GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'
      ]
    }
  },
  computed: {
    ...mapState("global", ["errors"]),
    ...mapState('permissions', {
      permission : state => state.permission
    })
  }
}
</script>

<style>

</style>