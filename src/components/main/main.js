
import ConfigurationModal from '@/components/configuration/Configuration.vue'
import moment from "moment"

export default {
  name: 'Main',
  components: {
    ConfigurationModal
  },
  data() {
    return {
      loading: false,
      videos: null,
      results: null,
      schedule: {},
      topKeywords: []
    }
  },
  mounted() {
    this.$root.$on('videos', data => {
      this.results = data
      this.videos = data.items
      this.removeVideosLongestMaxTime()
      this.configureSchedule()
      this.getKeywords()
    })
    this.$root.$on('loading', data => {
      this.loading = data;
    })
  },
  methods: {
    getVideos: function () {
      this.searchVideos(this.query)
        .then(() => {
          this.$root.$emit('videos', this.response)
        })
    },
    removeVideosLongestMaxTime: function () {
      console.log(this.videos)
      let watchTime = JSON.parse(localStorage.getItem('watchTime'))
      let maxTime = Object.keys(watchTime).reduce((a, b) => {
        return watchTime[a] > watchTime[b] ? watchTime[a] : watchTime[b];
      })
      this.videos.forEach(video => {
        if (this.convertDurationTimeToMinutes(video.contentDetails.duration) > maxTime) {
          this.videos.splice(this.videos.indexOf(video),1)
        }
      })
    },
    convertDurationTimeToMinutes: function (duration) {
      if (!duration) {
        return
      }
      return moment.duration(duration).asMinutes()
    },

    getKeywords: function () {
      let keywords = {}
      const self = this;
      if (this.videos) {
        this.videos.forEach(video => {
          let words = video.snippet.title.split(' ')
          words = words.concat(video.snippet.description.split(' '))

          words.forEach(word => {
            word = word.toLowerCase()
            if (keywords.hasOwnProperty(word)) {
              return keywords[word] += 1
            }
            keywords[word] = 1
          })
        })
      }

      let keys = Object.keys(keywords)
      for (let i = 0; i < 5; i++) {
        let r = keys.reduce((a, b) => {
          return keywords[a] > keywords[b] ? a : b;
        })
        keys.splice(keys.indexOf(r), 1)
        self.topKeywords.push(r)

      }

    },

    configureSchedule: function () {
      weekTime = JSON.parse(localStorage.getItem('watchTime'))

      this.videos.forEach( video => {
        let videoDuration = this.convertDurationTimeToMinutes(video.contentDetails.duration)
        
      })
    }




  }
}