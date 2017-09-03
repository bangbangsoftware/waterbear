import store from '../../../../store.js'
import template from './storycard.html'
import Actions from './actions/actions'
import AcceptanceCriteriaList from './acceptanceCriteriaList/acceptanceCriteriaList'

const movement = (index, shift) => {
    console.log('Moving Story')
    store.commit('moveStory', {
        index,
        shift
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
        moveDown(i) {
            movement(i, 1)
        },
        moveUp(i) {
            movement(i, -1)
        }
    },
    components: {
        'actions': Actions,
        'acceptanceCriteriaList': AcceptanceCriteriaList
    },
    template: template
}
