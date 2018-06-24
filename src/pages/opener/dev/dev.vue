<template v-if='session.loaded'>
<div>
    <v-spacer></v-spacer>
    <v-card class="primary" dark>
        <v-card-title primary-title>
            <div class="header-row">
            <h3 class="headline mb-0">Greetings {{session.user.nick}}.</h3>
            <div class="header-column">
                <div>
                    <div>{{sprint.days}} days <b>{{sprint.name}}</b> sprint from {{sprint.startDate
                        | formatDate}} to {{endDate(sprint) | formatDate}} </div>
                    <div v-for="progress in progressList" :key="progress.name" class="progress-grid">
                        <div class="progress-label">{{progress.name}}</div>
                        <!-- ({{progress.percent}}%) -->
                        <v-progress-linear :value="progress.percent" height="20" :color="progress.colour"></v-progress-linear>
                    </div>
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
        </v-card-title>
        <v-card-actions>
            <v-btn v-if="!sprint.defined" flat color="orange">Define Sprint</v-btn>
        </v-card-actions>
    </v-card>
    <v-flex v-if="sprint.defined" xs12>
        <blockers></blockers>
    </v-flex>
    <v-divider></v-divider>
    <v-spacer></v-spacer>
    <v-flex v-if="sprint.defined" xs12>
        <condition></condition>
    </v-flex>
</div>
</template>
<script src="./dev.js"></script>
