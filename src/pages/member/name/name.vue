<template>
<div class="name">
    <div>
        <v-text-field label='Your name' id="name" v-model="session.user.nick" placeholder="Your name"></v-text-field>
        <v-text-field label='Your email' id="email" v-model="session.user.name" placeholder="Email"></v-text-field>
    </div>
    <div>
        <v-text-field label='Git details' id="git" v-model="session.project.git" placeholder="Git"></v-text-field>
        <v-text-field label='Git commit message prefix' id="git-message-prefix" v-model="session.project.gitPrefix" placeholder="Git commit message prefix"></v-text-field>
    </div>
</div>
</template>
<script src='./name.ts' />
