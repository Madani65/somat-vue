<template>
  <v-app class="layout-auth primary">
    <v-main>
      <v-container fill-height>
        <v-row class="container-login mx-auto rounded-lg" no-gutters>
          <v-col cols="12" md="6" class="hidden-sm-and-down">
            <v-img
              :src="require('@/assets/images/bg-1.png')"
              position="bottom center"
            />
          </v-col>
          <v-col cols="12" md="6" class="pa-4">
            <v-container fill-height>
              <v-row>
                <v-col cols="12">
                  <router-view :key="$route.path" />
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({}),

  methods: {},
}
</script>
<style lang="scss" scoped>
.layout-auth {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;

  .container-login {
    background-color: #fff;
    max-width: 980px !important;
    overflow: hidden;
    border: 1px solid #E2E2E2;
  }
  
  @media only screen and (max-width: 960px) {
    .v-main {
      background: url("../../assets/images/bg-1.png") bottom center;
    }

    .container-login {
      background-color: transparent;
      border: none;
    }
  }
}
</style>
