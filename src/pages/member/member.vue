<template>
  <v-container v-if="session.user" fluid>
    <h6 v-if="session.error" class="error">{{session.error}}</h6>
    <v-card>
      <v-toolbar  class="indigo" dark>
        <v-toolbar-title id="member-tb">
            <div id="detail-title">Detail</div>
            <div id="save-but">
                <v-btn  id="save-but" v-on:click="save()" light>Save</v-btn>
            </div>   
        </v-toolbar-title>
      </v-toolbar>
      <h6 v-if="session.error" class="error">{{ session.error }}</h6>
      <v-card-text>
        <v-layout row wrap>
          <name></name>
        </v-layout>
        <v-layout row>
          <div class="subhead">Skills</div>
          <skills></skills>
        </v-layout>
        <v-layout row wrap>
          <div class="subhead">Normal working hours</div>
          <hours></hours>
        </v-layout>
        <v-card-actions></v-card-actions>
      </v-card-text>
    </v-card>
      <v-toolbar  class="indigo" dark>
        <v-toolbar-title id="member-tb">
            <div id="detail-title">Detail</div>
            <div id="save-but">
                <v-btn  id="save-but" v-on:click="save()" light>Save</v-btn>
            </div>   
        </v-toolbar-title>
      </v-toolbar>

  </v-container>
</template>
<script src='./member.ts'>
</script>
