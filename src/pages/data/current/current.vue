<template>
  <div>
    <div class="subhead">current</div>
    <div class="line">
      <v-text-field
        type="number"
        label="Current Sprint Number"
        id="index"
        v-model="project.current.sprintIndex"
        placeholder="Current Sprint Number"
      ></v-text-field>
      <v-label>SPRINT NAME</v-label>
    </div>
  </div>
</template>
<script src="./current.ts" />
