<template>
  <v-container v-if="session.loaded" fluid>
    <div class="story-grid">
      <v-flex>
        <v-hover>
          <v-card
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 12 : 2}`"
            class="mx-auto"
            width="90%"
          >
            <v-toolbar class="indigo" dark>
              <v-toolbar-title>What is the story?</v-toolbar-title>
            </v-toolbar>
            <h6 class="errorMessage" v-if="story.error">{{story.error}}</h6>
            <v-card-text>
              <story-desc></story-desc>
              <!-- 
                            <v-flex xs12>
                                <tags></tags>
                            </v-flex>
                                                       <v-flex xs12>
                            <colours></colours>
                        </v-flex>
              -->
              <v-layout row>
                <acceptance></acceptance>
              </v-layout>
              <v-layout row>
                <v-text-field
                  type="number"
                  id="points"
                  label="Points"
                  class="mt-5"
                  maxlength="3"
                  v-model="story.points"
                ></v-text-field>
              </v-layout>
              <v-card-actions>
                <v-btn
                  v-on:click="postStory(story)"
                  light
                  v-on:mouseover="whatsNeeded(story)"
                  align="end"
                  :disabled="!story.valid"
                >Add Story</v-btn>
                <v-btn align="start" v-on:click="clearStory()">Clear Story</v-btn>
              </v-card-actions>
            </v-card-text>
          </v-card>
        </v-hover>
        <v-spacer></v-spacer>
        <br />
        <br />
      </v-flex>
      <v-flex xs12>
        <v-hover>
          <v-card
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 12 : 2}`"
            class="mx-auto"
            width="90%"
          >
            <v-toolbar class="indigo" dark>
              <v-toolbar-title>Backlog</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <list></list>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
    </div>
  </v-container>
</template>
<style scoped src="./story.css">
</style>
<script src="./story.ts">
</script>
