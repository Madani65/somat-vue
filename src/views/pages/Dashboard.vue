<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card elevation="1">
          <v-card-title>Dashboard</v-card-title>
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
      <v-col cols="12" md="8">
        <v-row>
          <v-col cols="12">
            <v-card elevation="3">
              <v-card-title class="justify-center py-1 greenheader white--text">
                Laporan Hasil Belajar Siswa
              </v-card-title>
              <v-card-text class="py-0">
                <apexchart
                  ref="hasilBelajar"
                  height="300"
                  width="100%"
                  type="bar"
                  :options="chart.hasilBelajar.options"
                  :series="chart.hasilBelajar.series"
                />
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card elevation="3">
              <v-card-title class="justify-center py-1 greenheader white--text">
                Persentase Kehadiran
              </v-card-title>
              <v-card-text class="py-4">
                <apexchart
                  ref="absensi"
                  height="335"
                  type="donut"
                  :options="chart.absensi.options"
                  :series="chart.absensi.series"
                />
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card elevation="3">
              <v-card-title class="justify-center py-1 greenheader white--text">
                Laporan Hasil Nilai Ujian Siswa
              </v-card-title>
              <v-card-text class="py-0">
                <v-row class="py-3">
                  <v-col cols="12">
                    <v-autocomplete
                      v-model="mapelUjianSelected"
                      :items="mapelUjian()"
                      label="Mata Pelajaran"
                      hide-details="true"
                      item-text="name"
                      item-value="value"
                      dense
                      outlined
                      @change="calcNilaiUjian()"
                    />
                  </v-col>
                </v-row>
                <apexchart
                  ref="nilaiUjian"
                  height="255"
                  type="line"
                  :series="chart.nilaiUjian.series"
                  :options="chart.nilaiUjian.options"
                />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="4">
        <v-row>
          <v-col cols="12">
            <v-card elevation="3">
              <v-card-title class="justify-center py-1 greenheader white--text">
                Upcoming Event & Deadline
              </v-card-title>
              <v-card outlined class="ma-2">
                <v-date-picker
                  v-model="dateSelected"
                  :no-title="true"
                  :events="doEvents"
                  full-width
                  locale="id-id"
                  color="success"
                />
              </v-card>
              <v-list dense class="py-0">
                <template v-for="(event, i) in events" two-line>
                  <v-divider :key="event.title" />
                  <v-list-item :key="i">
                    <v-list-item-content>
                      <v-list-item-title
                        v-if="event.start == event.end"
                      >
                        {{ new Date(event.start) | dateFormat('DD MMM YYYY') }}
                      </v-list-item-title>
                      <v-list-item-title
                        v-if="event.start < event.end"
                      >
                        {{ new Date(event.start) | dateFormat('DD MMM YYYY') }} s.d. {{ new Date(event.end) | dateFormat('DD MMMM YYYY') }}
                      </v-list-item-title>
                      <v-list-item-subtitle v-text="event.title" />
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-list>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card elevation="3">
              <v-card-title class="py-1 greenheader justify-center white--text">
                Berita Terbaru
              </v-card-title>
              <v-list dense class="py-0">
                <template v-for="(event, i) in news" two-line>
                  <v-divider :key="event.title" />
                  <v-list-item :key="i" @click="showNews(i)">
                    <v-list-item-content>
                      <v-list-item-title
                        class="text-normal"
                        v-text="event.title"
                      />
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts"
import * as dummy from "@/dummy"
import Util from "@/util"

