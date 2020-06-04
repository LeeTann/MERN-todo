const mongoose = require('mongoose')

const connectMongoDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    })

    console.log(`MongoDB Connect: ${connect.connection.host}`.blue.underline.bold)
  } catch (error) {
    console.log(error.red.bold)
    process.exit(1)
  }
}

module.exports = connectMongoDB