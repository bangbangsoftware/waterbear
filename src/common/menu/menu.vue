<template>
<div class="menu">
    <v-app height="415px" dark id="e3" standalone>
        <v-navigation-drawer class="pb-0" persistent absolute height="100%" clipped enable-resize-watcher
            v-model="drawer">
            <v-list dense>

                <v-list-tile>
                    <v-list-tile-action>
                        <!--    <v-icon>{{ item.icon }}</v-icon> -->
                        <i class="fa fa-shower" aria-hidden="true"></i>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>
                            Your Details - maybe name?
                        </v-list-tile-title>
                    </v-list-tile-content>

                    <v-list-tile-action @click.native="go('member')">
                        <!--    <v-icon>{{ item.icon }}</v-icon> -->
                        <i class="fa fa-shower" aria-hidden="true"></i>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>
                           Member 
                        </v-list-tile-title>
                    </v-list-tile-content>

                    <v-list-tile-action @click.native="go('project')">
                        <!--    <v-icon>{{ item.icon }}</v-icon> -->
                        <i class="fa fa-shower" aria-hidden="true"></i>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>
                           Project 
                        </v-list-tile-title>
                    </v-list-tile-content>

                    <v-list-tile-action @click.native="go('story')">
                        <!--    <v-icon>{{ item.icon }}</v-icon> -->
                        <i class="fa fa-shower" aria-hidden="true"></i>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>
                           Story 
                        </v-list-tile-title>
                    </v-list-tile-content>

                    <v-list-tile-action @click.native="go('plan')">
                        <!--    <v-icon>{{ item.icon }}</v-icon> -->
                        <i class="fa fa-shower" aria-hidden="true"></i>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>
                           Plan 
                        </v-list-tile-title>
                    </v-list-tile-content>

                </v-list-tile>
                <v-subheader class="mt-3 grey--text text--darken-1">SUBSCRIPTIONS</v-subheader>
                <v-list>
                    <v-list-tile @click.native="go('plan')">
                        <v-list-tile-avatar>
                        <i class="fa fa-shower" aria-hidden="true"></i>
                        </v-list-tile-avatar>
                        <v-list-tile-title >Plan</v-list-tile-title>
                            <v-list-tile-title v-text="Plan">
                     </v-list-tile-title>
                    </v-list-tile>
                </v-list>
                <v-list-tile class="mt-3">
                    <v-list-tile-action>
                        <v-icon class="grey--text text--darken-1">add_circle_outline</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title class="grey--text text--darken-1">Browse Channels</v-list-tile-title>
                </v-list-tile>
                <v-list-tile>
                    <v-list-tile-action>
                        <v-icon class="grey--text text--darken-1">settings</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title class="grey--text text--darken-1">Manage Subscriptions</v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar class="red">
            <v-toolbar-title>
                <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
                <v-icon fa fa-fw class="ml-3">youtube</v-icon>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field label="Search..." single-line append-icon="search" dark hide-details></v-text-field>
        </v-toolbar>
        <main>
            <v-container>
                <v-layout>
                    <v-flex xs12>
                        <v-card height="300px"></v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </main>
    </v-app>

</div>
</template>
<script src='./menu.js' />
