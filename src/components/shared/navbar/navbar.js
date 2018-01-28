import Requests from '../../mixins/requests.js'
export default {
  name: 'Navbar',
	mixins: [Requests],
  data () {
    return {
      query: '',
      
    }
  },
  computed: {
    watchTime: function () {
      return localStorage.getItem('watchTime') || {
        'monday': 5,
        'tuesday': 10,
        'wednesday': 15,
        'thursday': 20,
        'friday': 25,
        'saturday': 30,
        'sunday': 35,
      }
    }
  },
  methods: {
    goToMain: function () {
      this.$router.push('/')
    },
    search: function () {
      if (!this.query) {
        return alert('query empty')
      }
      this.$root.$emit('videos', [])
      this.searchVideos(this.query)
      .then( () => {
        console.log(this.response)
        this.$root.$emit('videos', this.response)
      })
    }
  }
}