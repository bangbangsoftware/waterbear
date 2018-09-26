<link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic"/>
<link rel="stylesheet" href="//fonts.googleapis.com/icon?family=Material+Icons" />
<style scoped src="./signup.css">
</style>
<script src="./signup.js">
</script>
<template >
<v-container fluid grid-list-md class="grey lighten-4">
    <v-layout row wrap>
        <v-flex>
            <v-card-text>
                <p v-if="stages.length === 0" class="text-lg-right">
                    <start></start>
                </p>
                <p v-if="stages.length === 1" class="text-lg-right">
                    <project></project>
                </p>
                <p v-if="stages.length === 2" class="text-lg-right">
                    <owner></owner>
                </p>
                <p v-if="stages.length === 3" class="text-lg-right">
                    <team></team>
                </p>
                <feed></feed>
                <!--
	            <project-summary></project-summary>
		    -->
            </v-card-text>
            <v-card-actions v-if="stages.length === 3">
                <div v-on:keyup.enter="error = createuser(email,pw)">
                    <router-link to="/done">
                        <v-btn light>
                            definition of done
                        </v-btn>
                    </router-link>
                    <router-link to="/story">
                        <v-btn light>
                            enter stories
                        </v-btn>
                    </router-link>
                </div>
            </v-card-actions>
        </v-flex>
    </v-layout>
</v-container>
</template>
