<template>
  <v-container v-if="session.loaded" fluid>
    <v-layout ow wrap>
      <v-flex xs6>
        <v-hover>
          <v-card
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 12 : 2}`"
            class="mx-auto"
            width="90%"
          >
            <v-toolbar class="indigo" dark>
              <v-btn v-on:click="lastIncomplete(session.project);" icon>
                <v-icon>chevron_left</v-icon>
              </v-btn>
              <v-toolbar-title>
                {{ session.story.index }}. Refinement ({{
                todo(session.project)
                }})
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn v-on:click="nextIncomplete(session.project);" icon>
                <v-icon>chevron_right</v-icon>
              </v-btn>
            </v-toolbar>
            <h6 class="errorMessage" v-if="session.story.error">{{ session.story.error }}</h6>
            <v-card-text>
              <v-layout row>
                <v-flex xs8>
                  <story-desc></story-desc>
                </v-flex>
                <v-flex xs8>
                  <tags></tags>
                </v-flex>
                <!--
                <v-flex xs8>
                    <colours></colours>
                </v-flex>
                -->
              </v-layout>
              <v-layout row>
                <v-layout row>
                  <v-flex xs8>
                    <acceptance></acceptance>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field
                      type="number"
                      id="points"
                      label="Points"
                      class="mt-5"
                      maxlength="3"
                      v-model="session.story.points"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-layout>
              <v-card-actions>
                <v-btn align="start" v-on:click="addTask(session.story);">Add Task</v-btn>
                <v-btn v-on:click="updateStory(session.story);" align="end">Update Story</v-btn>
              </v-card-actions>
            </v-card-text>
          </v-card>
        </v-hover>
        <v-spacer></v-spacer>
        <!--        <feed></feed> -->
      </v-flex>
      <v-flex xs6>
        <task></task>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script src="./refine.ts" />
