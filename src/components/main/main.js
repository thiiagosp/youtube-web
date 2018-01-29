
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
      schedule: [],
      topKeywords: ''
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
      let watchTime = JSON.parse(localStorage.getItem('watchTime'))
      let maxTime = Object.keys(watchTime).reduce((a, b) => {
        return watchTime[a] > watchTime[b] ? watchTime[a] : watchTime[b];
      })
      this.videos.forEach(video => {
        if (this.convertTimeToMinutes(video.contentDetails.duration) > maxTime) {
          this.videos.splice(this.videos.indexOf(video), 1)
        }
      })
    },
    convertTimeToMinutes: function (duration) {
      if (!duration) {
        return
      }
      return moment.duration(duration).asMinutes()
    },
    getKeywords: function () {
      this.topKeywords = ''
      let keywords = {}
      if (this.videos) {
        this.videos.forEach(video => {
          let words = video.snippet.title.replace(/[^\w\s]/gi, '').split(' ')
          words = words.concat(video.snippet.description.replace(/[^\w\s]/gi, '').split(' '))

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
        this.topKeywords += ` ${r},`
      }
    },
    getWeek: function () {
      let weekTime = JSON.parse(localStorage.getItem('watchTime'))
      const week = []
      Object.keys(weekTime).forEach(day => {
        week.push({ 
          name: day, 
          durationTime: moment.duration(parseInt(weekTime[day]), 'minutes').asMilliseconds(), 
          remain: moment.duration(parseInt(weekTime[day]), 'minutes').asMilliseconds(), 
          videos: [] 
        })
      })
      return week
    },
    configureSchedule: function () {
      let weekStorage = this.getWeek()

      this.videos.forEach(video => {
        const weekModel = this.getWeek()
        let videoDuration = moment.duration(video.contentDetails.duration).asMilliseconds()
        for( let i = 0; i < weekModel.length; i++) {
          if (videoDuration > weekModel[i].durationTime) {
            continue
          }
          if (weekStorage[i].name && videoDuration <= weekStorage[i].remain) {
            weekStorage[i].remain -= videoDuration
            weekStorage[i].videos.push(video)
            return
          }
        }
        this.schedule = this.schedule.concat(weekStorage)
        weekStorage = this.getWeek()
      })

    }

  }
}