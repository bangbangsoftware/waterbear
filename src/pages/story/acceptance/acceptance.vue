<template>
<div>
    <v-list>
        <v-list-tile avatar v-for="(ac,i) in state.session.story.acs" v-bind:key="i">
            <v-list-tile-action>
                <v-icon v-on:click="state = removeCriteria(i)" class="pink--text">cross</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>{{i+1}}. {{ac}}</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
    </v-list>

    <h6 v-if="state.error" class="errorMessage">{{state.error}}</h6>

    <v-text-field id="newAc" label="Acceptance Criteria" v-on:keyup.enter="addCriteria(state.newAc)"
        v-model="state.newAc">
    </v-text-field>
</div>
</template>
<script src='./acceptance.js' />
