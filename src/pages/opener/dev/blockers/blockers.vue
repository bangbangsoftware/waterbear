<template>
<v-layout id="blockers" v-if='session.loaded'>
    <v-flex xs12>
        <v-card>
            <v-card-title primary-title>
                <v-autocomplete v-model="blocker" hint="What is stopping you?" :items="reasons"
                    label="Blockers" persistent-hint prepend-icon="mdi-city">

                    <v-slide-x-reverse-transition mode="out-in" slot="append-outer">
                        <v-icon color="info" v-text="'mdi-check-outline'" @click=""></v-icon>
                    </v-slide-x-reverse-transition>
                </v-autocomplete>

            </v-card-title>
            <v-card-actions>
                <v-btn flat class="margin-left" color="orange">Post</v-btn>
            </v-card-actions>
        </v-card>
    </v-flex>
</v-layout>
</template>
<script src='./blockers.js'></script>
