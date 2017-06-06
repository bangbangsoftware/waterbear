// import store from '../../../storyStore.js'
import template from './actions.html'

export default {
    name: 'actions',
    template,
    props: ['story', 'c'],
    methods: {
        editStory: function(story) {
            console.log('edit')
        },
        removeStory: function(story, c) {
            console.log('remove')
            // store.deleteStory(story, c)
        },
        breakStory: function(story) {
            console.log('break')
        }
    }
}
