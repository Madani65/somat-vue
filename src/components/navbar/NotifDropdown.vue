<template>
  <div class="text-center">
    <v-menu offset-y transition="scroll-y-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          text
          icon
          dark
          small
          v-bind="attrs"
          class="mx-4"
          v-on="on"
        >
          <v-badge
            :content="messages.length"
            :value="messages.length"
            color="red"
            overlap
          >
            <v-icon dark>
              mdi-bell
            </v-icon>
          </v-badge>
        </v-btn>
      </template>
      <v-card max-width="375">
        <v-list dense>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="subtitle-2">
                Notifikasi
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn text icon small>
                <v-icon>mdi-cog</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider />
          <template v-for="(item, i) in messages">
            <v-list-item :key="i" two-line @click="doClickMenu(i)">
              <v-list-item-avatar size="28">
                <v-icon v-if="item.icon" v-text="item.icon" />
                <v-img v-else-if="item.avatar" :src="item.avatar" />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="item.text" />
                <v-list-item-subtitle v-text="item.times" />
              </v-list-item-content>
            </v-list-item>
            <v-divider :key="item.text" />
          </template>
        </v-list>
        <v-btn
          block
          text
          class="text-capitalize pb-2"
          color="primary"
        >
          Lihat Semua Notifikasi
        </v-btn>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "NotifDropdown",
  data: () => ({
    // messages: 3,
    messages: [
      {
        text: "David telah mengirim Anda link tugas",
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        times: "10 Minutes Ago",
      },
      {
        text: "Status Absen Anda hadir dalam kelas Matematika",
        icon: "mdi-fingerprint",
        times: "10 Minutes Ago",
      },
      {
        text: "Ronalda mengirimkan pesan untuk Anda",
        avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
        times: "11 Minutes Ago",
      },
    ],
  }),

  methods: {
    doClickMenu(i) {
      this.$toastr.i("Notif " + this.messages[i].text)
    },
  },
}
</script>
