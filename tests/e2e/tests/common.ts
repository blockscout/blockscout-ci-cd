import semver from 'semver'
const c = require('ansi-colors')

export const shouldRunWithRelease = (tag: string, minVerTag: string): boolean => {
    if (semver.gt(tag, minVerTag)) {
        return true
    }
    console.log(c.yellow(`test is skipped because it's too early, current tag is less than required`))
    return false
}
