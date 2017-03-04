import feed from 'src/components/feed/feed'
import store from 'src/store.js'

describe('feed.vue', () => {
   it('should have a feed array', () => {
      const data = feed.data()
      expect(data.feeds.length).to.equal(0)
   })

   it('should respond to a feed change', () => {
      store.commit('log', 'bang')
      const data = feed.data()
      expect(data.feeds.length).to.equal(1)
   })

   it('should render birthday time correctly using filter ', () => {
      const time = feed.filters.time
      const birthday = new Date(2017, 7, 21, 8, 0, 1, 666)
      expect(time(birthday)).to.equal('08:00:01')
   })

   it('should render xmas time correctly using filter ', () => {
      const time = feed.filters.time
      const birthday = new Date(2017, 12, 25, 0, 1, 0, 0)
      expect(time(birthday)).to.equal('00:01:00')
   })
})
