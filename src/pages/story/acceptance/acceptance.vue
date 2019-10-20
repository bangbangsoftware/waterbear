<template>
  <div class="accept">
    <h6 v-if="state.error" class="errorMessage">{{ state.error }}</h6>

    <v-text-field
      id="newAc"
      label="Acceptance Criteria [Enter to post]"
      v-on:keyup.enter="addCriteria(state.newAc);"
      v-model="state.newAc"
    ></v-text-field>
    <v-list>
      <v-list-tile avatar v-for="(ac, i) in state.session.story.acs" v-bind:key="i">
        <v-list-tile-content>
          <v-list-tile-title>{{ i + 1 }}. {{ ac }}</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn v-on:click="removeCriteria(i)"  color="white" >
            <v-icon color="pink" left>mdi-delete</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </div>
</template>
<script src="./acceptance.ts" />
