<template>
  <v-container class="px-0 py-2">
    <v-row>
      <v-col cols="12" class="pt-0">
        <v-card>
          <v-card-text class="pb-6">
            <v-row>
              <v-col cols="12" class="pt-0">
                <v-row>
                  <v-col cols="12" md="6">
                    <api-select 
                      v-model="selectCategory"
                      dispatch-name="lessoncategory/getNoPaging"
                      :label="$vuetify.lang.t('$vuetify.lesson.category')"
                      item-text="name"
                      item-value="lesson_category_id"
                      return-object
                      :error-messages="errors['lesson.lesson_category_id']"
                    />
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="6" class="pt-0">
                <v-text-field
                  v-model="lesson.name"
                  :label="$vuetify.lang.t('$vuetify.lesson.name')"
                  hide-details="auto"
                  :error-messages="errors['lesson.name']"
                />
              </v-col>
              <v-col cols="12" md="6" class="pt-0">
                <v-select
                  v-model="lesson.active_flag"
                  :items="statusList"
                  :label="$vuetify.lang.t('$vuetify.status')"
                  hide-details="auto"
                  :error-messages="errors['lesson.active_flag']"
                />
              </v-col>
              <v-col cols="12" md="6" class="pt-0">
                <v-checkbox
                  v-model="lesson.group_flag"
                  :label="$vuetify.lang.t('$vuetify.make_it_group')"
                  false-value="N"
                  true-value="Y"
                  hide-details="auto"
                  :error-messages="errors['lesson.group_flag']"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card class="mt-3" v-if="lesson.group_flag == 'Y'">
          <v-card-title class="pb-1 subtitle-1">
            Anggota Group
          </v-card-title>
          <v-card-text>
            <v-divider class="mb-4" />
            <v-row v-for="(list, i) in childLessons" :key="i">
              <v-col cols="12" md="6" class="pt-0">
                <v-text-field
                  v-model="list.name"
                  :label="$vuetify.lang.t('$vuetify.lesson.name')"
                  hide-details="auto"
                  :error-messages="getErrorMessage(`group.${i}.name`)"
                  :prefix="(i+1) + '.'"
                />
              </v-col>
              <v-col cols="12" md="6" class="pt-0">
                <v-select
                  v-model="list.active_flag"
                  :items="statusList"
                  :label="$vuetify.lang.t('$vuetify.status')"
                  hide-details="auto"
                  :error-messages="getErrorMessage(`group.${i}.active_flag`)"
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn
              :loading="loading"
              small
              elevation="0"
              @click="addChild"
              class="text-capitalize"
            >
              {{ $vuetify.lang.t('$vuetify.add_new_line') }}
            </v-btn>
          </v-card-actions>
        </v-card>
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
      datepicker: false,
      loading: false
    }
  },
  computed: {
    ...mapState("global", ["errors"]),
    ...mapState('userprofiles', ['profiles','profile']),
    ...mapState('lessons', ['lesson', 'childLessons']),
    ...mapState( 'lessoncategory', ['lessonCategories']),
    ...mapGetters( 'global', ['getErrorMessage']),
    statusList(){
      return [
        { text: this.$vuetify.lang.t('$vuetify.active'), value: 'Y' },
        { text: this.$vuetify.lang.t('$vuetify.inactive'), value: 'N' }
      ]
    },
    selectCategory: {
      get() { return this.lesson.lesson_category_id },
      set(val) {
        this.lesson.lesson_category_id = val.lesson_category_id
      }
    }
  },
  created() {},
  methods: {
    addChild(){
      console.log('test add')
      this.$store.commit('lessons/ADD_NEW_CHILD')
    }
  }
}
</script>

<style>

</style>