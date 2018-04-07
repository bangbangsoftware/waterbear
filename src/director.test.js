import director from './director'
import Vue from 'vue'

describe('director.spec.js', () => {


    it('should direct users of different roles to different places ', done => {
        const dev = {
            role: 'Frontend Dev'
        }
        expect(director(dev)).toBe('work')
        done();
    })

    it('should direct users of different roles to different places ', done => {
        const dev = {
            role: 'Scrum Master'
        }
        expect(director(dev)).toBe('sprint/0')
        done();
    })


});
