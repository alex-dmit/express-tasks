const { PrismaClient } = require('@prisma/client')
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

// Resource Restful API
// CRUD (Create - POST, Read - GET, Update - PATCH/PUT, Delete - DELETE)
// Entity (товар, message)

// middleware chain
// app.get('/api/chat', logger, (req, res) => {
//     const messages = fs.readFileSync('./messages.txt', 'utf8').split('|')
//     res.send(`<ul>${messages.reduce((acc, cur) => acc + `<li>${cur}</li>`, '')}</ul>`)
// })

const db = new PrismaClient()

app.get('/api/chat', logger, async (req, res) => {
    const messages = await db.message.findMany()
    res.send(messages)
})

app.post('/api/chat', logger, (req, res, next) => {
    const body = req.body
    const { text, ...rest } = body
    if (typeof text === 'string' && Object.keys(rest).length === 0) {
        next()
    } else {
        res.status(400).send({
            error: "Wrong body"
        })
    }
}, async (req, res) => {
    const message = req.body // { text: 'Hello', awfulcode: 'Haha', test: 'reter' }
    const messageFromDb = await db.message.create({
        data: message
    })
    res.status(201).send(messageFromDb)
})

app.get('/api/chat/:id', logger, async (req, res) => {
    const id = req.params.id
    const messageFromDb = await db.message.findUnique({
        where: {
            id: +id
        }
    })
    res.send(messageFromDb)
})

app.delete('/api/chat/:id', logger, async (req, res) => {
    const id = req.params.id
    try {
        const messageFromDb = await db.message.delete({
            where: { id: +id }
        })
        res.send(messageFromDb)
    } catch (error) {
        res.status(400).send({
            error: "Wrong Id"
        })
    }
})

app.patch('/api/chat/:id', logger, async (req, res) => {
    const id = req.params.id
    const message = req.body
    try {
        const messageFromDb = await db.message.update({
            where: { id: +id },
            data: message
        })
        res.send(messageFromDb)
    } catch (error) {
        res.status(400).send({
            error: "Wrong Id"
        })
    }
})

app.use(express.static('./public'))

app.listen(3000)