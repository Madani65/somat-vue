<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      :style="{ background: '#3CBE6D' }"
      dark
      :mini-variant.sync="mini"
      width="300"
    >
      <v-subheader :style="{ background: '#36AE64' }">
        Menu Navigasi
      </v-subheader>
      <v-list nav dense>
        <template v-for="(item, key) in getMenuParentChild">
          <template v-if="item.children && item.children.length > 0">
            <v-list-group
              :key="key"
              :prepend-icon="'mdi-'+item.icon"
              no-action
              active-class="white--text"
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title" />
                </v-list-item-content>
              </template>

              <template v-for="(subitem, index) in item.children">
                <template
                  v-if="subitem.children && subitem.children.length > 0"
                >
                  <v-list-group
                    :key="index"
                    sub-group
                    no-action
                    active-class="white--text"
                  >
                    <template v-slot:activator>
                      <v-list-item-content>
                        <v-list-item-title v-text="subitem.title" />
                      </v-list-item-content>
                    </template>

                    <v-list-item
                      v-for="subsubitem in subitem.children"
                      :key="subsubitem.title"
                      :to="subsubitem.path"
                      active-class="white--text"
                    >
                      <v-list-item-content>
                        <v-list-item-title v-text="subsubitem.title" />
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-group>
                </template>
                <template v-else>
                  <v-list-item
                    v-show="!subitem.hiddenInMenu"
                    :key="index"
                    :to="subitem.path"
                    active-class="white--text"
                  >
                    <v-list-item-content>
                      <v-list-item-title v-text="subitem.title" />
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </template>
            </v-list-group>
          </template>
          <template v-else>
            <v-list-item
              v-show="!item.hiddenInMenu"
              :key="key"
              :to="item.path"
              active-class="white--text"
            >
              <v-list-item-icon>
                <v-icon v-if="item.icon">
                  {{ 'mdi-'+item.icon }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.title" />
              </v-list-item-content>
            </v-list-item>
          </template>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
      :style="{ background: '#6A6A6A' }"
      dark
    >
      <v-app-bar-nav-icon @click="toggleDrawer" />
      <v-icon class="mx-4 hidden-sm-and-down">
        mdi-star
      </v-icon>
      <v-toolbar-title class="mr-12 align-center hidden-xs-only">
        <span class="hidden-sm-and-down">School Management</span>
      </v-toolbar-title>
      <div class="flex-grow-1" />
      <notif-dropdown />
      <lang-dropdown />
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            icon
            class="hidden-sm-and-down"
            v-on="on"
            @click="handleFullScreen()"
          >
            <v-icon>mdi-fullscreen</v-icon>
          </v-btn>
        </template>
        <span>Mode Fullscreen</span>
      </v-tooltip>
      <user-dropdown />
    </v-app-bar>
  </div>
</template>
<script>
import Util from "@/util"
import { mapGetters } from 'vuex'
import NotifDropdown from "@/components/navbar/NotifDropdown"
import LangDropdown from "@/components/navbar/Language"
import UserDropdown from "@/components/navbar/UserDropdown"

export default {
  name: "AppDrawer",
  components: {
    UserDropdown,
    LangDropdown,
    NotifDropdown,
  },
  data() {
    return {
      mini: false,
      drawerWidth: 256,
      drawer: null,
      scrollSettings: {
        maxScrollbarLength: 160,
      },
      menu: false,
    }
  },

  computed: {
    ...mapGetters('auth', ['getMenuParentChild'])
  },

  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer
    },
    handleFullScreen() {
      Util.toggleFullScreen()
    },
  },
}
</script>
<style lang="scss">
.app--drawer {
  .v-list-item__icon, .v-list-group__header__prepend-icon {
    margin-right: 1rem !important;
  }
}
</style>
