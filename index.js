const express = require('express')
const cors = require('cors')
const database = require('./config/database');
const router = require('./routes/router');
const db = require('./config/database');
const app = express();

const Cliente = database.Cliente;

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSucessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.json())
app.use('/',router)

async function databaseSync() {
  try {
    await database.sequelize.sync({force:true})
    await Cliente.sync()
    const clientes = [
      {nome: 'Pedro', email: 'predro@email.com', idade: 21},
      {nome: 'Wiliam', email: 'wiliam@email.com', idade: 24},
      {nome: 'Adriano', email: 'adriano@email.com', idade: 31},
    ]
    for (let cliente of clientes) {
      Cliente.create(cliente)
    }
    
  } catch (error) {
      console.log(error)
  }
}

databaseSync()


app.listen('8080',()=> {
  console.log('servidor está rodando na porta 8080')
})