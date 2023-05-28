const express = require('express')
const bcrypt = require('bcrypt')
const cors = require('cors')
const app = express()
const port = 3001
const users = []

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.json('test')
})

app.get('/users', (req, res) => {
    res.json(users)
})

app.post('/users', async (req, res) => {
    try {
        let password = await bcrypt.hash(req.body.password, 10)
        const user = { email: req.body.email, password }
        users.push(user)
        res.status(201).send()
    } catch (error) {
        res.status(500).send('Oops, something happened')
    }
})

app.post('/users/sigin', async (req, res) => {
    const user = users.find(user => user.email === req.body.email)
    if (!user) {
        return res.status(404).send('Cannot find user')
    }
    try {
        if(await bcrypt.compare(req.body.password, user.password)) {
            res.status(200).send('Success')
        } else {
            res.status(401).send('Unauthorized')
        }
    } catch (error) {
        res.status(500).send('Oops, something happened')
    }
})

app.listen(port, () => {
    console.log(`vanilla api is listening on port ${port}`)
})