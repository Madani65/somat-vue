<template>
  <div>
    <v-card
      elevation="1"
    >
      <v-card-title>Setup Menu</v-card-title>
      <v-container class="pt-0">
        <v-row>
          <v-col cols="12" md="4">
            <v-card tile elevation="0" outlined>
              <v-toolbar
                dense
                flat
                color="#0072BE"
                dark
                class="toolbar-font-size-12"
              >
                <v-toolbar-title>Menu</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-list
                  nav
                  dense
                >
                  <vue-nestable
                    v-model="items"
                    :max-depth="3"
                  >
                    <template slot-scope="{ item }">
                      <v-list-item link>
                        <!-- Handler -->
                        <VueNestableHandle :item="item">
                          <v-list-item-icon class="mr-2">
                            <v-icon v-if="item.icon">
                              {{ 'mdi-'+item.icon }}
                            </v-icon>
                            <v-icon v-else>
                              mdi-drag
                            </v-icon>
                          </v-list-item-icon>
                        </VueNestableHandle>

                        <!-- Content -->
                        <v-list-item-content>
                          <v-list-item-title v-text="item.title" />
                        </v-list-item-content>

                        <v-list-item-action class="my-1">
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
                        </v-list-item-action>
                      </v-list-item>
                    </template>
                  </vue-nestable>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
          <v-divider vertical />
          <v-col>
            <v-form>
              <v-card tile outlined>
                <v-card-title class="blueheader white--text py-2">
                  {{ menu.id>0 ?'Edit':'Add' }} Menu
                </v-card-title>
                <v-card-text class="pt-3">
                  <menu-form />
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
                    @click="resetForm"
                    class="text-capitalize red darken-1"
                  >
                    Batal
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { VueNestable, VueNestableHandle } from 'vue-nestable'
import MenuForm from '@/components/forms/Menu'

export default {
  components: {
    MenuForm,
    VueNestable,
    VueNestableHandle
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
      items: [],
    }
  },

  computed: {
    ...mapState('menus', {
      menus: state => state.menus,
      menu : state => state.menu
    }),
    ...mapGetters('menus', ['getParentChild'])
  },

  watch: {},

  created() {
    this.get()
  },

  methods: {
    get(){
      this.loading = true
      this.$store.commit('menus/CLEAR_DATA')
      this.$store.dispatch('menus/get', { 'options' : this.options }).then( () => {
        this.items = this.getParentChild
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    doEdit(item){
      this.$store.commit('menus/ASSIGN_FORM', item)
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
          this.$store.commit('menus/ASSIGN_FORM', item)
          this.$store.dispatch('menus/delete').then( () => {
            this.items = this.getParentChild
          })
        }
      })
    },
    doSave(){
      this.loading = true
      this.$store.dispatch('menus/save').then( () => {
        this.$toastr.s("Data Berhasil disimpan")
        this.items = this.getParentChild
        this.loading = false
      }).catch((err) => {
        this.$store.commit("global/setErrors", err.response.data.errors)
        this.loading = false
      })
    },
    resetForm(){
      this.$store.commit('menus/CLEAR_FORM')
    }
  }
}
</script>