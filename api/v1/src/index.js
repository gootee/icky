// let i = 0
import 'dotenv/config'
import cors from 'cors'
import models from './models'
import routes from './routes'
import express from 'express'

// setInterval(() => {
//   console.log('iteration:' + i)
//   i++
// }, 1000)




const app = express()

app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1],
  }
  next()
})
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use((req, res, next) => {
  req.me = req.context.models.users[1]
  next()
})

app.use('/session', routes.session)
app.use('/users', routes.user)
app.use('/messages', routes.message)
app.use('/businesses', routes.business)

app.listen(process.env.PORT, () => {
  debugger
  console.log(`Example app listening on port ${ process.env.PORT }!`)
})