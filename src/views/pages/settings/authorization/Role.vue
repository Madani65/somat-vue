<template>
  <div>
    <v-card
      elevation="1"
    >
      <v-card-title>Setup Role</v-card-title>
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
                </v-icon>Tambah Role
              </v-btn>
            </template>
            <v-form>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ editingIndex>=0 ?'Edit':'Add' }} Role</span>
                </v-card-title>
                <v-card-text>
                  <role-form />
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
          <v-btn
            small
            :disabled="loading"
            class="text-capitalize orange darken-1 ml-2"
            dark
          >
            <v-icon size="18">
              mdi-content-save
            </v-icon>Simpan
          </v-btn>
        </v-row>
        <v-row>
          <v-col cols="12" sm="4">
            <v-card tile elevation="0" outlined>
              <v-card-text class="pa-0">
                <v-data-table
                  v-model="itemSelected"
                  item-key="role_id"
                  :headers="headers"
                  :items="roles"
                  class="header-table-blue"
                  show-select
                  single-select
                  hide-default-footer
                  :loading="loading"
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
              </v-card-text>
            </v-card>
          </v-col>
          <v-divider vertical />
          <v-col>
            <v-card tile elevation="0" outlined>
              <v-toolbar
                dense
                flat
                color="#0072BE"
                dark
                class="toolbar-font-size-12"
              >
                <v-toolbar-title>Menu & Permission</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-treeview
                  v-model="selection"
                  :items="items"
                  selection-type="leaf"
                  selectable
                  return-object
                  dense
                  item-text="title"
                  off-icon="mdi-timeline-outline"
                  on-icon="mdi-timeline-check-outline"
                  indeterminate-icon="mdi-timeline-minus"
                  open-on-click
                />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import RoleForm from '@/components/forms/authorization/Role'

export default {
  components: {
    RoleForm
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
        { text: 'Role Name', value: 'name' },
        { text: '', value: 'actions', sortable: false },
      ],
      selection: [],
      items: [
        {
          id: 1,
          name: 'Root',
          children: [
            { id: 2, name: 'Child #1' },
            { id: 3, name: 'Child #2' },
            {
              id: 4,
              name: 'Child #3',
              children: [
                { id: 5, name: 'Grandchild #1' },
                { id: 6, name: 'Grandchild #2' },
              ],
            },
          ],
        },
      ],
    }
  },

  computed: {
    ...mapState('roles', {
      roles: state => state.roles,
      role : state => state.role
    }),
    ...mapState('templates', {
      templates: state => state.templates,
      template : state => state.template,
      totalTemplates: state => state.totalTemplates,
      totalPageTemplates: state => state.totalPageTemplates
    }),
    ...mapGetters('menus', ['getParentChild'])
  },

  watch: {
    selection: {
      handler() {
        console.log(this.selection)
      }
    }
  },

  created() {
    this.get()
  },

  methods: {
    get(){
      // console.log(this.options)
      this.loading = true
      this.$store.commit('roles/CLEAR_DATA')
      this.$store.dispatch('menus/get', { 'options' : this.options }).then( () => {
        this.items = this.getParentChild
      })
      this.$store.dispatch('roles/get').then( () => {
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    doEdit(item){
      console.log(item)
      this.editingIndex = this.templates.indexOf(item)
      this.$store.commit('roles/ASSIGN_FORM', item)
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
          this.$store.commit('roles/ASSIGN_FORM', item)
          this.$store.dispatch('roles/delete').then( () => {
            this.get()
          })
        }
      })
    },
    doSave(){
      this.loading = true
      this.$store.dispatch('roles/save').then( () => {
        this.$store.commit('roles/CLEAR_DATA')
        this.$toastr.s("Data Berhasil disimpan")
        this.dialogForm = false
        this.get()
      }).catch((err) => {
        this.$store.commit("global/setErrors", err.response.data.errors)
        this.loading = false
      })
    },
    closeForm() {
      this.dialogForm = false
      this.dialogRoutes = false
      this.$store.commit('roles/CLEAR_FORM')
      this.$store.commit("global/clearErrors")
      this.editingIndex = -1
    },
  }
}
</script>

<style>

</style>