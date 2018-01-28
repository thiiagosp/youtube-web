
export default {
  name: 'Main',
  data() {
    return {
      videos: null,
      results: null,
      topKeyword: []
    }
  },
  mounted() {
    this.$root.$on('videos', data => {
      this.results = data
      this.videos = data.items
      this.getKeywords(data.items)
    })
  },
  methods: {
    getKeywords: function (items) {
      let keywords = {}
      console.log(items)
      items.forEach( video => {
        let title = video.snippet.title.split(' ')
        title.forEach( word => {
          if (keywords.hasOwnProperty(word)) {
            return keywords[word] += 1
          }
          keywords[word] = 1
        })
      })

      for (let i = 0; i < 5; i++){
        this.topKeyword.push(Object.keys(keywords).reduce((a, b) => keywords[a] > keywords[b] ? a : b))
      }
      

    }
  }
}