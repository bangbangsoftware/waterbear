<template>
  <v-app id="example-2" standalone>
    <v-navigation-drawer v-if="session.loaded" light :mini-variant.sync="mini" v-model="drawer" overflow>
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar tag="div">
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{session.project._id}}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click.native.stop="mini = !mini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile v-for="item in items" :key="item.title" @click.native="go(item.title)">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar v-if="session.loaded" fixed class="indigo darken-4" dark>
      <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Waterbear</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon @click.native="go('')"> 
        <i class="fa fa-sign-out" aria-hidden="true"></i>
      </v-toolbar-side-icon>
    </v-toolbar>
    <main>
      <v-container fluid>
      <router-view></router-view>
      </v-container>
    </main>
  </v-app>


<!--
<div id="app">d

  <main-menu v-if="session.loaded"></main-menu> 
  <router-view></router-view>
</div>
-->

</template>


<script>
import Vue from 'vue'
import './common/menu/menu'
import store from './store'
export default {
   data: function() {
      return {
         session: store.state.session,
         drawer: false,
         items: [{
            title: 'Your details',
            icon: 'dashboard'
         }, {
            title: 'Project',
            icon: 'question_answer'
         }, {
            title: 'Story',
            icon: 'question_answer'
         }, {
            title: 'Plan',
            icon: 'question_answer'
         }],
         mini: false,
         right: null
      }
   },
   name: 'app',
   methods: {
      go: function(where) { // !!! to use 'this', don't use => !!!!
         console.log(where)
         if (!where) {
            store.commit('loaded', false)
         }
         this.drawer = false
         if (window) {
            Vue.nextTick(() => {
               window.location.href = '#/' + where
            })
         }

         /**
            if (this.$router.go) {
               console.log('Going to ' + where)
               this.$router.go({
                 name: where
               })
            } else if (window) {
               window.location.href = '#/' + where
            }
            **/
      }
   }

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
