import axios from 'axios'

export const url = 'http://localhost:8199/'

export default {
  data () {
    return {
      getRequest: []
    }
  },
  methods: {
    getData (path) {
      return axios.get(url + path)
        .then(response => {
          this.getRequest = response.data
        })
        .catch(e => {
          return this.errors.push(e)
        })
    },
    postData (path, body) {
      return axios.post(url + path, body)
      // .then(response => {
      //     this.getRequest = response.data
      //  })
      //  .catch(e => {
      //      return this.errors.push(e)
      //  })
    },
    putData (path, body) {
      return axios.put(url + path + '/' + body.id, body)
    },
    removeData (path, id) {
      return axios.delete(url + path + '/' + id)
      // .then(response => {
      //     this.getRequest = response.data
      //  })
      //  .catch(e => {
      //      return this.errors.push(e)
      //  })
    }
  }
}
