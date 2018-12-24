<template>
<div class="task-row">
        <h4>Done done</h4>
    <v-btn color="blue" v-on:click="unassign(sprint, task)" class="task" :title="task.desc"
        v-for="(task,i) in done" :key="i">
        <div class="task-skill">
            <v-chip color="accent" text-color="white">
                <v-avatar class="teal">{{task.est}}</v-avatar>
                {{task.skill}}
            </v-chip>
        </div>
        <div class="task-name">{{task.name}}</div>
    </v-btn>
</div>
</template>
<script src='./tasklist.ts' />
