<template>
<div>
    <v-card class="blue-grey darken-2 white--text" @contextmenu="show">
        <v-spacer></v-spacer>
        <v-toolbar class="white--text orange" dark>
            <v-btn v-if='c > 0' v-on:click="moveUp(c)" icon>
                <v-icon>arrow_upward</v-icon>
            </v-btn>
            <v-toolbar-title>{{c+1}}. {{story.title}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn v-if='!end' v-on:click="moveDown(c)" icon>
                <v-icon>arrow_downward</v-icon>
            </v-btn>
        </v-toolbar>

        <v-card-text>
            As <em>{{story.descAs}}</em><br/> 
            I want <em>{{story.descWant}}</em><br/>
            So that <em>{{story.descThat}}</em>
        </v-card-text>

        <v-card-actions>
            <actions :story="story" :c="c"></actions>
        </v-card-actions>
    </v-card>
    <v-menu offset-y v-model="showMenu" :position-absolutely="true" :position-x="x"
        :position-y="y">
        <div class="text-xs-center">
            <v-list>
                <v-list-tile @click="moveTop(c)">
                    <v-list-tile-title>Go to top</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="moveBottom(c)">
                    <v-list-tile-title>Go to bottom</v-list-tile-title>
                </v-list-tile>
            </v-list>
        </div>
    </v-menu>
    <v-spacer></v-spacer>
</div>
</template>
<script src='./storycard.ts' />
