import request from '@/util/request'

const state = {
    employees : [],
    employee: {
        employee_id : '',
        nip: '',
        nuptk: '',
        sk: '',
        effective_start_date: '',
        effective_end_date: '',
        status: ''
    },
    profile: {
        user_profile_id: '',
        nik: '',
        kk: '',
        npwp: '',
        first_name: '',
        last_name: '',
        mobile_number: '',
        phone_no: '',
        place_of_birth:'',
        date_of_birth:'',
        gender: '',
        religion:'',
        job: '',
        blood_type: '',
        salary: '',
        graduated: '',
        profile_image: '',
        effective_start_date: '',
        effective_end_date : '',
        title_first: '',
        title_last: '',
        status: '',
        marriage_status : '',
        citizenship: '',
        country: '',
        email: ''
    },
    totalEmployees: 0,
    totalPageEmployees: 0
}

const mutations = {
    ASSIGN_DATA(state, payload) {
        state.employees = payload.data
        if ('total' in payload) state.totalEmployees = payload.total
        if ('last_page' in payload) state.totalPageEmployees = payload.last_page
    },
    CLEAR_DATA(state) {
        state.employees = []
    },
    CLEAR_FORM(state) {
        state.employee = {
            employee_id : '',
            nip: '',
            nuptk: '',
            sk: '',
            effective_start_date: '',
            effective_end_date: '',
            status: ''
        }
        state.profile = {
            user_profile_id: '',
            nik: '',
            kk: '',
            npwp: '',
            first_name: '',
            last_name: '',
            mobile_number: '',
            phone_no: '',
            place_of_birth:'',
            date_of_birth:'',
            gender: '',
            religion:'',
            job: '',
            blood_type: '',
            salary: '',
            graduated: '',
            profile_image: '',
            effective_start_date: '',
            effective_end_date : '',
            title_first: '',
            title_last: '',
            status: '',
            marriage_status : '',
            citizenship: '',
            country: '',
            email: ''
        }
    },
    ASSIGN_FORM(state, payload) {
        state.employee = {
            employee_id : payload.employee_id,
            nip: payload.nip,
            nuptk: payload.nuptk,
            sk: payload.sk,
            effective_start_date: payload.effective_start_date,
            effective_end_date: payload.effective_end_date,
            status: payload.status
        }
    },
    ASSIGN_FORM_PROFILE(state, payload) {
        state.profile = {
            user_profile_id: payload.user_profile_id,
            nik: payload.nik,
            kk: payload.kk,
            npwp: payload.npwp,
            first_name: payload.first_name,
            last_name: payload.last_name,
            mobile_number: payload.mobile_number,
            phone_no: payload.phone_no,
            place_of_birth:payload.place_of_birth,
            date_of_birth:payload.date_of_birth,
            gender: payload.gender,
            religion:payload.religion,
            job: payload.job,
            blood_type: payload.blood_type,
            salary: payload.salary,
            graduated: payload.graduated,
            profile_image: payload.profile_image,
            effective_start_date: payload.effective_start_date,
            effective_end_date : payload.effective_end_date,
            title_first: payload.title_first,
            title_last: payload.title_last,
            // status: payload.status,
            marriage_status : '',//payload.marriage_status,
            citizenship: payload.citizenship,
            country: payload.country,
            email: payload.email
        }
    },
}

const getters = {}

const actions = {
    get( { commit, rootState }, payload ) {
        const {
            sortBy,
            sortDesc,
            page,
            itemsPerPage
        } = payload.options

        let sort = []
        if (sortBy)
            sortBy.forEach(function(item, index) {
                let row = {
                    [item]: (sortDesc[index]) ? 'desc' : 'asc'
                }
                sort.push(row)
            })
        let schoolId = rootState.profiles.selectedSchool
        let header = {
            url : `/admin/employee?school_id=${schoolId}&per_page=${itemsPerPage}&page=${page}&order=${JSON.stringify(sort)}`,
            method: 'get',
        }
        return request(header).then( (resp) => {
            commit('ASSIGN_DATA', resp.data)
            return resp
        })
    },
    save( { state, rootState } ){
        let header = {
            url : `/admin/employee/save`,
            method: 'post',
            data: { 
                employee : { 
                    ...state.employee, 
                    jobs : rootState.classifications.multipleSelectedClassification.map( function (item) { 
                        return { classification_id : item.classification_id }
                    }) 
                },
                profile : state.profile,
                location : rootState.locations.location,
                school_id : rootState.profiles.selectedSchool
            }
        }
        return request(header).then( (resp) => {
            //commit('ASSIGN_DATA', resp)
            return resp
        })
    },
    getTeacher({rootState}) {
        let schoolId = rootState.profiles.selectedSchool
        let header = {
            url : `/admin/employee/teacher?school_id=${schoolId}`,
            method: 'get'
        }
        return request(header).then( (resp) => {
            return {
                data : resp.map( function (list) {
                    return {
                        employee_id : list.employee_id,
                        employee_full_name : list.profiles.first_name+ ' '+list.profiles.last_name
                    }
                })
            }
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}