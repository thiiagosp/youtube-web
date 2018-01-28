import Requests from '../../mixins/requests.js'
export default {
  name: 'Navbar',
	mixins: [Requests],
  data () {
    return {
      query: '',
      
    }
  },
  mounted () {
    this.$root.$on('request', () => {
      this.getVideos()
    })
  },
  methods: {
    goToMain: function () {
      this.$router.push('/')
    },
    getVideos: function () {
      this.searchVideos(this.query)
      .then( () => {
        this.$root.$emit('videos', this.response)
      })
    },
    openConfiguration: function () {
      this.$root.$emit('loading', true)
    },
    search: function () {
      let watchTime = JSON.parse(localStorage.getItem('watchTime'))
      if (!this.query) {
        return alert('query empty')
      }

      if(!watchTime) {
        return this.openConfiguration()
      }
      this.getVideos()
      
    }
  }
}