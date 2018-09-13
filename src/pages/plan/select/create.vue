<template>
<v-card>
    <v-toolbar class="indigo" dark>
        <v-toolbar-title v-on:click="changeState()">Sprint</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
        <span class="title">Goal</span>
        <h6 v-if="session.error" class="errorMessage"> {{ session.error }}</h6>
        <form >
            <v-text-field v-on:change="storeName(sprint.name)" label="Sprint name" class="mt-5" v-model="sprint.name" id="name" required></v-text-field>
            <v-text-field type="number" v-on:change="storeDays(sprint.days)" label="How many days" class="mt-5" v-model="sprint.days" id="days" required></v-text-field>
        </form>
    </v-card-text>
    <v-card-actions>
        <v-btn v-on:click="exit()" :disabled="!session.project.sprints || session.project.sprints.length === 0" > Return</v-btn>
        <v-btn :disabled="!session.sprint.valid" v-on:click="postSprint(session.sprint)">Add Sprint</v-btn>
    </v-card-actions>

</v-card>
</template>
<script src='./create.js' />
