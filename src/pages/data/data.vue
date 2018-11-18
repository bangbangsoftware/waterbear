<template>
<v-container v-if='session.user' fluid>
    <h6 v-if="session.error" class="error">{{session.error}}</h6>
    <v-card>
        <v-toolbar class="indigo" dark>
                <v-toolbar-title>Raw Data for <b>{{session.project._id}}</b></v-toolbar-title>
        </v-toolbar>
        <h6 v-if="session.error" class="error"> {{ session.error }}</h6>
        <v-card-text>
            <v-layout row>
                <current></current>
            </v-layout>
            <v-layout row>
                <div class="subhead">Defaults</div>
            </v-layout>
            <v-layout row wrap>
                <v-text-field label='Project Description' id="desc" v-model="session.project.description"
                    placeholder="Project Description"></v-text-field>
            <br>
            </v-layout>
            <v-layout row v-for="key in keys" :key="key">
                    <div class="subhead"><b>{{key}}</b></div>
                    <p><br>  {{session[key]}}</p>
            </v-layout>

            <v-layout row>
                <div class="subhead">Members</div>
            </v-layout>
            <v-layout row>
                <div class="subhead">Stories</div>
            </v-layout>
            <v-layout row>
                <div class="subhead">Sprints</div>
            </v-layout>

            <v-card-actions>
                <v-btn v-on:click="save()" light>
                    Save
                </v-btn>
            </v-card-actions>
        </v-card-text>
    </v-card>
</v-container>
</template>
<script src='./data.js'>
</script>
