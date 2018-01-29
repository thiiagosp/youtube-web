import Services from '../../mixins/services.js'
export default {
  name: 'Navbar',
	mixins: [Services],
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
      this.$root.$emit('loading', true)
      this.searchVideos(this.query)
      .then( () => {
        this.$root.$emit('videos', this.response)
        this.$root.$emit('loading', false)
      })
    },
    openConfiguration: function () {
      this.$root.$emit('config', true)
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