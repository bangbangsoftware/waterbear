<template>
<div class="story-desc">
    <v-layout row>
        <v-textarea autofocus id="title" label="What's the stories title?" class="mt-5"
            maxlength="100" v-on:change="storeTitle(session.story.title)" v-model="session.story.title" required></v-textarea>
    </v-layout>
    <v-layout row>
        <v-textarea multi-line id="descAs" label="As...." class="mt-5" maxlength="100"
            v-on:change="storeDesc(session.story.descAs,session.story.descWant,session.story.descThat)" v-model="session.story.descAs" required></v-textarea>
        <v-textarea multi-line id="descWant" label="I want....." class="mt-5" maxlength="100"
            v-on:change="storeDesc(session.story.descAs,session.story.descWant,session.story.descThat)" v-model="session.story.descWant" required></v-textarea>
        <v-textarea multi-line id="descThat" label="so that....." class="mt-5" maxlength="100"
            v-on:change="storeDesc(session.story.descAs,session.story.descWant,session.story.descThat)" v-model="session.story.descThat" required></v-textarea>
    </v-layout>
</div>
</template>
<script src='./desc' />
