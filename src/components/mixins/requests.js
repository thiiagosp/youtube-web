import axios from 'axios'

export const key = 'AIzaSyDUs2Rv4uEE9n2v6NRPr3Ma2r3EyCWi3vU'

// https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=cs+go&key=AIzaSyDUs2Rv4uEE9n2v6NRPr3Ma2r3EyCWi3vU
export default {
  data () {
    return {
      response: [],
      url: 'https://www.googleapis.com/youtube/v3/'
    }
  },
  methods: {
    getVideosId: function (videos) {
      return videos.map(video => {
        return video.id.videoId
      })
    },
    searchVideos: function (query) {
      const maxResult = 50
      query = this.validateQuery(query)
      return axios.get(`${this.url}search?part=snippet&maxResults=${maxResult}&type=video&q=${query}&key=${key}`)
        .then(response => {
          let ids = this.getVideosId(response.data.items)
          return this.getContentDetailsVideo(ids)
        })

        .catch(e => {
          return this.errors.push(e)
        })
    },
    getContentDetailsVideo: function (ids) {
      return axios.get(`${this.url}videos?id=${ids}&part=snippet,contentDetails&key=${key}`)
        .then(resp => {
          this.response = resp.data
        })
        .catch(e => {
          return this.errors.push(e)
        })
    },
    validateQuery: function (query) {
      return query.replace(' ', '+')
    }
  }
}
