<template>
  <v-layout id="sprint" v-if="session.project.current.sprintIndex > -1">
    <v-flex xs6> <backlog></backlog> </v-flex>
    <v-flex xs6 v-if="session.planState === 'sprintCreate'">
      <sprint-create></sprint-create>
    </v-flex>
    <v-flex xs6 v-else> <select-sprint></select-sprint> </v-flex>
    <v-flex xs6 v-if="session.planState === 'task'"> <task></task> </v-flex>
    <v-flex v-if="session.planChartData" gutter>
      <div class="elevation-1">
        <div flex-xsmall="100" flex-small="50" flex-medium="33">
          <balance-chart></balance-chart>
        </div>
        <div flex-xsmall="100" flex-small="50" flex-medium="33">
          <spare-chart></spare-chart>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>
<script src="./sprint.ts">
</script>
