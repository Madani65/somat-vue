<template>
  <v-app class="app">
    <app-drawer ref="drawer" class="app--drawer" />
    <v-main class="bggray">
      <breadcrumbs />
      <div class="page-wrapper mx-3">
        <transition name="scroll-y-transition">
          <router-view />
        </transition>
      </div>
      <v-footer padless class="mt-0">
        <v-col class="text-center py-1" cols="12">
          Sistem Enamlima Teknologi &copy; {{ new Date().getFullYear() }}
        </v-col>
      </v-footer>
    </v-main>
  </v-app>
</template>

<script>
import AppDrawer from "@/components/navbar/AppDrawer"
import Breadcrumbs from "@/components/Breadcrumbs"
export default {
  name: "Default",
  components: {
    AppDrawer,
    Breadcrumbs,
  },
}
</script>