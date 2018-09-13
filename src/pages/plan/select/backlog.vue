<template>
<div id="sprint">
    <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
            <v-card>
                <v-toolbar class="teal white--text" dark>
                    <v-toolbar-title>Sprints</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-list>
                    <v-list-group v-for="(sprint,c) in session.project.sprints" :key="sprint">
                        <v-list-tile :click="selectSprint(c)" slot="activator">
                            <v-list-tile-action>
                                <!--      <v-icon>{{ item.action }}</v-icon> -->
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>{{c+1}}. {{sprint.name}}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list-group>
                </v-list>
            </v-card>
        </v-flex>
    </v-layout>
</div>
</template>
<script src='./backlog.js' />
