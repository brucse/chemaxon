const { sync } = require('./synchronize')
sync()
.then(() => {
    console.log('db synchronized')
}).catch((e) => {
    console.error('db synchronization error', e)
})