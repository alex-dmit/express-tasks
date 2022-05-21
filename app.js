const express = require('express')
const app = express()
const fs = require('fs')

// middleware
function logger(req, res, next) {
    const method = req.method
    const pathname = req.path
    const ip = req.ip
    try {
        fs.appendFileSync('./log.txt', `Method ${method} to the route ${pathname} from ${ip} at ${new Date()}\n`)
        next()
    } catch (error) {
        console.error(error)
    }
}

app.use(express.json())

app.get('/api/hello', (req, res) => {
    req.ip
    res.send('Hello world')
})

app.post('/api/getfullname', (req, res) => {
    const name = req.body.name
    const surname = req.body.surname
    // ...
    res.send(`<h1>${name[0].toUpperCase() + name.slice(1).toLowerCase()} ${surname[0].toUpperCase() + surname.slice(1).toLowerCase()}</h1>`)
    // res.send(req.body)
})

app.get('/userprofile', (req, res) => {
    const userInfo = req.query
    console.log(userInfo);
    if (!userInfo.name) return res.send('<h3>Name required</h3>')
    if (!userInfo.surname) return res.send('<h3>Surname required</h3>')
    if (!userInfo.email) return res.send('<h3>Email required</h3>')
    if (!userInfo.phone) return res.send('<h3>Phone required</h3>')
    if (!/^[\w\.\-]+@[\w\.\-]+\.[a-zA-Z]{2,5}$/.test(userInfo.email)) return res.send('<h3>Wrong email</h3>')
    const html = `
    <h1>${userInfo.name + ' ' + userInfo.surname}</h1>
    <h2>${userInfo.email}</h2>
    <h2>${userInfo.phone}</h2>
    `
    res.send(html)
})

// Resource Restful API
// CRUD (Create - POST, Read - GET, Update - PATCH/PUT, Delete - DELETE)
// Entity (товар, message)

// middleware chain
// app.get('/api/chat', logger, (req, res) => {
//     const messages = fs.readFileSync('./messages.txt', 'utf8').split('|')
//     res.send(`<ul>${messages.reduce((acc, cur) => acc + `<li>${cur}</li>`, '')}</ul>`)
// })
app.get('/api/chat', logger, (req, res) => {
    const messages = fs.readFileSync('./messages.txt', 'utf8').split('|')
    res.send(messages)
})

app.post('/api/chat', logger, (req, res) => {
    const message = req.body.message
    const messages = fs.readFileSync('./messages.txt', 'utf8')
    fs.writeFileSync('./messages.txt', messages + '|' + message)
    res.status(201).send('Ok')
})

app.get('/api/chat/:index', logger, (req, res) => {
    const index = req.params.index
    const messages = fs.readFileSync('./messages.txt', 'utf8').split('|')
    res.send(messages[+index])
})

app.delete('/api/chat/:index', logger, (req, res) => {
    const index = req.params.index
    const messages = fs.readFileSync('./messages.txt', 'utf8').split('|')
    const newMessages = [...messages.slice(0, +index), ...messages.slice(+index + 1)]
    fs.writeFileSync('./messages.txt', newMessages.join('|'))
    res.send('Successful delete')
})

app.patch('/api/chat/:index', logger, (req, res) => {
    const index = req.params.index
    const message = req.body.message
    const messages = fs.readFileSync('./messages.txt', 'utf8').split('|')
    messages[+index] = message
    fs.writeFileSync('./messages.txt', messages.join('|'))
    res.send('Successful update')
})

app.use(express.static('./public'))

app.listen(3000)