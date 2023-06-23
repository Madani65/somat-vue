<template>
  <div>
    <v-card
      elevation="1"
    >
      <v-card-title>Pengaturan Akun</v-card-title>
      <v-container class="pt-0">
        <v-row>
          <v-col cols="12">
            <v-data-table
              v-model="itemSelected"
              item-key="template_id"
              :headers="headers"
              :items="users"
              :footer-props="{
                showFirstLastPage: true,
                itemsPerPageOptions: [2,5,10,15,20,-1],
                showCurrentPage:true
              }"
              class="header-table-blue"
              :loading="loading"
              loading-text="Loading... Please wait"
            >
              <template v-slot:[`item.full_name`]="{ item }">
                {{ item.first_name + ' ' + item.last_name }}
              </template>
              <template v-slot:[`item.roles`]="{ item }">
                <v-chip
                  small
                  v-for="(row, key) in item.roles"
                  :key="key"
                >
                  {{ row }}
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
                        </v-icon> Edit {{ item.username }}
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
  data() {
    return {
      dialogForm : false,
      editingIndex : -1,
      options: {},
      loading: false,
      itemSelected: [],
      headers: [
        { text: 'Nama Pengguna', value: 'full_name', sortable: true },
        { text: 'Username', value: 'username', sortable: true },
        { text: 'Email', value: 'email', sortable: true },
        { text: 'User Role', value: 'roles', sortable: true },
        { text: 'Terakhir Dilihat', value: 'last_login', sortable: true },
        { text: 'Kontrol', value: 'actions', sortable: false },
      ],
    }
  },

  computed: {
    ...mapState('users', {
      users: state => state.users,
      user : state => state.user,
      totalUsers: state => state.totalUsers,
      totalPageUsers: state => state.totalPageUsers
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
    this.get()
  },

  methods: {
    get(){
      this.loading = true
      this.$store.commit('users/CLEAR_DATA')
      this.$store.dispatch('users/get', { 'options' : this.options }).then( () => {
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    doEdit(item){
      this.dialogForm = true
      this.$store.commit('users/ASSIGN_FORM', item)
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
          this.$store.commit('users/ASSIGN_FORM', item)
          this.$store.dispatch('users/delete').then( () => {
            this.loading = false
          })
        }
      })
    },
    doSave(){
      this.loading = true
      this.$store.dispatch('users/save').then( () => {
        this.$toastr.s("Data Berhasil disimpan")
        this.loading = false
        this.dialogForm = false
      }).catch((err) => {
        this.$store.commit("global/setErrors", err.response.data.errors)
        this.loading = false
      })
    },
    closeForm(){
      this.$store.commit('users/CLEAR_FORM')
      this.dialogForm = false
    }
  }
}
</script>

<style>

</style>