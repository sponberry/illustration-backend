const express = require("express")
const cors = require("cors")
require("dotenv").config()
const requestLogger = require("./middleware/requestLogger")
const app = express()
const imageRouter = require("./controllers/images")

app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>")
})

app.use("/api/images", imageRouter)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})