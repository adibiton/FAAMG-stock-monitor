export default {
    archive: ({ key, value }) => {
        localStorage.setItem(key, value)
        localStorage.setItem(key + ':ts', Date.now())
    },
    restore: (key) => localStorage.getItem(key),
    purge: (key) => {
        localStorage.removeItem(key)
        localStorage.removeItem(key + ':ts')
    }
}
