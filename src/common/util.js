const comp = {}

comp.today = (d, now = new Date()) => {
    if (now.getUTCDate() !== d.getUTCDate()) {
        return false
    }
    if (now.getUTCMonth() !== d.getUTCMonth()) {
        return false
    }
    if (now.getUTCFullYear() !== d.getUTCFullYear()) {
        return false
    }
    return true
}

export default comp
