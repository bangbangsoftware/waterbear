import template from './actions.html'

export default {
    name: 'actions',
    template,
    props: ['story'],
    methods: {
        editStory: function() {
            console.log('edit')
        },
        removeStory: function(story) {
            console.log('remove')
        },
        breakStory: function(story) {
            console.log('break')
        }
    }
}
