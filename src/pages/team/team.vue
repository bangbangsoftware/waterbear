<template>
<v-container v-if='session.user' fluid>
    <h6 v-if="session.error" class="error">{{session.error}}</h6>
    <v-card>
        <v-toolbar class="indigo" dark>
            <v-toolbar-title>Team</v-toolbar-title>
        </v-toolbar>
        <h6 v-if="session.error" class="error"> {{ session.error }}</h6>
        <v-card-text>
            <v-layout row wrap>
                <div class="subhead">Time</div>
            </v-layout>
            <v-container v-for="(day, index) in days" :key="day.format" grid-list-md text-xs-center>
                <v-layout row wrap>
                    <v-flex xs12 v-if="day.newMonth">
                        <v-card>{{day.newMonth}}</v-card>
                    </v-flex>
                     <v-flex xs2 v-if="index > 1"  >
                        <v-card class="blue" >
                                <v-card-text>{{day.format}}</v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex xs2 v-if="index > 1" v-for="(member,m) in session.project.members" :key="m" >
                        <v-card v-if="member.diary[index]" :class="member.diary[index].colour" @contextmenu="show">
                            <v-card-text @click='toggle(m,index)'>
                                    {{member.diary[index].display}}
                                <v-menu offset-y v-model="showMenu"
                                    :position-absolutely="true" :position-x="x" :position-y="y">
                                    <div class="text-xs-center">
                                        <v-list>
                                            <v-list-tile @click="wfh(m,day)">
                                                <v-list-tile-title xs12>{{day.format}} Working from Home</v-list-tile-title>
                                            </v-list-tile>
                                            <v-list-tile @click="sick(m)">
                                                <v-list-tile-title>Sick</v-list-tile-title>
                                            </v-list-tile>
                                            <v-list-tile @click="holiday(m)">
                                                <v-list-tile-title>On Holiday</v-list-tile-title>
                                            </v-list-tile>
                                        </v-list>
                                    </div>
                                </v-menu>
                                    <!--                                    
                                    -->
                            </v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex v-if="index === 0" xs2>
                        <v-card light class="white">
                            <v-card-text class="px-0">Date</v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex v-if="index === 0" xs2 v-for="(member,mbx) in session.project.members" :key="mbx">
                        <v-card light class="blue">
                            <v-card-text class="px-0">{{member.nick}}</v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
            <v-card-actions>
                <v-btn txt-xs-right v-on:click="save()" light>
                    Save
                </v-btn>
            </v-card-actions>
        </v-card-text>
    </v-card>
</v-container>
</template>
<script src='./team' />
