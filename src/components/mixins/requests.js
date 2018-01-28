import axios from 'axios'

export const key = 'AIzaSyDUs2Rv4uEE9n2v6NRPr3Ma2r3EyCWi3vU'

// https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=cs+go&key=AIzaSyDUs2Rv4uEE9n2v6NRPr3Ma2r3EyCWi3vU
export default {
  data () {
    return {
      response: []
    }
  },
  methods: {
    searchVideos: function (query) {
      let maxResult = 200
      query = this.validateQuery(query)
      return axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&q=${query}&key=${key}`)
        .then(response => {
          this.response = response.data
        })
        .catch(e => {
          return this.errors.push(e)
        })
    },
    validateQuery: function (query) { //...
      return query.replace(' ', '+')
    }
  }
}
