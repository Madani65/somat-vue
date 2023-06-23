const state = {
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
    student: {
        user_profile_id: '',
        nik: '',
        kk: '',
        first_name: '',
        last_name: '',
        mobile_number: '',
        phone_no: '',
        place_of_birth:'',
        date_of_birth:'',
        gender: '',
        religion:'',
        blood_type: '',
        profile_image: '',
        effective_start_date: '',
        effective_end_date : '',
        status: '',
        citizenship: '',
        country: '',
        email: ''
    }
  }
  
  const mutations = {
    CLEAR_FORM(state) {
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
        status: '',//payload.status,
        marriage_status : '',//payload.marriage_status,
        citizenship: payload.citizenship,
        country: payload.country,
        email: payload.email
      }
    },
  }
  
  const getters = {}
  
  const actions = {}
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }