<template>
<div class="name">
    <div>
        <v-text-field label='Your name' id="name" v-model="session.user.nick" placeholder="Your name"></v-text-field>
        <v-text-field label='Your email' id="email" v-model="session.user.name" placeholder="Email"></v-text-field>
    </div>
    <div>
        <v-text-field label='Git details' id="git" v-model="session.user.git" placeholder="Git"></v-text-field>
        <v-text-field label='Finished tag token' id="git-task-finish" v-model="session.user.gitFinishTag" placeholder="Git commit Finish Tag token"></v-text-field>
    </div>
</div>
</template>
<script src='./name.ts' />
