<template>
  <v-layout  v-if="stages.length > 0" row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar class="white--text pink" dark>
          <v-toolbar-title v-if="stages.length === 1">Summary</v-toolbar-title>
          <v-toolbar-title v-if="stages.length > 1">{{stages[1].name}} Summary</v-toolbar-title>
        </v-toolbar>
        <v-list two-line>
          <v-list-tile avatar ripple v-for="(position, index) in members" v-bind:key="index">
            <v-list-tile-content>
              <v-list-tile-title>{{ posiion.name }}</v-list-tile-title>
              <v-list-tile-sub-title  tooltip="We'll send them an invite" class="grey--text text--darken-4">{{ position.email }}</v-list-tile-sub-title>
              <v-list-tile-sub-title>{{ position.role }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-divider v-if="index + 1 < members.length"></v-divider>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script src="./summary.ts">
</script>
