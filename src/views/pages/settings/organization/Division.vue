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
              single-select
              item-key="uuid"
              :headers="headers"
              :items="organizations"
              :options.sync="options"
              :server-items-length="totalOrganizations"
              :footer-props="propsFooterTable"
              class="header-table-blue"
              :loading="loading"
              :loading-text="$vuetify.lang.t('$vuetify.loadingdata')"
            >
              <template v-slot:[`item.name`]="props">
                <v-text-field
                  v-if="props.item.updated"
                  v-model="props.item.name"
                  dense
                  filled
                  hide-details="auto"
                  class="ma-1"
                  required
                  :error-messages="getErrorMessage(`organization.${props.index}.name`)"
                />
                <span v-else>{{ props.item.name }}</span>
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
                  :error-messages="getErrorMessage(`organization.${props.index}.description`)"
                />
                <span v-else>{{ props.item.description }}</span>
              </template>
              <template v-slot:[`item.effective_start_date`]="props">
                <v-text-field
                  v-if="props.item.updated"
                  v-model="props.item.effective_start_date"
                  dense
                  filled
                  readonly
                  hide-details="auto"
                  class="ma-1"
                  required
                  :error-messages="getErrorMessage(`organization.${props.index}.effective_start_date`)"
                  @click="setDatePicker(props,'effective_start_date')"
                  clearable
                  @click:clear="props.item.effective_start_date = null"
                />
                <span v-else>
                  <v-chip
                    v-if="props.item.effective_start_date"
                    small
                    color="green"
                    text-color="white"
                  >
                    {{ new Date(props.item.effective_start_date) | dateFormat('DD MMM YYYY') }}
                  </v-chip>
                </span>
              </template>
              <template v-slot:[`item.effective_end_date`]="props">
                <v-text-field
                  v-if="props.item.updated"
                  v-model="props.item.effective_end_date"
                  dense
                  filled
                  readonly
                  hide-details="auto"
                  class="ma-1"
                  required
                  :error-messages="getErrorMessage(`organization.${props.index}.effective_end_date`)"
                  @click="setDatePicker(props,'effective_end_date')"
                  clearable
                  @click:clear="props.item.effective_end_date = null"
                />
                <span v-else>
                  <v-chip
                    v-if="props.item.effective_end_date"
                    small
                    color="green"
                    text-color="white"
                  >
                    {{ new Date(props.item.effective_end_date) | dateFormat('DD MMM YYYY') }}
                  </v-chip>
                </span>
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
      <v-dialog
        ref="dialog"
        v-model="selectedDate.dialog"
        width="290px"
      >
        <v-date-picker
          v-if="selectedDate.dialog"
          v-model="selectDate"
          :min="selectedDate.name == 'effective_start_date' ? null : selectedDate.start"
          :max="selectedDate.name == 'effective_end_date' ? null : selectedDate.end"
          full-width
          no-title
          @input="selectedDate.dialog = false"
        />
      </v-dialog>
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
      selectedDate: {
        start: '',
        end: '',
        index: -1,
        name: '',
        dialog: false
      }
    }
  },

  computed: {
    ...mapState( 'global', ['propsFooterTable', 'propsConfirmDelete']),
    ...mapState( 'organizations', ['organizations', 'organization', 'totalOrganizations', 'totalPageOrganizations']),
    ...mapGetters( 'global', ['getErrorMessage']),
    headers(){
      return [
        { text: this.$vuetify.lang.t('$vuetify.organization.division.title'), value: 'name', width: '200', sortable: true },
        { text: this.$vuetify.lang.t('$vuetify.description'), value: 'description', sortable: true },
        { text: this.$vuetify.lang.t('$vuetify.effective_start_date'), value: 'effective_start_date', width: '180', sortable: true },
        { text: this.$vuetify.lang.t('$vuetify.effective_end_date'), value: 'effective_end_date', width: '180', sortable: true },
        { text: this.$vuetify.lang.t('$vuetify.control'), value: 'actions', width: '120', sortable: false },
      ]
    },
    shouldBeSave(){
      return this.organizations.filter( function(item) {
        return item.updated
      }).length
    },
    selectDate: {
      get: function() {
        if( this.selectedDate.index in this.organizations ) return this.organizations[this.selectedDate.index][this.selectedDate.name]
        else return null
      },
      set: function(val) {
        this.organizations[this.selectedDate.index][this.selectedDate.name] = val
      }
    }
  },

  created(){
    this.$store.commit("organizations/SET_SELECTED_BLANK")
    this.$store.commit("positions/SET_SELECTED_BLANK")
  },

  watch: {
    'options' : {
      handler() {
        this.get()
      }
    },
    itemSelected(){
      if(this.itemSelected.length == 1) this.$store.commit("organizations/SET_SELECTED_ITEM", this.itemSelected[0])
      else this.$store.commit("organizations/SET_SELECTED_BLANK")
      this.$store.commit("positions/SET_SELECTED_BLANK")
    }
  },

  methods: {
    setOrigItems(items){
      let list = []
      items.data.forEach( function(item){ list.push(item) })
      this.origItems = list
    },
    get(){
      this.loading = true
      this.$store.dispatch('organizations/get', { 'options' : this.options }).then( (resp) => {
        this.loading = false
        this.setOrigItems(resp.data)
      }).catch(() => {
        this.loading = false
      })
    },
    doSave(){
      this.loading = true
      this.$store.dispatch('organizations/save').then( (resp) => {
        this.$toastr.s("Data Berhasil disimpan")
        this.loading = false
        this.setOrigItems(resp)
      }).catch((err) => {
        this.loading = false
        this.$store.commit("global/setErrors", err.response.data.errors)
      })
    },
    addnew(){
      this.$store.commit('organizations/PUSH_BLANK_DATA')
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
          this.$store.dispatch('organizations/delete', data.item).then( (resp) => {
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
      if(data.item.organization_id){
        data.item.effective_start_date = this.origItems[data.index].effective_start_date
        data.item.effective_end_date = this.origItems[data.index].effective_end_date
        data.item.name = this.origItems[data.index].name
        data.item.description = this.origItems[data.index].description
        data.item.updated = false
      }
      else
        this.$store.commit('organizations/DELETED_BY_IDX', data.index)
    },
    setDatePicker(props, type){
      this.selectedDate.start = props.item.effective_start_date
      this.selectedDate.end = props.item.effective_end_date
      this.selectedDate.index = props.index
      this.selectedDate.name = type
      this.selectedDate.dialog = true
    }
  }
}
</script>

<style>

</style>