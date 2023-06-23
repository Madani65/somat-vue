<template>
  <div>
    <v-card
      elevation="1"
    >
      <v-card-title>Permissions</v-card-title>
      <v-container class="pt-0">
        <v-row class="pa-3">
          <v-dialog v-model="dialogForm" persistent max-width="800px">
            <template v-slot:activator="{ on }">
              <v-btn
                small
                :disabled="loading"
                class="text-capitalize primary"
                dark
                v-on="on"
              >
                <v-icon size="18">
                  mdi-pencil-plus
                </v-icon>Tambah Permission
              </v-btn>
            </template>
            <v-form>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ editingIndex>=0 ?'Edit':'Add' }} Permission</span>
                </v-card-title>
                <v-card-text>
                  <template-form />
                  <permission :loading-flag="loading" :readonly-flag="false" />
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
                    :disabled="loading"
                    @click="closeForm"
                    class="text-capitalize red darken-1"
                  >
                    Batal
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
          </v-dialog>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-data-table
              v-model="itemSelected"
              item-key="template_id"
              :headers="headers"
              :items="templates"
              :options.sync="options"
              :server-items-length="totalTemplates"
              :footer-props="{
                showFirstLastPage: true,
                itemsPerPageOptions: [2,5,10,15,20,-1],
                showCurrentPage:true
              }"
              class="header-table-blue"
              show-select
              :loading="loading"
              loading-text="Loading... Please wait"
            >
              <template v-slot:[`item.routelist`]="{ item }">
                <v-dialog persistent max-width="800px">
                  <template v-slot:activator="{ on }">
                    <v-btn
                      x-small
                      class="no-upper-case red darken-1"
                      @click="showRouteList(item)"
                      dark
                      :disabled="loading"
                      v-on="on"
                    >
                      Route List
                    </v-btn>
                  </template>
                  <template v-slot:default="dialog">
                    <v-card>
                      <permission :readonly-flag="true" />
                      <v-card-actions>
                        <div class="flex-grow-1" />
                        <v-btn
                          dark
                          @click="dialog.value=false"
                          class="text-capitalize grey darken-1"
                        >
                          Close
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
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
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TemplateForm from '@/components/forms/authorization/Template'
import Permission from '@/views/pages/settings/authorization/Permission'

export default {
  components: {
    TemplateForm,
    Permission
  },
  data() {
    return {
      dialogForm : false,
      dialogRoutes: false,
      editingIndex : -1,
      options: {},
      loading: false,
      itemSelected: [],
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Description', value: 'description' },
        { text: 'Route List', value: 'routelist', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    }
  },

  computed: {
    ...mapState('templates', {
      templates: state => state.templates,
      template : state => state.template,
      totalTemplates: state => state.totalTemplates,
      totalPageTemplates: state => state.totalPageTemplates
    })
  },

  watch: {
    'options' : {
      handler() {
        this.get()
      }
    }
  },

  methods: {
    get(){
      // console.log(this.options)
      this.loading = true
      this.$store.commit('templates/CLEAR_DATA')
      this.$store.dispatch('templates/get', { 'options' : this.options }).then( () => {
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    doEdit(item){
      console.log(item)
      this.editingIndex = this.templates.indexOf(item)
      this.$store.commit('templates/ASSIGN_FORM', item)
      this.$store.commit('permissions/ASSIGN_DATA', item.permissions)
      this.dialogForm = true
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
          this.$store.commit('templates/ASSIGN_FORM', item)
          this.$store.dispatch('templates/delete').then( () => {
            this.get()
          })
        }
      })
    },
    doSave(){
      this.loading = true
      this.$store.dispatch('templates/save').then( () => {
        this.$store.commit('permissions/CLEAR_DATA')
        this.$toastr.s("Data Berhasil disimpan")
        this.dialogForm = false
        this.get()
      }).catch((err) => {
        this.$store.commit("global/setErrors", err.response.data.errors)
        this.loading = false
      })
    },
    showRouteList(item) {
      //   console.log(item)
      this.$store.commit('permissions/ASSIGN_DATA', item.permissions)
    },
    closeForm() {
      this.dialogForm = false
      this.dialogRoutes = false
      this.$store.commit('templates/CLEAR_FORM')
      this.$store.commit('permissions/CLEAR_DATA')
      this.$store.commit("global/clearErrors")
      this.editingIndex = -1
    },
  }
}
</script>

<style>

</style>