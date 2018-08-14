<template v-if='session.loaded'>
<div class="middle">
    <v-card class="primary" dark>
        <!--  <v-card-title> -->
        <div class="header-row">
            <div class="header-column">
                <div class="summary">
                    <h3 class="headline greeting">Greetings {{session.user.nick}}.</h3>
                    <v-divider></v-divider>
                    <div>{{sprint.days}} days <b>{{sprint.name}}</b> sprint from {{sprint.startDate
                        | formatDate}} to {{endDate(sprint) | formatDate}} </div>
                    <div v-for="progress in progressList" :key="progress.name" class="progress-grid">
                        <div class="progress-label">{{progress.name}}</div>
                        <!-- ({{progress.percent}}%) -->
                        <v-progress-linear :value="progress.percent" height="20" :color="progress.colour"></v-progress-linear>
                    </div>
                </div>
                <div class="task-row">
                    <h4>TO DO:</h4>
                    <v-btn color="blue" v-on:click="assign(sprint, task)" class="task" :title="task.desc"
                        v-for="task in todo">
                        <div class="task-skill">
                            <v-chip color="accent" text-color="white">
                                <v-avatar class="teal">{{task.est}}</v-avatar>
                                {{task.skill}}
                            </v-chip>
                        </div>
                        <div class="task-name">{{task.name}}</div>
                    </v-btn>
                </div>
                <div class="skill-cell">
                    <h4>Skills:</h4>
                    <div v-for="skill in stat.skills">
                        <v-chip color="teal" text-color="white">
                            <v-avatar v-if="skill.onTrack">
                                <v-icon>check_circle</v-icon>
                            </v-avatar>
                            <v-avatar v-else class="red">-{{skill.hoursOver}}</v-avatar>
                            {{skill.name}}
                        </v-chip>
                    </div>
                </div>
            </div>
        </div>
        <!--   </v-card-title> -->
        <v-card-actions>
            <v-btn v-if="!sprint.defined" flat color="orange">Define Sprint</v-btn>
        </v-card-actions>
    </v-card>
    <v-flex v-if="sprint.defined" xs12>
            <blockers v-if="mine.length > 0"></blockers>
        <div v-if="mine.length === 0">Please choose a task...</div>
        <div class="task-row">
            <h4>Assigned:</h4>
            <v-btn color="blue" v-on:click="unassign(sprint, task)" class="task" :title="task.desc"
                v-for="task in mine">
                <div class="task-skill">
                    <v-chip color="accent" text-color="white">
                        <v-avatar class="teal">{{task.est}}</v-avatar>
                        {{task.skill}}
                    </v-chip>
                </div>
                <div class="task-name">{{task.name}}</div>
            </v-btn>
        </div>

    </v-flex>
</div>
</template>
<script src="./dev.js"></script>
