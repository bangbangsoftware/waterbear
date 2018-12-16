<template>
<div class="hours">
    <div v-for="(dayHours, hoursIndex) in days" :key="hoursIndex">
        <h6>{{dayHours.name}}</h6>
        <v-btn v-bind:color="colour(hour.state)" v-for="(hour,i) in dayHours.day" :key="hour.name" v-bind:id="i+'-amToggle'"
            v-on:click="toggleDay(hoursIndex,i)"> {{hour.name}} </v-btn>
        <v-btn  v-bind:color="colour(hour.state)" v-for="(hour,i) in dayHours.night" :key="hour.name" v-bind:id="i+'-pmToggle'"
            v-on:click="toggleNight(hoursIndex,i)"> {{hour.name}} </v-btn>
    </div>
</div>
</template>
<script src='./hours' />
