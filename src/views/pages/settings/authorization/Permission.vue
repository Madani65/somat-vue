<template>
  <div>
    <v-card
      elevation="0"
      outlined
    >
      <v-card-title>Route List</v-card-title>
      <v-container class="pt-0">
        <v-row v-if="!readonlyFlag" class="pa-3">
          <v-dialog v-model="dialogForm" persistent max-width="800px">
            <template v-slot:activator="{ on }">
              <v-btn
                small
                :disabled="loadingFlag"
                class="text-capitalize primary"
                dark
                v-on="on"
              >
                <v-icon size="18">
                  mdi-pencil-plus
                </v-icon>Tambah Route
              </v-btn>
            </template>
            <v-form>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ editingIndex>=0 ?'Edit':'Add' }} Route</span>
                </v-card-title>
                <v-card-text>
                  <permission-form />
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
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-data-table
              v-model="itemSelected"
              item-key="key"
              :headers="headers"
              :items="permissions"
              hide-default-footer
              class="header-table-blue"
              loading-text="Loading... Please wait"
            >
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
import PermissionForm from '@/components/forms/authorization/Permission'

export default {
  components: {
    PermissionForm
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
      itemSelected: [],
      data: [],
      loading: this.loadingFlag,
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Slug', value: 'slug' },
        { text: 'Method', value: 'http_method'},
        { text: 'Path', value: 'http_path'},
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    }
  },

  computed: {
    ...mapState('templates', {
      template : state => state.template
    }),
    ...mapState('permissions', {
      permissions: state => state.permissions,
      permission: state => state.permission,
      tempPermissions: state => state.tempPermissions
    }),
  },

  created(){
    if (this.readonlyFlag) this.headers.splice(4, 1)
  },

  watch: {},

  methods: {
    doEdit(item){
      this.editingIndex = this.permissions.indexOf(item)
      this.$store.commit('permissions/ASSIGN_FORM', item)
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
          //   this.$store.commit('permissions/ASSIGN_FORM', item)
          this.$store.dispatch('permissions/delete').then( () => {
            // this.$store.commit('permissions/CLEAR_FORM')
            this.$store.commit('permissions/DELETED_DATA', item)
          })
        }
      })
    },
    doSave(){
      this.loading = true
      this.$store.dispatch('permissions/save', this.editingIndex).then( () => {
        this.loading = false
        this.dialogForm = false
        this.editingIndex = -1
        console.log(this.permissions)
      }).catch(() => {
        this.loading = false
      })
    },
    closeForm() {
      this.dialogForm = false
      this.$store.commit('permissions/CLEAR_FORM')
      this.$store.commit("global/clearErrors")
      this.editingIndex = -1
    },
  }
}
</script>

<style>

</style>