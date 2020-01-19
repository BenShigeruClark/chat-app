const path = require('path')
// Create an Express web server
const express = require('express')
// Set up a new Express server
const app = express()
//    -Listen on port 3000
const port = process.env.PORT || 3000
//    -Serve up the public directory
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
