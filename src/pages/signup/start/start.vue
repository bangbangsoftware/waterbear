<template>
<v-container fluid>
    <v-layout row wrap>
        <v-flex s12 md6 offset-md3>
            <v-card>
                <v-toolbar class="indigo" dark>
                    <v-toolbar-title>Quick start up</v-toolbar-title>
                </v-toolbar>
                <h6 class="errorMessage" v-if="session.error"> {{ session.error }}</h6>
                <v-card-text>
                    <v-layout row>
                        <v-flex xs8>
                            <v-text-field autofocus id="email" label="What is you email address?" class="mt-5"
                                maxlength="100" v-model="email" required></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs8>
                            <v-text-field v-on:keyup.enter="error = createUser(email,pw)" label="Enter your password" hint="At least 8 characters"
                                min="8" id="password" type="password" class="input-group--focused"
                                v-model="pw"></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-card-actions>
                        <p class="text-xs-right" v-on:click="error = createUser(email,pw)" v-on:keyup.enter="error = createUser(email,pw)">
                            <v-btn light>Next</v-btn>
                        </p>
                    </v-card-actions>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</v-container>
</template>
<script src='./start.ts' />
