<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs()">
      <template v-slot:divider>
        <v-icon v-text="divider" />
      </template>
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item :to="item.to" :disabled="item.disabled">
          <v-icon
            v-if="item.icon"
            size="24"
            class="mr-1"
            v-text="item.icon"
          />{{ item.text }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
  </div>
</template>

<script>
export default {
  data: () => ({
    divider: "mdi-chevron-right",
    bread: [],
  }),

  methods: {
    breadcrumbs() {
      const { matched } = this.$route
      const lists = []
      const currentPath = this.$route.path
      matched.forEach(function (route, index) {
        const before = index > 0 ? matched[index - 1] : matched[index]
        const to =
          index === matched.length - 1
            ? currentPath
            : route.path || route.redirect
        const text = route.meta.title
        const icon = index === 0 ? route.meta.icon : null

        const list = {
          text: text,
          to: to,
          icon: icon,
          exact: true,
          disabled: false,
        }

        if (index == 0 || before.meta.title != text) lists.push(list)
      })

      return lists
    },
  },
}
</script>