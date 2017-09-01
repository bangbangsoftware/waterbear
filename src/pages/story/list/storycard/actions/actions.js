import store from '../../../../../store.js'
import template from './actions.html'

export default {
    name: 'actions',
    template,
    props: ['story', 'c'],
    methods: {
        editStory: function(story, c) {
            console.log('edit')
            story.index = c
            store.commit('currentStory', story)
        },
        removeStory: function(story, c) {
            console.log('remove')
            store.commit('deleteStory', c)
        },
        breakStory: function(story) {
            console.log('break')
        }
    }
}
