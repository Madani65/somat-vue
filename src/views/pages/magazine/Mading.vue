<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card elevation="1">
          <v-card-title>Mading Sekolah</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6" class="pt-0">
                <v-autocomplete
                  v-model="school"
                  :items="schoolList"
                  label="Nama Sekolah"
                  item-text="name"
                  item-value="id"
                  hide-details="auto"
                />
              </v-col>
              <v-col cols="12" md="6" class="pt-0">
                <v-autocomplete
                  v-model="period"
                  :items="periodList"
                  label="Tahun Ajaran"
                  item-text="name"
                  item-value="id"
                  hide-details="auto"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card elevation="3">
          <v-card-title class="py-1 greenheader white--text">
            Berita Utama & Fokus
          </v-card-title>
          <v-card-text class="py-2">
            <splide :options="options">
              <splide-slide v-for="(news, i) in slideNews" :key="i">
                <v-card outlined elevation="0">
                  <v-img :lazy-src="news.src" :src="news.src" height="250px">
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          color="grey lighten-5"
                        />
                      </v-row>
                    </template>
                  </v-img>
                  <v-card-subtitle v-text="news.headline" />
                </v-card>
              </splide-slide>
            </splide>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="8">
        <v-card>
          <v-card-text class="py-0">
            <template v-for="(news, i) in blogNews">
              <v-list :key="i" three-line>
                <v-list-item>
                  <v-list-item-avatar tile width="120" height="80">
                    <v-img :src="news.src" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-subtitle v-text="news.date" />
                    <v-list-item-title class="py-0" v-text="news.headline" />
                    <v-list-item-subtitle v-text="news.content" />
                  </v-list-item-content>
                </v-list-item>
                <v-divider />
              </v-list>
            </template>
            <div class="text-center py-3">
              <v-pagination
                v-model="blogPage"
                :length="15"
                :total-visible="7"
              />
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <template v-for="(cat, i) in catNews">
          <v-card :key="i" elevation="3" class="mb-3">
            <v-card-title
              class="py-1 greenheader white--text"
              v-text="cat.name"
            />
            <v-list dense class="py-0">
              <template v-for="(news, j) in cat.news">
                <v-list-item :key="j">
                  <v-list-item-content>
                    <v-list-item-title
                      class="text-normal cursor-pointer"
                      v-text="news.title"
                    />
                  </v-list-item-content>
                </v-list-item>
                <v-divider :key="news.title" />
              </template>
            </v-list>
          </v-card>
        </template>
        <v-card outlined elevation="3">
          <v-card-title class="py-1 greenheader white--text">
            Kumpulan Foto
          </v-card-title>
          <v-card-text>
            <splide :options="optionsPhoto">
              <splide-slide v-for="(news, i) in slideNews" :key="i">
                <v-card outlined elevation="0" class="pt-3">
                  <v-img :lazy-src="news.src" :src="news.src" height="250px">
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          color="grey lighten-5"
                        />
                      </v-row>
                    </template>
                  </v-img>
                </v-card>
              </splide-slide>
            </splide>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import * as dummy from "@/dummy"

export default {
  data: () => ({
    school: 1,
    schoolList: [
      { id: 1, name: "SMP Karya Anak Bangsa" },
      { id: 2, name: "SMP Karya Anak Negeri" },
      { id: 3, name: "SMP Karya Anak Prestasi" },
      { id: 4, name: "SMP Karya Anak Tetangga" },
    ],
    period: 2020,
    periodList: [
      { id: 2019, name: "2019/2020" },
      { id: 2020, name: "2020/2021" },
    ],
    slideNews: [],
    blogNews: [],
    blogPage: 1,
    catNews: [],
    options: {
      rewind: true,
      perPage: 4,
      gap: "1rem",
      autoplay: true,
      breakpoints: {
        1600: {
          perPage: 3,
          gap: "1rem",
        },
        960: {
          perPage: 2,
          gap: "1rem",
        },
        640: {
          perPage: 1,
          gap: "1rem",
        },
      },
    },
    optionsPhoto: {
      rewind: true,
      perPage: 1,
      gap: "1rem",
      autoplay: true,
    },
  }),

  created() {
    this.getSlideNews()
    this.getBlogNews()
    this.getCatNews()
  },

  methods: {
    getSlideNews() {
      this.slideNews = dummy.mading.slideNews
    },
    getBlogNews() {
      this.blogNews = dummy.mading.blogNews
    },
    getCatNews() {
      this.catNews = dummy.mading.catNews
    },
  },
  head: {
    title: "Magazines",
  },
  layout: "dashboard",
}
</script>
