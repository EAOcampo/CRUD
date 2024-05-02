const { Router } = require('express');

const { getUsers, getUser, crearUsuario, borrarUsuario, modificarUsuario } = require('../controllers/userControllers');

const router = Router();

router.get('/users', getUsers)

router.get('/users/:id', getUser)

router.post('/users', crearUsuario)

router.delete('/users/:id', borrarUsuario)

router.put('/users/:id', modificarUsuario)



module.exports = router