const mongoose = require("mongoose")

const mdbParams = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }
mongoose.connect(process.env.MONGODB_URI, mdbParams)
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch(error => {
    console.error("error connecting", error.message)
  })

const imageSchema = new mongoose.Schema({
  imageUrl: String,
  altText: String,
  redBubbleUrl: String,
  stockUrl: String
})

imageSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Image', imageSchema)