<template>
  <div id="app">
    <Navbar/>
    <router-view :key="$route.fullPath"></router-view>
    <Loading v-if="loading" />
  </div>
</template>

<script>
import Navbar from '@/components/shared/navbar/Navbar.vue'
import Loading from '@/components/shared/loading/Loading.vue'

export default {
  name: 'App',
  components: {
    Navbar, Loading
  },
  data () {
    return {
      loading: false
    }
  },
  mounted () {
    this.$root.$on('loading', data => {
      this.loading = data
    })
  }
}
</script>
<style></style>
