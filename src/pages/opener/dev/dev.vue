<template v-if='session.loaded'>
<div>
    <v-layout>
        <v-spacer></v-spacer>
        <v-flex xs12>
            <v-card>
                <v-card-media src="/static/doc-images/cards/desert.jpg" height="200px">
                </v-card-media>
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">Greetings {{session.user.nick}}.</h3>
                        <div>{{sprint.name}}</div>
                    </div>
                </v-card-title>
                <v-card-actions >
                    <v-btn v-if="sprint.defined" flat class="margin-right" color="orange">Go to dashboard</v-btn>
                    <v-btn v-else flat color="orange">Define Sprint</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
        <v-flex v-if="sprint.defined" xs6>
            <blockers></blockers>
        </v-flex>
    </v-layout>
    <v-layout>
        <v-flex v-if="sprint.defined" xs12>
            <condition></condition>
        </v-flex>
    </v-layout>
</div>
</template>
<script src="./dev.js"></script>
