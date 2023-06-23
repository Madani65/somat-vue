<template>
  <v-container class="pa-0  py-2">
    <v-row>
      <v-col cols="12" class="py-0">
        <v-select
          v-model="menu.parent_id"
          :items="getParent"
          label="Parent Menu"
          item-text="title"
          item-value="id"
          clearable
          :error-messages="errors['menu.parent_id']"
        >
          <template v-slot:item="data">
            <v-list-item-content>
              <v-list-item-title :class="'ml-'+data.item.level*8" v-text="data.item.title" />
            </v-list-item-content>
          </template>
        </v-select>
      </v-col>
      <v-col cols="12" class="py-0">
        <v-text-field
          v-model="menu.title"
          label="Title*"
          :error-messages="errors['menu.title']"
          required
        />
      </v-col>
      <v-col cols="12" class="py-0">
        <v-autocomplete
          v-model="menu.icon"
          :items="iconList"
          clearable
          :error-messages="errors['menu.icon']"
          item-text="name"
          item-value="name"
          prefix="mdi-"
          label="Icon"
        >
          <template v-slot:item="data">
            <v-list-item-icon>
              <v-icon>{{ 'mdi-'+data.item.name }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="data.item.name" />
            </v-list-item-content>
          </template>
        </v-autocomplete>
      </v-col>
      <v-col cols="12" class="py-0">
        <v-text-field
          v-model="menu.path"
          label="URL Path"
          :error-messages="errors['menu.path']"
          required
        />
      </v-col>
      <v-col cols="12" class="py-0">
        <v-text-field
          v-model="menu.permission"
          label="Permission"
          :error-messages="errors['menu.permission']"
          required
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import jsonIcon from '@/util/iconMdi'

export default {
  data(){
    return {
      iconList: jsonIcon
    }
  },
  created(){
    console.log(this.getParent)
  },
  computed: {
    ...mapState("global", ["errors"]),
    ...mapState('menus', {
      menu : state => state.menu,
      menus: state => state.menus
    }),
    ...mapGetters('menus', ['getParent'])
  }
}
</script>

<style>

</style>