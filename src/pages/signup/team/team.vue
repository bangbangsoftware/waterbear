<template>
<v-container fluid>
    <v-layout row wrap>
        <v-flex s12 md6 offset-md3>
            <v-card>
                <v-toolbar class="indigo" dark>
                    <v-toolbar-title>About the team</v-toolbar-title>
                </v-toolbar>
                <h6 class="errorMessage" v-if="state.error"> {{ state.error }}</h6>
                <v-card-text>
                    <form v-on:keyup.enter="state = addMember(state.teamName,state.teamRole,state.teamEmail,state.members)">
                        <v-layout row>
                            <v-flex xs8>
                                <v-text-field autofocus id="teamName" label="What is their name?" class="mt-5"
                                    maxlength="100" v-model="state.teamName" required></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs8>
                                <v-text-field  id="teamEmail" label="What is their email?" class="mt-5"
                                    maxlength="100" v-model="state.teamEmail" required></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs6>
                                <v-select v-bind:items="roles" v-model="state.teamRole" label="Select" single-line
                                    bottom></v-select>
                            </v-flex>
                        </v-layout>

                        <v-card-text style="height: 100px; position: relative">
                            <v-btn absolute dark fab top right class="pink" v-on:click="state = addMember(state)">
                                <v-icon>add</v-icon>
                            </v-btn>
                        </v-card-text>
                    </form>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</v-container>
</template>
<script src='./team.ts'>
</script>
