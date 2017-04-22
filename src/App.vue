<template>
<div id="app">

  <main-menu v-if="session.loaded"></main-menu> 
  <router-view></router-view>
</div>
</template>

<script>
import './common/menu/menu'
import store from './store'
export default {
  data: function() { return {session: store.state.session} },
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
  margin-top: 0px;
}

</style>
