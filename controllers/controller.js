const db = require('../config/database')
const Cliente = db.Cliente;
const {QueryTypes} = require('sequelize')
exports.createCliente = (req,res) => {
  let cliente = {};

  try {
    
    cliente.nome = req.body.nome;
    cliente.email = req.body.email;
    cliente.idade = req.body.idade;

    Cliente.create(
      cliente, {
        atributes: ['id','nome','email','idade']})
        .then(result => {
        res.status(200).json(result)
      });
    

  } catch (error) {
    res.status(500).json({
      message: "Error!",
      error: error.message
    })
  }
}

exports.getCliente = (req,res) => {

  Cliente.findByPk(
    req.params.id,
    {
      atributes: ['id','nome','email','idade']
    }).then( cliente => {
      res.status(200).json(cliente)
      })
      .catch(error => {

        console.log(error);

      res.status(500).json({
        message: 'Error',
        error
      })
      })
}

exports.clientes = (req,res) => {

  try {

    Cliente.findAll({
      atributes: ['id','nome','email','idade']
    }).then(clientes => {
      res.status(200).json(clientes);
      })

    // Raw query example
    // Cliente.sequelize.query('select * from clientes',{ type: QueryTypes.SELECT })
    // .then(clientes => {
    //      res.status(200).json(clientes);
    // })
    
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: 'Error',
      error
    })
  }

}

exports.updateCliente = async(req, res) => {

  try {
    
    let clientId = req.params.id;
    let cliente = await Cliente.findByPk(clientId)

    if(!cliente){
      res.status(404).json({
        error: '404',
        message: "Não existe nenhum cliente com este id"
      })
    }else {

      let updateObject = {
        nome: req.body.nome,
        email: req.body.email,
        idade: req.body.idade
      }

      await Cliente.update(
        updateObject, 
        {
          returning: true,
          where: {id: clientId},
          atributes: ['id', 'nome', 'email', 'idade']
        }
        )

      res.status(200).json('cliente atualizado com sucesso')
    }

  } catch (error) {
    res.status(500).json({
      error:'error',
      message: error.message
    })
  }

}


exports.deleteCliente = async (req,res) => {
  try {
    
    let clientId = req.params.id;
    let cliente = await Cliente.findByPk(clientId)

    if(!cliente){
      res.status(404).json({
        error: '404',
        message: "Não existe nenhum cliente com este id"
      })
    }else {
      await cliente.destroy();
      res.status(200).json('cliente deletado com sucesso')
    }


  } catch (error) {
    res.status(500).json({
      error:'error',
      message: error.message
    })
  }
}


