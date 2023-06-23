<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    if (typeof window !== undefined && window._VMA === undefined) {
      window._VMA = this
    }
  },
  created() {
    this.$on('SHOW_TOASTR', (e) => {
      if( e.type === 'e' )this.$toastr.e(e.text)
      else if( e.type === 's' )this.$toastr.s(e.text)
      else if( e.type === 'i' )this.$toastr.i(e.text)
    })
    this.$on('AUTH_FAILED', () => {
      this.$store.commit('auth/SET_ACCESS_TOKEN', null)
      this.$toastr.e('Auth Failed')
      this.$router.push({
        path: '/auth/login',
        query: {
          redirect: this.$route.path
        }
      })
    })
    this.$on('SERVER_ERROR', (e) => {
      this.$toastr.e('Server Error: '+e.text)
    })
    this.$on('API_FAILED', (e) => {
      console.log(e)
    })
    const token = this.$store.getters['auth/getAccessToken']
    if (token) {
      this.$store.dispatch('auth/rolemenu')
    }
  }
}
</script>