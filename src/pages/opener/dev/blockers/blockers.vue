<template>
  <v-layout id="blockers" v-if="session.loaded">
    <v-flex xs12>
      <v-card>
        <v-card-title primary-title>
          {{ blocker }}
          <v-autocomplete
            no-data-text="Not found - New blocker"
            v-model="blocker"
            hint="What is stopping you?"
            :items="reasons"
            label="Blockers"
            persistent-hint
            prepend-icon="mdi-city"
          >
            <v-slide-x-reverse-transition mode="out-in" slot="append-outer">
              <v-icon color="info" v-text="'mdi-check-outline'"></v-icon>
            </v-slide-x-reverse-transition>
          </v-autocomplete>
        </v-card-title>
        <v-card-actions>
          <v-btn
            v-on:click="post(blocker);"
            flat
            class="margin-left"
            color="orange"
            >Post</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script src="./blockers.ts">
</script>
