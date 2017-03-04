import Vue from 'vue'
import feed from 'src/components/feed/feed.js'

describe('feed.vue', () => {
   
   it('should have a feed array', () => {
      const data = feed.data()
      expect(data.feed.feeds.length).to.equal(0)
   })

})
