<template>
  <v-container class="px-0 py-2">
    <v-row>
      <v-col cols="12" class="my-3">
        <span class="title px-4">{{ title }}</span>
      </v-col>
    </v-row>
    <v-card>
      <v-card-text class="pb-6">
        <v-row>
          <v-col cols="12" md="6" class="pt-0">
            <v-autocomplete
              v-model="provinceSelected"
              :items="provinces"
              label="Provinsi"
              hide-details="auto"
              item-text="province_name"
              item-value="province_id"
            />
          </v-col>
          <v-col cols="12" md="6" class="pt-0">
            <v-autocomplete
              v-model="districtSelected"
              :items="districts"
              label="Kabupaten/Kota"
              hide-details="auto"
              item-text="district_name"
              item-value="district_id"
            />
          </v-col>
          <v-col cols="12" md="6" class="pt-0">
            <v-autocomplete
              v-model="subdistrictSelected"
              :items="subdistricts"
              label="Kecamatan"
              hide-details="auto"
              item-text="subdistrict_name"
              item-value="subdistrict_id"
            />
          </v-col>
          <v-col cols="12" md="6" class="pt-0">
            <v-autocomplete
              v-model="villageSelected"
              :items="villages"
              label="Desa/Kelurahan"
              hide-details="auto"
              item-text="village_name"
              item-value="village_id"
            />
          </v-col>
          <v-col cols="12" class="pt-0">
            <v-textarea
              v-model="location.address"
              label="Alamat"
              hide-details="auto"
              auto-grow
              rows="1"
            />
          </v-col>
          <v-col cols="12" md="4" class="pt-0">
            <v-text-field
              v-model="location.hamlet"
              label="RT"
              hide-details="auto"
              type="number"
            />
          </v-col>
          <v-col cols="12" md="4" class="pt-0">
            <v-text-field
              v-model="location.neighbourhood"
              label="RW"
              hide-details="auto"
              type="number"
            />
          </v-col>
          <v-col cols="12" md="4" class="pt-0">
            <v-text-field
              v-model="location.postal_code"
              label="Kode Pos"
              hide-details="auto"
              type="number"
              readonly
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    title: {
      type: String,
      default: 'Alamat Sekolah'
    }
  },
  data() {
    return {
      
    }
  },
  computed: {
    ...mapState("global", ["errors"]),
    ...mapState('locations', {
      location : state => state.location,
      provinces : state => state.provinces,
      districts : state => state.districts,
      subdistricts : state => state.subdistricts,
      villages : state => state.villages,
    }),
    provinceSelected: {
      get: function () {
        return this.location.province_id
      },
      set: function (value) {
        this.location.province_id = value
      }
    },
    districtSelected: {
      get: function () {
        return this.location.district_id
      },
      set: function (value) {
        this.location.district_id = value
      }
    },
    subdistrictSelected: {
      get: function () {
        return this.location.subdistrict_id
      },
      set: function (value) {
        this.location.subdistrict_id = value
      }
    },
    villageSelected: {
      get: function () {
        return this.location.village_id
      },
      set: function (value) {
        let selected = this.villages.filter( function(item) { return item.village_id == value})
        this.location.postal_code = selected[0].postal_code
        this.location.village_id = value
      }
    }
  },
  watch: {
    provinceSelected(val){
      if (val) this.get('district', val)
    },
    districtSelected(val){
      if (val) this.get('subdistrict', val)
    },
    subdistrictSelected(val){
      if (val) this.get('village', val)
    },
  },
  created() {
    this.get('province', 62)
    if(this.provinceSelected) this.get('district', this.provinceSelected)
    if(this.districtSelected) this.get('subdistrict', this.districtSelected)
    if(this.subdistrictSelected) this.get('village', this.subdistrictSelected)
  },
  methods: {
    get(type, value){
      this.$store.dispatch('locations/get', { type : type, value: value })
    },
    setPostalCode(code){
      this.location.postal_code = code
    }
  }
}
</script>

<style>

</style>