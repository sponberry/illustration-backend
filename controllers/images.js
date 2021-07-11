const imageRouter = require("express").Router()
const { response } = require("express")
const Image = require("../models/images")

imageRouter.get("/", (request, response) => {
  Image.find({})
    .then(images => {
      response.json(images)
    })
})

imageRouter.get("/:id", (request, response) => {
  Image.findById(request.params.id)
    .then(imageData => {
      if (imageData) {
        response.json(imageData)
      }
      else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })    
    })
})

imageRouter.delete("/:id", (request, response, next) => {
  Image.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

imageRouter.post("/", (request, response, next) => {
  const body = request.body
  console.log(body)
  if (!body.url) {
    return response.status(400).json({
      error: "image url missing"
    })
  }
  const image = new Image({
    imageUrl: body.url,
    altText: body.altText || "",
    redBubbleUrl: body.redBubble || "",
    stockUrl: body.stock || "",
  })
  image.save()
    .then(savedImage => {
      response.status(201).json(savedImage)
    })
    .catch(error => next(error))
})

imageRouter.put("/:id", (request, response, next) => {
  const body = request.body

  if (body.redBubble){
    Image.findByIdAndUpdate(
      request.params.id, { redBubbleUrl: body.redBubble }, { new: true }
    ).then(updatedImage => {
      response.json(updatedImage)
    })
    .catch(error => next(error))
  }

  if (body.stock){
    Image.findByIdAndUpdate(
      request.params.id, { stockUrl: body.stock }, { new: true }
    ).then(updatedImage => {
      response.json(updatedImage)
    })
    .catch(error => next(error))
  }
})

module.exports = imageRouter