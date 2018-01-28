<template>
  <div id="app">
    <Navbar/>
    
    <!-- <transition name="route-transition"> -->
        <router-view :key="$route.fullPath"></router-view>
      <!-- </transition> -->
  </div>
</template>

<script>
import Navbar from "@/components/shared/navbar/Navbar.vue"

export default {
  name: "App",
  components: {
    Navbar
  },
  beforeMount () {
    this.$router.push('/')
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700");

</style>
