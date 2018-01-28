
export default {
  name: 'Main',
  data () {
    return {
      videos: this.$route.params.videos
    }
  },
  methods: {
  },
  mounted () {
    console.log(this.$route.params)
  }
}