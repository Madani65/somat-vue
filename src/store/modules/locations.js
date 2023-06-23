import request from '@/util/request'
// import * as dummy from "@/dummy"

const state = {
    location: {
        location_id: '',
        village_id: '',
        subdistrict_id: '',
        district_id: '',
        province_id: '',
        neighbourhood: '',
        hamlet: '',
        address: '',
        postal_code: '',
    },
    provinces: [],
    districts: [],
    subdistricts: [],
    villages: []
}

const mutations = {
    ASSIGN_FORM(state,payload) {
        state.location = {
            location_id: payload.location_id,
            village_id: payload.village_id,
            subdistrict_id: payload.subdistrict.subdistrict_id,
            district_id: payload.district.district_id,
            province_id: payload.province.province_id,
            neighbourhood: payload.neighbourhood,
            hamlet: payload.hamlet,
            address: payload.address,
            postal_code: payload.village.postal_code
        }
    },
    CLEAR_FORM(state) {
        state.location = {
            location_id: '',
            village_id: '',
            subdistrict_id: '',
            district_id: '',
            province_id: '',
            neighbourhood: '',
            hamlet: '',
            address: '',
            postal_code: '',
        }
    },
    ASSIGN_DATA(state, payload) {
        if(payload.type == 'province')
            state.provinces = payload.data
        else if(payload.type == 'district')
            state.districts = payload.data
        else if(payload.type == 'subdistrict')
            state.subdistricts = payload.data
        else if(payload.type == 'village')
            state.villages = payload.data
    }
}

const getters = {}

const actions = {
    get( {commit}, payload){
        let header = {
            url : `/admin/${payload.type}/${payload.value}`,
            method: 'get',
        }
        return request(header).then( (resp) => {
            commit('ASSIGN_DATA', {
                type: payload.type,
                data: resp.data
            })
            return resp
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}