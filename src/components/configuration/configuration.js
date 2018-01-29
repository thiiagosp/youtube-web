export default {
  name: 'Configuration',
  computed: {
    watchTime: function () {
      return JSON.parse(localStorage.getItem('watchTime')) || {
        'sunday': 35,
        'monday': 5,
        'tuesday': 10,
        'wednesday': 15,
        'thursday': 20,
        'friday': 25,
        'saturday': 30
      }
    }
  },
  data () {
    return {      
    }
  },
  methods: {
    closeModal: function () {
      this.$root.$emit('config', false)
    },
    saveConfigurations: function () {
      localStorage.setItem('watchTime', JSON.stringify(this.watchTime))
      this.$root.$emit('request')
      this.closeModal()
    }
  }
}