const express = require('express')
const app = express()
const fs = require('fs')

function logger(req, res, next) {
    const method = req.method
    const pathname = req.path
    const ip = req.ip
    console.log('Logger')
    console.log(method)
    console.log(pathname)
    console.log(ip)
    new Date()
    // Method GET to the route /api/chat from IP: 127.0.0.1 at 11:21
    next()
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

// middleware chain
app.get('/api/chat', logger, (req, res) => {
    const messages = fs.readFileSync('./messages.txt', 'utf8').split('|')
    res.send(`<ul>${messages.reduce((acc, cur) => acc + `<li>${cur}</li>`, '')}</ul>`)
})

app.post('/api/chat', logger, (req, res) => {
    const message = req.body.message
    const messages = fs.readFileSync('./messages.txt', 'utf8')
    fs.writeFileSync('./messages.txt', messages + '|' + message)
    res.status(201).send('Ok')
})



app.listen(3000)