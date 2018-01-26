
export default {
  name: 'Main',
  props: ['videos'],
  data () {
    return {
      // videos: []
    }
  },
  computed: {
    videoss: function () {
      return this.videos
    }
  },
  methods: {
    vai: function () {
      alert(this.videoss)
    }
  }
}