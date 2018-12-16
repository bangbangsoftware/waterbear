<template>
<v-layout>
    <v-flex xs12 sm6 offset-sm3 v-if="!session.loaded">
        <v-card>
            <v-img class="green--text" height="200px" src="/static/tardi.jpg">
                <v-container fill-height fluid>
                    <v-layout fill-height>
                        <v-flex xs12 align-end flexbox>
                                <span class="headline">Waterbear</span>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-img>
            <div>Get a project up and running</div>
            <v-card-title primary-title>
                <h6 v-if="error" class="errorMessage">{{ error }}</h6>
                <h6 v-if="session.error" class="errorMessage"> {{ session.error }}</h6>

                <v-card-text>
                    <v-text-field autofocus label="Email " v-model="email" required></v-text-field>
                    <v-text-field v-on:keyup.enter="error = login(email,pw)" label="Password " v-model="pw"
                        type="password" required></v-text-field>
                    <v-text-field label="Database" v-model="session.couchURL" required></v-text-field>
                </v-card-text>
            </v-card-title>
            <v-card-actions>
                <router-link to="/start">
                    <v-btn flat class="orange--text">No Login? Quick Start</v-btn>
                </router-link>
                <v-btn v-on:click="error = login(email,pw)" flat class="orange--text">Login</v-btn>
            </v-card-actions>
        </v-card>
    </v-flex>
</v-layout>
</template>
<script src='./login'>
</script>
