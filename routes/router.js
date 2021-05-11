const {Router} = require('express')

const router = Router();

const clientes = require('../controllers/controller.js');

router.post('/api/cliente', clientes.createCliente);
router.get('/api/cliente/:id', clientes.getCliente);
router.get('/api/clientes', clientes.clientes);
router.put('/api/cliente/:id', clientes.updateCliente);
router.delete('/api/cliente/:id', clientes.deleteCliente);


module.exports = router;