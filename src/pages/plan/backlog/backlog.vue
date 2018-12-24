<template>
<div>
    <v-card v-if="complete.length > 0">
        <v-toolbar class="teal white--text" dark>
            <v-toolbar-title>Ready Stories Backlog </v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-flex xs6>
            <v-list>
                <v-list-group v-for="story in complete" :key="story.title" no-action>
                    <v-list-tile slot="activator">
                        <v-list-tile-content>
                            <v-list-tile-title title="Add to Sprint" v-on:click="addToSprint(c)">{{ story.title }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile v-for="task in story.tasks" :key="task.name" >
                        <v-list-tile-content>
                            <v-list-tile-title>{{ task.name }}</v-list-tile-title>
                        </v-list-tile-content>
                        <!--                        
                        <v-list-tile-action>
                            <v-icon>{{ task.desc }}</v-icon>
                        </v-list-tile-action>
                        -->
                    </v-list-tile>
                </v-list-group>
            </v-list>
        </v-flex>
    </v-card>
    <v-card v-else>
        <v-toolbar class="teal white--text" dark>
            <v-toolbar-title v-on:click="refine()">THERE ARE NO STORIES READY</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
    </v-card>
</div>
</template>
<script src='./backlog.ts' />
