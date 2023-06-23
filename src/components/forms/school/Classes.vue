<template>
  <v-container class="px-0 py-2">
    <v-row>
      <v-col cols="12" md="6" class="pt-0">
        <api-select 
          v-model="selectClassLevel"
          dispatch-name="classlevel/getActive"
          :dispatch-params="selectedSchoolLevel"
          :label="$vuetify.lang.t('$vuetify.school.level.class')"
          item-text="class_level"
          item-value="class_level_id"
          return-object
          :error-messages="getErrorMessage(`class.${editingIndex}.class_level_id`)"
        />
      </v-col>
      <v-col cols="12" md="6" class="pt-0">
        <api-select 
          v-model="selectMajor"
          dispatch-name="majors/getActive"
          :label="$vuetify.lang.t('$vuetify.class.major.title')"
          item-text="name"
          item-value="class_major_id"
          return-object
          :error-messages="getErrorMessage(`class.${editingIndex}.class_major_id`)"
        />
      </v-col>
      <v-col cols="12" md="6" class="pt-0">
        <v-text-field
          v-model="classRoom.class_code"
          :label="$vuetify.lang.t('$vuetify.class.code')"
          hide-details="auto"
          required
          :error-messages="getErrorMessage(`class.${editingIndex}.class_code`)"
        />
      </v-col>
      <v-col cols="12" md="6" class="pt-0">
        <v-text-field
          v-model="classRoom.class_name"
          :label="$vuetify.lang.t('$vuetify.class.name')"
          hide-details="auto"
          required
          :error-messages="getErrorMessage(`class.${editingIndex}.class_name`)"
          :readonly="classRoom.auto_class_name"
          :append-icon="classRoom.auto_class_name ? 'mdi-checkbox-marked-outline' : 'mdi-checkbox-blank-outline'"
          @click:append="classRoom.auto_class_name = !classRoom.auto_class_name"
        />
      </v-col>
      <v-col cols="12" md="6" class="pt-0">
        <v-switch
          v-model="classRoom.active_flag"
          :label="'Status : '+ (classRoom.active_flag=='Y'?$vuetify.lang.t('$vuetify.active'):$vuetify.lang.t('$vuetify.inactive'))"
          color="primary"
          true-value="Y"
          false-value="N"
          hide-details="auto"
          :error-messages="getErrorMessage(`class.${editingIndex}.active_flag`)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ApiSelect from '@/components/forms/APISelect'

export default {
  components: {
    ApiSelect
  },
  data() {
    return {
      editingIndex: -1
    }
  },

  computed: {
    ...mapState( 'profiles', ['selectedSchoolLevel']),
    ...mapState( 'classes', ['classRoom']),
    ...mapState( 'majors', ['majors']),
    ...mapGetters( 'global', ['getErrorMessage']),
    selectClassLevel: {
      get() { return this.classRoom.class_level_id },
      set(val) {
        this.classRoom.class_level_id = val.class_level_id
        this.classRoom.class_level = val.class_level
      }
    },
    selectMajor: {
      get() { return this.classRoom.class_major_id },
      set(val) {
        this.classRoom.class_major_id = val.class_major_id
        this.classRoom.major_name = val.name
      }
    }
  },

  watch: {
    classRoom: {
      handler(){
        if(this.classRoom.auto_class_name) {
          let major = this.classRoom.major_name ? '-'+this.classRoom.major_name : ''
          let code = this.classRoom.class_code ? '-'+this.classRoom.class_code : ''
          this.classRoom.class_name = this.classRoom.class_level+major+code
        }
      },
      deep: true
    }
  }
}
</script>

<style>

</style>