export default {
  components: {
    apexchart: VueApexCharts,
  },

  data() {
    return {
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
      mapelUjianSelected: "MTK",
      minUjian: null,
      maxUjian: null,
      allNilaiUjian: {},
      dateSelected: new Date().toISOString().substr(0, 10),
      eventCategories: [],
      eventColors: [],
      events: [],
      news: [],
      chart: {
        hasilBelajar: {
          options: {
            chart: {
              toolbar: {
                show: false,
              },
            },
            plotOptions: {
              bar: {
                horizontal: false,
                endingShape: "rounded",
                columnWidth: "70%",
              },
            },
            dataLabels: {
              enabled: true,
            },
            stroke: {
              show: true,
              width: 2,
              colors: ["transparent"],
            },
            colors: ["#0072BE"],
            xaxis: {
              categories: [],
            },
            legend: {
              offsetY: -10,
            },
            yaxis: {
              title: {
                text: "Nilai",
                style: {
                  fontSize: "12px",
                  fontWeight: "400",
                },
              },
            },
            fill: {
              opacity: 0.8,
            },
          },
          series: [],
        },
        absensi: {
          options: {
            legend: {
              show: true,
              position: "bottom",
              horizontalAlign: "center",
              verticalAlign: "middle",
              floating: false,
              fontSize: "14px",
              offsetX: 0,
              offsetY: 7,
            },
            colors: ["#3CBE6D", "#FACA42", "#F05857", "#2773C1"],
            tooltip: {
              y: {
                formatter(val) {
                  return val + " Hari"
                },
              },
            },
            labels: [],
          },
          series: [],
        },
        nilaiUjian: {
          options: {
            chart: {
              zoom: {
                enabled: false,
              },
              toolbar: {
                show: false,
              },
            },
            colors: ["#4fc6e1"],
            dataLabels: {
              enabled: true,
              style: {
                fontSize: "11px",
                fontWeight: "300",
              },
            },
            stroke: {
              width: [3, 3],
              curve: "straight",
            },
            grid: {
              row: {
                colors: ["transparent", "transparent"], // takes an array which will be repeated on columns
                opacity: 0.9,
              },
              borderColor: "#f1f3fa",
            },
            markers: {
              style: "inverted",
              size: 6,
            },
            xaxis: {
              categories: [],
              title: {
                text: "Jenis Ujian",
                style: {
                  fontWeight: "400",
                },
              },
            },
            yaxis: {
              title: {
                text: "Nilai",
                style: {
                  fontSize: "12px",
                  fontWeight: "400",
                },
              },
              min: 0,
              max: 100,
            },
            legend: {
              position: "top",
              horizontalAlign: "right",
              floating: true,
              offsetY: -25,
              offsetX: -5,
            },
            annotations: {
              position: "front",
              texts: [],
            },
          },
          series: [],
        },
      },
    }
  },
  mounted() {
    this.getHasilBelajar()
    this.getAbsensi()
    this.getEvents()
    this.getNews()
    this.calcNilaiUjian()
    this.processEventCat()
    this.processEventColor()
  },
  methods: {
    getHasilBelajar() {
      const data = dummy.dashboard.hasilBelajar
      this.chart.hasilBelajar.series = [
        Util.getMultipleDataSeries("Nilai Mata Pelajaran", data),
      ]
      this.$refs.hasilBelajar.updateOptions({
        xaxis: {
          categories: Util.getSingleDataSeries(data),
        },
      })
    },
    getAbsensi() {
      const data = dummy.dashboard.absensi
      this.chart.absensi.series = Util.getSingleDataSeries(data, "value")
      this.$refs.absensi.updateOptions({
        labels: Util.getSingleDataSeries(data),
      })
    },
    getEvents() {
      this.events = dummy.dashboard.events
    },
    getNews() {
      this.news = dummy.dashboard.news
    },
    mapelUjian() {
      return Object.entries(this.allNilaiUjian).map((row) => {
        return {
          value: row[0],
          name: row[0],
        }
      })
    },
    calcNilaiUjian() {
      this.allNilaiUjian = dummy.dashboard.nilaiUjian
      let min = 100
      let max = 0
      let minText, maxText
      this.allNilaiUjian[this.mapelUjianSelected].forEach(function (data) {
        if (data.value <= min) {
          min = data.value
          minText = min + " (" + data.type + ")"
        }
        if (data.value >= min) {
          max = data.value
          maxText = max + " (" + data.type + ")"
        }
      })
      this.chart.nilaiUjian.series = [
        Util.getMultipleDataSeries(
          "Nilai Ujian",
          dummy.dashboard.nilaiUjian[this.mapelUjianSelected],
          "value"
        ),
      ]
      this.chart.nilaiUjian.options.xaxis.categories = Util.getSingleDataSeries(
        dummy.dashboard.nilaiUjian[this.mapelUjianSelected]
      )
      this.chart.nilaiUjian.options = {
        ...this.chart.nilaiUjian.options,
        ...{
          annotations: {
            position: "front",
            texts: [
              {
                x: 170,
                y: 10,
                text: "Terendah : " + minText,
                foreColor: "#F40000",
              },
              {
                x: 50,
                y: 10,
                text: "Tertinggi : " + maxText,
                foreColor: "#34AA40",
              },
            ],
          },
        },
      }
    },
    processEventCat() {
      const lists = []
      dummy.dashboard.eventCategories.forEach(function (data) {
        lists["cat" + data.id] = data.color
      })
      this.eventCategories = lists
    },
    processEventColor() {
      const ArrColor = this.eventCategories
      const color = []
      dummy.dashboard.events.forEach(function (data) {
        for (
          let d = new Date(data.start);
          d <= new Date(data.end);
          d.setDate(d.getDate() + 1)
        ) {
          const date = d.toISOString().substr(0, 10)
          if (typeof color[date] === "undefined") {
            color[date] = []
          }
          color[date].push(ArrColor["cat" + data.categoryId])
        }
      })

      this.eventColors = color
    },
    doEvents(date) {
      return this.eventColors[date]
    },
    showNews(i) {
      this.$toastr.i(this.news[i].title)
      // this.$router.push("magazines/news");
    },
  },
}
</script>
