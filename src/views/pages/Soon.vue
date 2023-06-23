<template>
  <v-app class="exception">
    <v-container
      fluid
      fill-height
    >
      <v-layout
        align-center
        justify-center
        row
        pa-3
      >
        <div class="text-md-center">
          <h1>Coming Soon</h1>
          <h2 class="my-3 headline">
            Sorry, the page is under Construction.
          </h2>
          <div>
            <v-btn
              small
              color="primary"
              @click="goHome"
            >
              Go Home
            </v-btn>
          </div>
        </div>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    model: 0,
    colors: ["primary", "secondary", "yellow darken-2", "red", "orange"],
  }),

  methods: {
    goHome() {
      this.$router.push({ path: "/" })
    },
  },
}
</script>

<style lang="sass">
h1
    font-size: 40px
    line-height: 80px
    font-weight: 700
    color: #252932
    text-shadow: rgba(61, 61, 61, 0.3) 1px 1px, rgba(61, 61, 61, 0.2) 2px 2px, rgba(61, 61, 61, 0.3) 3px 3px
.v-application--wrap
    min-height: calc(100vh - 400px)
</style>