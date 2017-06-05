import store from '../../../../store.js'
import template from './storycard.html'
import Actions from './actions/actions'
import AcceptanceCriteriaList from './acceptanceCriteriaList/acceptanceCriteriaList'

export default {
    name: 'storycard',
    props: ['story', 'c'],
    data: function() {
      return {
         project: store.state.session.project,
         colourClasses: store.state.defaults.colourClasses
      }
    },
    components: {
        'actions': Actions,
        'acceptanceCriteriaList': AcceptanceCriteriaList
    },
    template: template
}
