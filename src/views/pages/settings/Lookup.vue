<template>
  <div>
    <v-card
      elevation="1"
    >
      <v-card-title>Data Lookups</v-card-title>
      <v-container class="pt-0">
        <v-row class="pa-3">
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
              item-key="lookup_id"
              :headers="headers"
              :items="lookups"
              :options.sync="options"
              :server-items-length="totalLookups"
              :footer-props="{
                showFirstLastPage: true,
                itemsPerPageOptions: [2,5,10,15,20,-1],
                showCurrentPage:true
              }"
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
                        </v-icon> Ubah
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="doDelete(item)">
                      <v-list-item-title>
                        <v-icon small>
                          mdi-close
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
                    <lookup-form />
                    <lookup-code :loading-flag="loading" :readonly-flag="false" />
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
import LookupForm from '@/components/forms/setups/Lookup'
import LookupCode from '@/views/pages/settings/LookupCode'

export default {
  components: {
    LookupForm,
    LookupCode
  },
  data() {
    return {
      dialogForm : false,
      editingIndex : -1,
      options: {},
      loading: false,
      itemSelected: [],
      headers: [
        { text: 'Lookup Name', value: 'lookup_name', sortable: true },
        { text: 'Description', value: 'description', sortable: true },
        { text: 'Effective Start Date', value: 'effective_start_date', sortable: true },
        { text: 'Effective End Date', value: 'effective_end_date', sortable: true },
        { text: 'Kontrol', value: 'actions', sortable: false },
      ],
    }
  },

  computed: {
    ...mapState('lookups', {
      lookups: state => state.lookups,
      lookup : state => state.lookup,
      totalLookups: state => state.totalLookups,
      totalPageLookups: state => state.totalPageLookups
    })
  },

  watch: {
    'options' : {
      handler() {
        this.get()
      }
    }
  },

  created() {
    this.closeForm()
  },

  methods: {
    get(){
      this.loading = true
      this.$store.commit('lookups/CLEAR_DATA')
      this.$store.dispatch('lookups/get', { 'options' : this.options }).then( () => {
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    doEdit(item){
      this.dialogForm = true
      this.$store.commit('lookups/ASSIGN_FORM', item)
      this.$store.commit('lookupcodes/ASSIGN_DATA', item.lookup_code)
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
          this.$store.commit('lookups/ASSIGN_FORM', item)
          this.$store.dispatch('lookups/delete').then( () => {
            this.loading = false
          })
        }
      })
    },
    doSave(){
      this.loading = true
      this.$store.dispatch('lookups/save').then( () => {
        this.$store.commit('lookupcodes/CLEAR_DATA')
        this.$toastr.s("Data Berhasil disimpan")
        this.loading = false
        this.dialogForm = false
      }).catch((err) => {
        this.$store.commit("global/setErrors", err.response.data.errors)
        this.loading = false
      })
    },
    closeForm(){
      this.$store.commit('lookups/CLEAR_FORM')
      this.$store.commit('lookupcodes/CLEAR_DATA')
      this.$store.commit("global/clearErrors")
      this.dialogForm = false
    }
  }
}
</script>

<style>

</style>