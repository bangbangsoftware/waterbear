import feed from 'src/components/feed/feed.js'

describe('feed.vue', () => {
   it('should have a feed array', () => {
      console.log(feed)
      const data = feed.data()
      expect(data.feed.feeds.length).to.equal(0)
   })

   it('should have a time filter ', () => {
      const time = feed.filters.time
      const birthday = new Date(2017, 7, 21, 8, 0, 1, 0)
      expect(time(birthday)).to.equal('08:00:01')
   })
})
