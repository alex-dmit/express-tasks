// @ts-check
const { PrismaClient } = require('@prisma/client');
const { PrismaClientKnownRequestError } = require('@prisma/client/runtime');
const express = require('express')
require('express-async-errors')
const app = express()

const { logger, idValidator, bodyValidator } = require('./middleware')

app.use(express.json())

// Resource Restful API
// CRUD (Create - POST, Read - GET, Update - PATCH/PUT, Delete - DELETE)
// Entity (товар, message)

const db = new PrismaClient()

app.get('/api/chat', async (req, res) => {
    const messages = await db.message.findMany()
    res.send(messages)
})

app.post('/api/chat', logger, bodyValidator, async (req, res) => {
    const message = req.body // { text: 'Hello', awfulcode: 'Haha', test: 'reter' }
    const messageFromDb = await db.message.create({
        data: message
    })
    res.status(201).send(messageFromDb)
})

app.get('/api/chat/:id', logger, idValidator, async (req, res) => {
    const id = req.params.id
    const messageFromDb = await db.message.findUnique({
        where: {
            id: +id
        }
    })
    res.send(messageFromDb)
})

app.delete('/api/chat/:id', logger, idValidator, async (req, res, next) => {
    const id = req.params.id
    const messageFromDb = await db.message.delete({
        where: { id: +id }
    })
    res.send(messageFromDb)
})

app.patch('/api/chat/:id', logger, idValidator, bodyValidator, async (req, res) => {
    const id = req.params.id
    const message = req.body
    const messageFromDb = await db.message.update({
        where: { id: +id },
        data: message
    })
    res.send(messageFromDb)
})

app.use(express.static('./public'))

// Error hub
app.use((err, req, res, next) => {
    let message = err.message
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025') {
        message = "Wrong Id"
    }
    res.status(400).send({
        error: message
    })
})

app.listen(3000)