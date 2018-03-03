const DOW = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MOY = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const NORMAL = 0
const OFF = 2

const DS = [{
    state: 0,
    display: '',
    off: false
}, {
    state: 1,
    display: 'WFH',
    off: false
}, {
    state: 2,
    display: 'OFF',
    colour: 'grey',
    off: true
}, {
    state: 3,
    display: 'SICK',
    colour: 'grey',
    off: true
}]

export {DOW, MOY, NORMAL, OFF, DS}

