import path from 'node:path'
import * as dotenv from 'dotenv'
dotenv.config({path:path.join("./src/config/.env.pood")})
import bootstrap from './src/app.controller.js'
import express from 'express'
// import { sendEmail } from './src/utils/email/send.email.js'
const app = express()
const port = process.env.PORT || 8000


bootstrap(app,express)

// await sendEmail({to:"osama01.business@gmail.com",html:'<h1>Welcome Email node.js</h1>'})
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))