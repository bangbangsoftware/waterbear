<template>
  <v-layout id="blockers" v-if='session.loaded'>
    <v-spacer></v-spacer>
    <v-flex xs12>
        <v-card>
            <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-0">Blockers</h3>i

                    TYPEAHEAD
                </div>
            </v-card-title>
            <v-card-actions>
                <v-btn flat class="margin-right" color="orange">Eak</v-btn>
            </v-card-actions>
        </v-card>
    </v-flex>
  </v-layout>
</template>
<script src='./blockers.js'></script>
