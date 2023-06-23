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
              v-model="location.province_id"
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
              :error-messages="getErrorMessage(errorKey+'.village_id')"
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
import { mapGetters, mapState } from 'vuex'
export default {
  props: {
    value: {
      type: Object,
      default: null
    },
    title: {
      type: String,
      default: 'Alamat Sekolah'
    },
    errorKey: {
      type: String,
      default: 'location'
    }
  },
  data() {
    return {
      provinces: [],
      districts: [],
      subdistricts: [],
      villages: []
    }
  },
  computed: {
    ...mapState("global", ["errors"]),
    // ...mapState('locations', ['provinces','districts','subdistricts','villages'] ),
    ...mapGetters('global', ['getErrorMessage']),
    provinceSelected: {
      get: function () {
        return this.location.province_id
      },
      set: function (value) {
        this.location.province_id = value
        this.doReset('district')
        this.doReset('subdistrict')
        this.doReset('village')
      }
    },
    districtSelected: {
      get: function () {
        return this.location.district_id
      },
      set: function (value) {
        this.location.district_id = value
        this.doReset('subdistrict')
        this.doReset('village')
      }
    },
    subdistrictSelected: {
      get: function () {
        return this.location.subdistrict_id
      },
      set: function (value) {
        this.location.subdistrict_id = value
        this.doReset('village')
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
    },
    location() { return this.value }
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
    }
  },
  created() {
    this.get('province', 62)
    if(this.provinceSelected) this.get('district', this.provinceSelected)
    if(this.districtSelected) this.get('subdistrict', this.districtSelected)
    if(this.subdistrictSelected) this.get('village', this.subdistrictSelected)
  },
  methods: {
    get(type, value){
      this.$store.dispatch('locations/get', { type : type, value: value }).then( (resp) => {
        if(type == 'province')
          this.provinces = resp.data
        else if(type == 'district')
          this.districts = resp.data
        else if(type == 'subdistrict')
          this.subdistricts = resp.data
        else if(type == 'village')
          this.villages = resp.data
      })
    },
    setPostalCode(code){
      this.location.postal_code = code
    },
    doReset(type) {
      if(type == 'province'){
        this.provinces = []
        this.location.province_id = ''
      }
      else if(type == 'district'){
        this.districts = []
        this.location.district_id = ''
      }
      else if(type == 'subdistrict'){
        this.subdistricts = []
        this.location.subdistrict_id = ''
      }
      else if(type == 'village'){
        this.villages = []
        this.location.village_id = ''
      }
    },
  }
}
</script>

<style>

</style>