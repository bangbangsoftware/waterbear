<template>
  <v-hover>
    <v-card
      slot-scope="{ hover }"
      :class="`elevation-${hover ? 12 : 2}`"
      class="mx-auto"
      width="90%"
    >
      <v-toolbar class="teal white--text" dark>
        <v-toolbar-title>Task</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <span class="title">
          <h5
            v-if="session.story.tasks"
          >Task for {{session.story.title}} ({{session.story.tasks.length}})</h5>
          <h5 v-else>Task for {{session.story.title}}</h5>
        </span>
        <h6 v-if="session.error" class="errorMessage">{{ session.error }}</h6>
        <form>
          <v-text-field
            autofocus
            label="Task name"
            class="mt-5"
            v-model="session.task.name"
            id="name"
            required
          ></v-text-field>
          <v-text-field
            label="Task desc"
            class="mt-5"
            v-model="session.task.desc"
            id="desc"
            required
          ></v-text-field>
          <v-text-field
            type="number"
            label="Task estimation"
            class="mt-5"
            v-model="session.task.est"
            id="est"
            required
          ></v-text-field>
          <span class="skill">
            <v-select
              v-bind:items="skills"
              v-model="session.task.skill"
              label="Skill"
              class="input-group--focused"
              item-value="text"
            ></v-select>
          </span>
        </form>
      </v-card-text>
      <v-card-actions>
        <!--
        <v-btn v-on:click="exit()" align="start">
            Return
        </v-btn>
        -->
        <v-btn v-on:click="postTask(session.task)">Add Task</v-btn>
      </v-card-actions>

      <v-list three-line v-if="session.story.tasks">
        <span v-for="(task,t) in session.story.tasks" v-bind:key="t">
          <v-divider></v-divider>
          <v-subheader>[{{task.skill}}] {{t+1}}. {{task.name}}</v-subheader>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>{{task.desc}}</v-list-tile-title>
              <v-list-tile-sub-title class="text-xs-right">Estaimated to take {{task.est}} hours</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </span>
      </v-list>
    </v-card>
  </v-hover>
  <!--
<div id="session.task">
    <div>
        <card>
            <card-content>
                <p>Create a task from a story in backlog, skills are mandatory as
                    is estimated time</br>
                    NB. If a user gets assigned to as task and they should have a skill match -</br>
                    maybe auto update aspirations if skills missing</p>
                <h5>Task for</h5>
                <h6>{{session.story.title}}</h6>
                <h6>{{session.story.descWant}}</h6>
                <h6>{{session.sprint.name}}</h6>
                <br>
                <input-container>
                    <label>Name</label>
                    <input v-on:change="storeName(session.task.name)" id="name" required placeholder="Task Name"
                        v-model="session.task.name" tabindex="0"></input>
                </input-container>
                <input-container>
                    <label>Description</label>
                    <textarea v-on:change="storeDesc(session.task.desc)" id="desc" required placeholder="Task Description"
                        v-model="session.task.desc"></textarea>
                </input-container>
                <input-container>
                    <label>Time estimations</label>
                    <input type=number v-on:change="storeEst(session.task.est)" id="est" required
                        placeholder="Task Time estimation" v-model="session.task.est"></input>
                </input-container>
                <input-container>
                    <label for="taskSkill">What skill does this task need?</label>
                    <select v-on:change="storeSkill(session.task.skill)" required name="taskSkill"
                        id="taskSkill" v-model="session.task.skill">
                        <option v-for="skill in skills" v-bind:value="skill"> {{skill}}</option>
                        <input-container>
                            <input v-model="newSkill"></input>
                            <div v-on:click="addSkill">
                                <button class="raised primary">+</button>
                            </div>
                        </input-container>
                    </select>
                </input-container>

                <card-actions>
                    <div v-on:click="exit()">
                        <button align="start" class="raised primary">
                            Return
                        </button>
                    </div>


                    <button v-on:mouseover="whatsNeeded(session.task.est)" align="end" class="raised primary"
                        :disabled="!session.task.valid">
                        <div v-on:click="postTask(session.task)">Add Task</div>
                    </button>
                </card-actions>
            </card-content>
        </card>
    </div>
</div>
  -->
</template>
<script src='./task.ts' />
