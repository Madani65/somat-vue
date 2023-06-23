<template>
  <div>
    <v-card
      elevation="1"
    >
      <v-container>
        <v-row class="pt-4 pb-3">
          <v-btn
            small
            :disabled="loading"
            class="text-capitalize primary white--text"
            @click="addnew()"
          >
            <v-icon size="18" class="mr-1">
              mdi-pencil-plus
            </v-icon>{{ $vuetify.lang.t('$vuetify.button.add') }}
          </v-btn>
          <v-btn
            small
            :loading="loading"
            class="text-capitalize orange white--text ml-2"
            @click="doSave()"
            v-if="shouldBeSave"
          >
            <v-icon size="18" class="mr-1">
              mdi-content-save
            </v-icon>{{ $vuetify.lang.t('$vuetify.button.save') }}
          </v-btn>
          <v-spacer />
          <v-menu offset-y transition="scroll-y-transition">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                small
                :disabled="loading"
                class="text-capitalize blue white--text ml-2"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon size="18" class="mr-1">
                  mdi-format-list-checks
                </v-icon>{{ $vuetify.lang.t('$vuetify.button.bulkaction') }}
              </v-btn>
            </template>
            <v-list dense>
              <v-list-item link>
                <v-icon class="mr-2">
                  mdi-delete-forever
                </v-icon>
                <v-list-item-title>{{ $vuetify.lang.t('$vuetify.bulkaction.delete') }}</v-list-item-title>
              </v-list-item>
              <v-list-item link>
                <v-icon class="mr-2">
                  mdi-file-export
                </v-icon>
                <v-list-item-title>{{ $vuetify.lang.t('$vuetify.bulkaction.export') }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-row>
        <v-row>
          <v-col cols="12" class="pa-0">
            <v-data-table
              v-model="itemSelected"
              show-select
              item-key="uuid"
              :headers="headers"
              :items="activities"
              :options.sync="options"
              :server-items-length="totalActivities"
              :footer-props="propsFooterTable"
              class="header-table-blue"
              :loading="loading"
              :loading-text="$vuetify.lang.t('$vuetify.loadingdata')"
            >
              <template v-slot:[`item.activity_name`]="props">
                <v-text-field
                  v-if="props.item.updated"
                  v-model="props.item.activity_name"
                  dense
                  filled
                  hide-details="auto"
                  class="ma-1"
                  required
                  :error-messages="getErrorMessage(`activity.${props.index}.activity_name`)"
                />
                <span v-else>{{ props.item.activity_name }}</span>
              </template>
              <template v-slot:[`item.description`]="props">
                <v-textarea
                  v-if="props.item.updated"
                  v-model="props.item.description"
                  auto-grow
                  filled
                  hide-details="auto"
                  rows="1"
                  class="ma-1"
                />
                <span v-else>{{ props.item.description }}</span>
              </template>
              <template v-slot:[`item.active_flag`]="props">
                <v-switch
                  v-if="props.item.updated"
                  v-model="props.item.active_flag"
                  :label="props.item.active_flag=='Y'?$vuetify.lang.t('$vuetify.active'):$vuetify.lang.t('$vuetify.inactive')"
                  color="primary"
                  true-value="Y"
                  false-value="N"
                  class="ma-1"
                  filled
                  dense
                  hide-details="auto"
                />
                <span v-else>{{ props.item.active_flag=='Y'?$vuetify.lang.t('$vuetify.active'):$vuetify.lang.t('$vuetify.inactive') }}</span>
              </template>
              <template v-slot:[`item.actions`]="props">
                <v-menu
                  v-if="!props.item.updated"
                  bottom
                  left
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list dense class="py-0">
                    <v-list-item @click="props.item.updated=true">
                      <v-list-item-title>
                        <v-icon small>
                          mdi-pencil
                        </v-icon> Ubah
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="doDelete(props)">
                      <v-list-item-title>
                        <v-icon small>
                          mdi-delete-forever
                        </v-icon> Hapus
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
                <v-btn
                  v-if="props.item.updated"
                  small
                  class="text-capitalize red white--text"
                  @click="doCancel(props)"
                  :disabled="loading"
                >
                  <v-icon size="18" class="mr-1">
                    mdi-close-circle
                  </v-icon>{{ $vuetify.lang.t('$vuetify.button.cancel') }}
                </v-btn>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
      loading: false,
      itemSelected: [],
      options: {},
      origItems: []
    }
  },

  computed: {
    ...mapState( 'global', ['propsFooterTable', 'propsConfirmDelete']),
    ...mapState( 'activity', ['activities', 'activity', 'totalActivities', 'totalPageActivities']),
    ...mapGetters( 'global', ['getErrorMessage']),
    headers(){
      return [
        { text: this.$vuetify.lang.t('$vuetify.setup.category.activity.title'), value: 'activity_name', width: '200', sortable: true },
        { text: this.$vuetify.lang.t('$vuetify.description'), value: 'description', sortable: true },
        { text: this.$vuetify.lang.t('$vuetify.status'), value: 'active_flag', width: '170', sortable: true },
        { text: this.$vuetify.lang.t('$vuetify.control'), value: 'actions', width: '120', sortable: false },
      ]
    },
    shouldBeSave(){
      return this.activities.filter( function(item) {
        return item.updated
      }).length
    }
  },

  watch: {
    'options' : {
      handler() {
        this.get()
      }
    }
  },

  methods: {
    setOrigItems(items){
      let list = []
      items.data.forEach( function(item){ list.push(item) })
      this.origItems = list
    },
    test(){
      return 1
    },
    get(){
      console.log(this.$uuid.v1())
      this.loading = true
      this.$store.dispatch('activity/get', { 'options' : this.options }).then( (resp) => {
        this.loading = false
        this.setOrigItems(resp.data)
      }).catch(() => {
        this.loading = false
      })
    },
    doSave(){
      this.loading = true
      this.$store.dispatch('activity/save').then( (resp) => {
        // this.$store.commit('lookupcodes/CLEAR_DATA')
        this.$toastr.s("Data Berhasil disimpan")
        this.loading = false
        this.setOrigItems(resp)
        // this.get()
      }).catch((err) => {
        this.loading = false
        this.$store.commit("global/setErrors", err.response.data.errors)
      })
    },
    addnew(){
      this.$store.commit('activity/PUSH_BLANK_DATA')
    },
    doDelete(data){
      this.$swal({
        ...this.propsConfirmDelete,
        title: this.$vuetify.lang.t('$vuetify.confirmsure'),
        text: this.$vuetify.lang.t('$vuetify.confirmdelete'),
        confirmButtonText: this.$vuetify.lang.t('$vuetify.button.yes'),
        cancelButtonText: this.$vuetify.lang.t('$vuetify.button.no')
      }).then((result) => {
        if (result.value) {
          this.loading = true
          this.$store.dispatch('activity/delete', data.item).then( (resp) => {
            this.origItems.splice(data.index, 1)
            this.loading = false
            if( 'message' in resp ) this.$toastr.s(resp.message)
          }).catch(() => {
            this.loading = false
          })
          this.$store.commit("global/clearErrors")
        }
      })
    },
    doCancel(data){
      this.$store.commit("global/clearErrors")
      if(data.item.activity_id){
        data.item.activity_name = this.origItems[data.index].activity_name
        data.item.description = this.origItems[data.index].description
        data.item.active_flag = this.origItems[data.index].active_flag
        data.item.updated = false
      }
      else
        this.$store.commit('activity/DELETED_BY_IDX', data.index)
    }
  }
}
</script>

<style>

</style>