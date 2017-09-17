import store from '../../../../store.js'
import template from './storycard.html'
import Actions from './actions/actions'
import AcceptanceCriteriaList from './acceptanceCriteriaList/acceptanceCriteriaList'

const movement = (index, newIndex) => {
    console.log('Moving Story')
    store.commit('moveStory', {
        index,
        newIndex
    })
    const prj = store.state.session.project
    const db = store.state.db
    db.get(prj._id)
        .then(p => {
            p.stories = prj.stories
            return db.put(p)
        })
        .catch(err => console.error(err))
}

export default {
    name: 'storycard',
    props: ['story', 'c', 'end'],
    data: function() {
        return {
            project: store.state.session.project,
            colourClasses: store.state.defaults.colourClasses,
            showMenu: false,
            x: 0,
            y: 0
        }
    },
    methods: {
        show(e) {
            e.preventDefault()
            this.showMenu = true
            this.x = e.clientX
            this.y = e.clientY
        },
        moveTop(i) {
            movement(i, 0)
        },
        moveBottom(i) {
            movement(i, store.state.session.project.stories.length - 1)
        },
        moveDown(i) {
            movement(i, i + 1)
        },
        moveUp(i) {
            movement(i, i - 1)
        }
    },
    components: {
        'actions': Actions,
        'acceptanceCriteriaList': AcceptanceCriteriaList
    },
    template: template
}
