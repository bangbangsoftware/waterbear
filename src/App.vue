<template>
  <div id="app">
<!--    <img src="./assets/logo.png"> -->

<md-layout md-align="end" md-gutter="16">
  <md-layout md-flex="33">
		Tardigrade - little logo on the far left - :00000
  </md-layout>
  </md-layout>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
