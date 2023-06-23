<template>
  <div>
    <v-btn
      small
      :loading="loading"
      class="text-capitalize primary white--text"
      @click="addNew"
    >
      <v-icon size="18" class="mr-1">
        mdi-pencil-plus
      </v-icon>{{ $vuetify.lang.t('$vuetify.attendence.new_letter') }}
    </v-btn>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  components: {
    
  },

  data() {
    return {
      loading: false
    }
  },

  computed: {
    ...mapState( 'global', ['errors','propsFooterTable', 'propsConfirmDelete']),
    ...mapGetters( 'global', ['getErrorMessage']),
  },

  watch: {

  },

  created(){

  },

  methods: {
    get(){},
    addNew(){},
    doEdit(){},
    doDelete(){},
    doSave(){},
    doReset(){}
  }
}
</script>

<style>

</style>