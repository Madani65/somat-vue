const state = {
    roles : [],
    schools: [],
    childrens: [],
    periodYears: [],
    selectedRole: '',
    selectedSchool: '',
    selectedChildren: '',
    selectedSchoolLevel: '',
    selectedAcademicYear: '',
}

const mutations = {
    ASSIGN_ROLES(state, payload) {
        state.roles = payload
        state.selectedRole = payload.length ? payload[0].role_id : ''
    },
    ASSIGN_SCHOOLS(state, payload) {
        state.schools = payload
        if(!state.selectedSchool) {
            state.selectedSchool = payload.length ? payload[0].school_id : ''
            state.selectedSchoolLevel = payload.length ? payload[0].school_level_id : ''
        }
    },
    UPDATE_SCHOOL(state, payload){
        state.schools.some( function (a) {
            if(a.school_id === payload.school_id){
                state.schools.splice(state.schools.indexOf(a), 1, payload )
                return true
            }
        })
    },
    PUSH_SCHOOL(state, payload){
        state.schools.push(payload)
    },
    ASSIGN_CHILDRENS(state, payload) {
        state.childrens = payload
        if(!state.selectedChildren)
            state.selectedChildren = payload.length ? payload[0].student_id : ''
    },
    ASSIGN_ACADEMIC_YEAR(state, payload) {
        state.periodYears = payload.data
        if(!state.selectedAcademicYear)
            state.selectedAcademicYear = payload.academic_year_id
    },
    CLEAR_DATA(state) {
        state.roles = []
        state.schools = []
        state.childrens = []
    },
}

const getters = {
    getSchool: state => key => {
        let filter = state.schools.filter( function(school) {
            return school.school_id == key
        })
        return filter[0]
    }
}

const actions = {
    setProfiles( {dispatch, commit} ){
        return dispatch('auth/fetchProfiles', null, { root: true}).then( (resp) => {
            commit('ASSIGN_ROLES', resp.data.role)
            commit('ASSIGN_SCHOOLS', resp.data.school)
            commit('ASSIGN_CHILDRENS', resp.data.children)
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