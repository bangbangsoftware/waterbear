<template>
<v-layout id="blockers" v-if='session.loaded'>
    <v-spacer></v-spacer>
    <v-flex xs12>
        <v-card>
            <v-card-title primary-title>
                <h3 class="headline mb-0">How is <b>{{sprint.name}}</b> going?</h3>
            </v-card-title>
            <h4>Skills:</h4>
            <div v-for="skill in stat.skills" :key="skill">
                <v-chip color="teal" text-color="white">
                    <v-avatar v-if="skill.onTrack">
                        <v-icon>check_circle</v-icon>
                    </v-avatar>
                    <v-avatar v-else class="red">-{{skill.hoursOver}}</v-avatar>
                    {{skill.name}}
                </v-chip>
            </div>

            <h3>Members:</h3>
            <div v-for="member in stat.members" :key="member">
                <h4>{{member.details.nick}}</h4>

                <div v-for="skill in member.skills" :key="skill">
                    <v-chip color="teal" text-color="white">
                        {{skill}}
                    </v-chip>
                    {{member.left}}
                </div>
            </div>

            <h4>Total hours left: {{stat.totalHoursLeft}}</h4>
            <h4>To do...</h4>
            <v-container fluid grid-list-xl>
                <v-layout row wrap justify-space-between>

                    <button :title="task.desc" md6 sm12 v-for="task in todo" :key="task" class="raised primary">
                        <v-card color="accent" class="px-1">
                           &nbsp;&nbsp;{{task.name}}
                                <v-chip color="accent" text-color="white">
                                    <v-avatar class="teal">{{task.est}}</v-avatar>
                                    {{task.skill}}
                                </v-chip>

                        </v-card>
                </button>
                </v-layout>
            </v-container>
            <v-card-actions>
                <v-btn flat class="margin-right" color="orange">Eak</v-btn>
            </v-card-actions>
        </v-card>
    </v-flex>
</v-layout>
</template>
<script src='./condition.js'>
</script>
