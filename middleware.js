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

const bodyValidator = (req, res, next) => {
    const body = req.body
    const { text, ...rest } = body
    if (typeof text === 'string' && Object.keys(rest).length === 0) next()
    else next(new Error("Wrong body"))
}

const idValidator = (req, res, next) => {
    if (!isNaN(+req.params.id)) next()
    else next(new Error("Wrong Id"))
}

// CommonJS - nodejs
module.exports = {
    logger,
    idValidator,
    bodyValidator
}