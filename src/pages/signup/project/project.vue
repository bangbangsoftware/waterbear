<template>
<v-flex xs12 md6 offset-md3>
    <v-card>
        <v-toolbar class="indigo" dark>
            <v-toolbar-title>Project Details</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <span class="title">A few details</span>
            <h6 v-if="error" class="errorMessage">{{ error }}</h6>
            <h6 v-if="session.error" class="errorMessage"> {{ session.error }}</h6>
            <form v-on:keyup.enter="error = project(projectName, projectDesc)">
                <v-text-field label="What is the project called?" class="mt-5" v-model="projectName"
                    id="projectName" required></v-text-field>
                <v-text-field  v-on:keyup.enter="error = project(projectName, projectDesc)" label="project description" hint="What problem is the project solving"
                    id="projectDesc" v-model="projectDesc"></v-text-field>
            </form>
        </v-card-text>
        <v-card-actions>
            <div v-on:click="error = project(projectName, projectDesc)">
                <v-btn class="v-raised v-primary">Next</v-btn>
            </div>
        </v-card-actions>

    </v-card>
</v-flex>
</template>
<script src='./project.ts'>
</script>
