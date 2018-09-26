<template>
<v-layout row justify-center>
    <v-flex xs12 sm6 offset-sm3>

        <v-card>
            <v-toolbar v-on:click="toggleNameEdit()" class="teal white--text" dark>
                <v-toolbar-title v-if="!editName">{{sprint.name}} Sprint [{{sprint.days}} days]</v-toolbar-title>
                <v-toolbar-title v-if="editName">INPUT</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>


            <v-list>
                <v-list-group v-for="(story, c) in sprint.list" :key="story.id" no-action>
                    <v-list-tile slot="activator">
                        <v-list-tile-content>
                            <v-list-tile-title >{{c+1}}. {{ story.title }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile v-for="(task,t) in story.tasks" :key="task.name">
                        <v-list-tile-content>
                            <v-list-tile-title> {{t+1}}.{{task.name}} [{{task.skill}}]
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-card-actions>
                        <v-btn flat color="orange" v-on:click="removeFromSprint (story, c)">Remove</v-btn>
                    </v-card-actions>
                </v-list-group>
            </v-list>

            <v-card-actions v-if="sprint.list.length >0">
                <v-dialog v-model="dialog" persistent max-width="800px">
                    <v-btn v-if="!editName" dark slot="activator" flat color="orange">START</v-btn>
                    <v-card>
                        <v-card-title class="teal white--text">
                                <span class="headline">Start the Sprint {{sprint.startDate | formatDate}} {{sprint.startTime}}</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex xs12>
                                        <v-text-field v-model="sprint.name" label="Sprint Name" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs6>
                                            <small>Start Date</small>
                                            <!--
                                        <v-date-picker color="teal white--text" full-width landscape class="mt-3" v-model="sprint.startDateString"></v-date-picker>
                                            -->
                                     </v-flex>
                                    <v-flex xs6>
                                        <small>Start time</small>
                                        <v-time-picker  color="teal white--text" v-model="sprint.startTime" landscape></v-time-picker>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field type="number" label="How many days" class="mt-5" v-model="sprint.days" id="days" required></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                            <small>*indicates required field</small>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" flat @click.native="dialog = false">Cancel</v-btn>
                            <v-btn color="green darken-1" flat @click.native="startSprint()">Go</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <v-btn v-on:click="toggleNameEdit()" flat color="orange">NEW</v-btn>
            </v-card-actions>
            <v-card-actions v-else>
                <v-btn v-on:click="toggleNameEdit()" flat color="orange">Update</v-btn>
            </v-card-actions>
        </v-card>

    </v-flex>

</v-layout>
</template>
<script src='./select.js'>
</script>
