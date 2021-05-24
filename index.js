const express = require("express")
const cors = require("cors")
const requestLogger = require("./middleware/requestLogger")
const app = express()

app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>")
})

app.get("/api/images/:id", (request, response) => {
  const id = Number(request.params.id)
  // const image = images.find(image => image.id === id)
  // add if/else to check if image exists
  response.send(id)
})

// app.delete

app.post("/api/images", (request, response) => {
  const image = request.body
  response.json(image)
})

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)