<template>
<div>
    <v-hover>
        <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto"
            width="90%" v-if="feeds.length > 0">
            <v-toolbar class="white--text green" dark>
                <v-toolbar-title>The Feed...</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>

            <v-card-text>
                <v-card v-for="(item, index) in feeds" v-bind:key="index">
                    <v-toolbar class="white">
                        <v-toolbar-title>{{ item.date | time }} - {{ item.message }}</v-toolbar-title>
                    </v-toolbar>
                </v-card>
            </v-card-text>
        </v-card>
    </v-hover>
</div>
</template>
<script src='./feed.ts' />
