<template>
<div>
    <story-card v-for="(story,c) in session.project.stories" :key="c" v-on:click="editStory(story)" :end='c+1===session.project.stories.length' :story="story" :c="c"></story-card>
</div>
</template>
<script src='./list.js' />
