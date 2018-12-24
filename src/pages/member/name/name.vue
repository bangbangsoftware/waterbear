<template>
<div class="name">
    <v-text-field label='Your name' id="name" v-model="session.user.nick" placeholder="Your name"></v-text-field>
    <v-text-field label='Your email' id="email" v-model="session.user.name" placeholder="Email"></v-text-field>
</div>
</template>
<script src='./name.ts' />
