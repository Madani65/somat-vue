<template>
  <div>
    <v-card
      elevation="0"
      outlined
    >
      <v-container>
        <v-row v-if="!readonlyFlag" class="pa-3">
          <span class="title">Lookup Codes</span>
          <v-spacer />
          <v-btn
            small
            :disabled="loading"
            class="text-capitalize primary"
            dark
            @click="dialogForm=true"
          >
            <v-icon size="18">
              mdi-pencil-plus
            </v-icon>Tambah
          </v-btn>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-data-table
              v-model="itemSelected"
              item-key="key"
              :headers="headers"
              :items="lookupCodes"
              hide-default-footer
              class="header-table-blue"
              :loading="loading"
              loading-text="Loading... Please wait"
            >
              <template v-slot:[`item.effective_start_date`]="{ item }">
                <v-chip
                  v-if="item.effective_start_date"
                  small
                  color="green"
                  text-color="white"
                >
                  {{ new Date(item.effective_start_date) | dateFormat('DD MMM YYYY') }}
                </v-chip>
              </template>
              <template v-slot:[`item.effective_end_date`]="{ item }">
                <v-chip
                  v-if="item.effective_end_date"
                  small
                  color="green"
                  text-color="white"
                >
                  {{ new Date(item.effective_end_date) | dateFormat('DD MMM YYYY') }}
                </v-chip>
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-menu
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
                    <v-list-item @click="doEdit(item)">
                      <v-list-item-title>
                        <v-icon small>
                          mdi-pencil
                        </v-icon> Edit
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="doDelete(item)">
                      <v-list-item-title>
                        <v-icon small>
                          mdi-delete
                        </v-icon> Hapus
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
            </v-data-table>
            <v-dialog v-model="dialogForm" persistent max-width="800px">
              <v-form>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ editingIndex>=0 ?'Edit':'Add' }} Lookup</span>
                  </v-card-title>
                  <v-card-text>
                    <lookup-code-form />
                  </v-card-text>
                  <v-card-actions>
                    <div class="flex-grow-1" />
                    <v-btn
                      dark
                      type="submit"
                      :loading="loading"
                      @click.prevent="doSave"
                      class="text-capitalize green darken-1"
                    >
                      Simpan
                    </v-btn>
                    <v-btn
                      dark
                      :loading="loading"
                      @click="closeForm"
                      class="text-capitalize red darken-1"
                    >
                      Batal
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-form>
            </v-dialog>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import LookupCodeForm from '@/components/forms/setups/LookupCode'

export default {
  components: {
    LookupCodeForm
  },
  props: {
    loadingFlag: {
      type: Boolean,
      default: false
    },
    readonlyFlag: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogForm : false,
      editingIndex : -1,
      options: {},
      loading: this.loadingFlag,
      itemSelected: [],
      headers: [
        { text: 'Code', value: 'code', sortable: true },
        { text: 'Value', value: 'value', sortable: true },
        { text: 'Description', value: 'description', sortable: true },
        { text: 'Effective Start Date', value: 'effective_start_date', sortable: true },
        { text: 'Effective End Date', value: 'effective_end_date', sortable: true },
        { text: 'Kontrol', value: 'actions', sortable: false },
      ],
    }
  },

  computed: {
    ...mapState('lookups', {
      lookup : state => state.lookup
    }),
    ...mapState('lookupcodes', {
      lookupCodes: state => state.lookupCodes,
      lookupCode : state => state.lookupCode,
      deletedLookupCodes: state => state.deletedLookupCodes
    })
  },

  watch: {},

  created() {
    if (this.readonlyFlag) this.headers.splice(4, 1)
  },

  methods: {
    doEdit(item){
      this.dialogForm = true
      this.$store.commit('lookupcodes/ASSIGN_FORM', item)
    },
    doDelete(item){
      this.$swal({
        title: 'Anda Yakin?',
        text: "Untuk menghapus data tersebut",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak'
      }).then((result) => {
        if (result.value) {
          this.loading = true
          this.$store.commit('lookupcodes/ASSIGN_FORM', item)
          this.$store.dispatch('lookupcodes/delete').then( () => {
            this.loading = false
          })
        }
      })
    },
    doSave(){
      this.loading = true
      this.$store.dispatch('lookupcodes/save').then( () => {
        // this.$toastr.s("Data Berhasil disimpan")
        this.loading = false
        this.dialogForm = false
      }).catch((err) => {
        this.$store.commit("global/setErrors", err.response.data.errors)
        this.loading = false
      })
    },
    closeForm(){
      this.$store.commit('lookupcodes/CLEAR_FORM')
      this.dialogForm = false
    }
  }
}
</script>

<style>

</style>