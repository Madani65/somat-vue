<template>
  <div class="text-center">
    <v-menu
      offset-y
      transition="scroll-y-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <span
          class="hidden-xs-only"
        >Selamat Datang,
          {{
            profile.user_profile
              ? profile.user_profile.first_name
              : profile.username
          }}</span>
        <v-avatar>
          <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg" />
        </v-avatar>
        <v-btn
          text
          icon
          dark
          small
          v-bind="attrs"
          v-on="on"
        >
          <v-icon
            dark
            size="16"
          >
            mdi-chevron-down
          </v-icon>
        </v-btn>
      </template>
      <v-card max-width="275">
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <v-img
                src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
              />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title
                v-text="
                  profile.user_profile
                    ? profile.user_profile.first_name +
                      ' ' +
                      profile.user_profile.last_name
                    : profile.email
                "
              />
              <v-list-item-subtitle v-text="profile.username" />
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider />
        <v-list dense>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            color="primary"
            @click="doClickMenu(i)"
          >
            <v-list-item-icon>
              <v-icon
                color="#3CBE6D"
                v-text="item.icon"
              />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "UserDropdown",
  data() {
    return {
      profile: {
        user_profile: {
          first_name: "Lionel",
          last_name: "Messi",
          email: "lionel@gmail.com",
        },
      },
      items: [
        { text: "Profile Saya", icon: "mdi-account" },
        { text: "Ubah Password", icon: "mdi-account-lock" },
        { text: "Switch Account", icon: "mdi-account-switch" },
        { text: "Pengaturan", icon: "mdi-account-cog" },
        { text: "Keluar", icon: "mdi-power-standby" },
      ],
    }
  },

  created(){
    this.$store.dispatch('profiles/setProfiles')
    this.getAcademicYear()
  },

  methods: {
    async getAcademicYear(){
      let resp = await this.$store.dispatch('periodacademic/get')
      let active = await resp.data.data.filter( function(data) {
        return data.active_flag == 'Y'
      })

      this.$store.commit('profiles/ASSIGN_ACADEMIC_YEAR', { data : resp.data.data, academic_year_id : active[0].academic_year_id })
    },
    doClickMenu(i) {
      // this.$toaste.success('Click ' + this.items[i].text)
      if (this.items[i].text === "Keluar") {
        this.doLogout()
      }
    },
    doLogout() {
      this.$swal({
        title: "Anda Yakin?",
        text: "Untuk keluar dari Aplikasi",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
      }).then((result) => {
        if (result.value) {
          if (result.value) {
            this.$store.dispatch('auth/logout')
            this.$router.push('/auth/login')
          }
        }
      })
    },
  },
}
</script>

<style>
</style>
