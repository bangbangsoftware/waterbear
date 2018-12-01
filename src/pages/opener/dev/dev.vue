<template v-if="session.loaded">
  <div class="middle">
    <v-card class="primary" dark>
      <div class="header-row">
        <div class="header-column">
          <div class="summary">
            <h3 class="headline greeting">
              Greetings {{ session.user.nick }}.
            </h3>
            <v-divider></v-divider>
            <div>
              {{ sprint.days }} days <b>{{ sprint.name }}</b> sprint from
              {{ sprint.startDate | formatDate }} to
              {{ endDate(sprint) | formatDate }}
            </div>
            <div
              v-for="progress in progressList"
              :key="progress.name"
              class="progress-grid"
            >
              <div class="progress-label">{{ progress.name }}</div>
              <!-- ({{progress.percent}}%) -->
              <v-progress-linear
                :value="progress.percent"
                height="20"
                :color="progress.colour"
              ></v-progress-linear>
            </div>
          </div>
          <div class="task-row-countdown">
            <h4>Sprint time left</h4>
            <h4 class="countdown">
              {{ daysLeft }}
              <p class="days">days</p>
            </h4>
          </div>
          <div class="skill-cell">
            <h4>Skills:</h4>
            <div v-for="(skill, i) in stat.skills" :key="i">
              <v-chip color="teal" text-color="white">
                <v-avatar v-if="skill.onTrack">
                  <v-icon>check_circle</v-icon>
                </v-avatar>
                <v-avatar v-else class="red">-{{ skill.hoursOver }}</v-avatar>
                {{ skill.name }}
              </v-chip>
            </div>
          </div>
        </div>
      </div>
      <v-card-actions class="bottom">
        <v-btn v-if="!sprint.defined" flat color="orange">Define Sprint</v-btn>
      </v-card-actions>
    </v-card>
    <v-flex v-if="sprint.defined" xs12>
      <h1 v-if="mine.length === 0">Please choose a task...</h1>
      <h1 v-if="mine.length > 0">&nbsp;</h1>
      <div class="header-row">
        <div class="header-column">
          <div class="task-row">
            <h4>TO DO:</h4>
            <span v-for="(task, i) in todo" :key="i">
              <span v-bind:class="[i === 1 ? 'blur' : '']" class="item-row">
                <v-btn color="blue" class="task" :title="task.desc">
                  <div class="task-skill">
                    <v-chip color="accent" text-color="white">
                      <v-avatar class="teal">{{ task.est }}</v-avatar>
                      {{ task.skill }}
                    </v-chip>
                  </div>
                  <div class="task-name">{{ task.name }}</div>
                </v-btn>
                <v-btn v-on:click="assign(sprint, task);" color="teal">
                  <v-icon>chevron_right</v-icon>
                </v-btn>
              </span>
            </span>
          </div>

          <div class="task-row">
            <h4>Doing</h4>
            <div v-for="(task, i) in doing" :key="i">
              <span>
                <v-btn
                  class="direction"
                  v-on:click="unassign(sprint, task);"
                  color="orange"
                >
                  <v-icon>chevron_left</v-icon></v-btn
                >
                <v-btn color="blue" class="task" :title="task.desc">
                  <div class="task-skill">
                    <v-chip color="accent" text-color="white">
                      <v-avatar class="teal">{{ task.est }}</v-avatar>
                      {{ task.skill }}
                    </v-chip>
                  </div>
                  <div class="task-name">{{ task.name }}</div>
                  <v-avatar>
                    <img :src="task.assignedIcon" :alt="task.assiginedTo" />
                  </v-avatar>
                </v-btn>
                <v-btn v-on:click="unassign(sprint, task);" color="orange">
                  <v-icon>chevron_right</v-icon>
                </v-btn>
              </span>
            </div>
          </div>

          <div class="task-row">
            <h4>Done</h4>
            <v-btn
              color="blue"
              v-on:click="unassign(sprint, task);"
              class="task"
              :title="task.desc"
              v-for="(task, i) in done"
              :key="i"
            >
              <div class="task-skill">
                <v-chip color="accent" text-color="white">
                  <v-avatar class="teal">{{ task.est }}</v-avatar>
                  {{ task.skill }}
                </v-chip>
              </div>
              <div class="task-name">{{ task.name }}</div>
            </v-btn>
          </div>
        </div>
      </div>
      <div v-if="mine.length > 0" class="task-row"><blockers></blockers></div>
    </v-flex>
  </div>
</template>
<script src="./dev.ts"></script>
