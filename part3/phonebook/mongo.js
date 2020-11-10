const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as argument. Optionally you can also provide a name and number to add a new contact to the db: node mongo.js <password> <name> <number>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://admin:${password}@cluster.su8qm.mongodb.net/phonebook-app?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const contactSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Contact = mongoose.model('Contact', contactSchema)

if(process.argv.length === 3) {
  Contact.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(contact => {
      console.log(contact.name, contact.number)
    })
    mongoose.connection.close()
  })
}

if(process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const contact = new Contact({
    name: name,
    number: number
  })

  contact.save().then(result => {
    console.log(`added ${name} ${number} to phonebook`)
    mongoose.connection.close()
  })
}