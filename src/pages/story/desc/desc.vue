<template>
<div class="story-desc">
    <v-layout row>
        <v-text-field autofocus id="title" label="What's the stories title?" class="mt-5"
            v-on:change="storeTitle(session.story.title)" v-model="session.story.title" required></v-text-field>
    </v-layout>
    <v-layout row>
        <v-text-field  id="descAs" label="As...." class="mt-5" maxlength="100"
            v-on:change="storeDesc(session.story.descAs,session.story.descWant,session.story.descThat)" v-model="session.story.descAs" required></v-text-field>
        <v-text-field  id="descWant" label="I want....." class="mt-5" maxlength="100"
            v-on:change="storeDesc(session.story.descAs,session.story.descWant,session.story.descThat)" v-model="session.story.descWant" required></v-text-field>
        <v-text-field  id="descThat" label="so that....." class="mt-5" maxlength="100"
            v-on:change="storeDesc(session.story.descAs,session.story.descWant,session.story.descThat)" v-model="session.story.descThat" required></v-text-field>
    </v-layout>
</div>
</template>
<script src='./desc.ts' />
