<template>
<div class="skills">
    <v-select multiple v-on:change="changed()" v-bind:items="skills" v-model="session.user.skills"  class="input-group--focused" item-value="text"></v-select>
</div>
</template>
<script src='./skills.ts' />
