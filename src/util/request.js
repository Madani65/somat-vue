import axios from 'axios'
import store from '@/store'
// create axios
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api base_url
  timeout: 50000, // timeout,
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
})

const err = (error) => {
  const { status, data } = error.response
  const { errors } = data
  let message = []
  for (let field in errors) {
    message.push(errors[field])
  }
  console.log(status, data, errors)
  switch (status) {
    case 400:
      window._VMA.$emit('SHOW_TOASTR', {
        text: 'Bad Request ' + data.message,
        type: 'e'
      })
      break

    case 422:
      window._VMA.$emit('SHOW_TOASTR', {
        text: message,
        type: 'e'
      })

      break

    case 401:
      window._VMA.$emit('AUTH_FAILED')
      break

    case 403:
      window._VMA.$emit('ACESS_DENIED')
      break

    case 500:
      window._VMA.$emit('SERVER_ERROR', {
        text: data.message
      })
      break

    default:
      break
  }

  return Promise.reject(error)
}

// request interceptor

service.interceptors.request.use((config) => {
  config.headers['Access-Control-Allow-Origin'] = '*'
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  config.headers['Authorization'] = 'Bearer ' + store.getters['auth/getAccessToken']

  return config
}, err)

// response interceptor

service.interceptors.response.use(({ data, config }) => {
  if (['put', 'post', 'delete', 'patch'].includes(config.method) && data.meta) {
    window._VMA.$emit('SHOW_TOASTR', {
      text: data.meta.message,
      type: 's'
    })
  }
  if (data.errors !== undefined) {
    window._VMA.$emit('API_FAILED', data.errors)
  }
  console.log(data)
  return data
}, err)

export default service
