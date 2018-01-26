import Requests from '../../mixins/requests.js'
export default {
  name: 'Navbar',
	mixins: [Requests],
  data () {
    return {
      query: ''
    }
  },
  methods: {
    search: function () {
      if (!this.query) {
        return alert('query empty')
      }
      this.searchVideos(this.query)
      .then( () => {
        console.log(this.result)
        // this.$route.push({path: '/result', params: this.result})
        this.$router.push({ name: "Result", params: { videos: this.result } })
      })
    }
  }
}