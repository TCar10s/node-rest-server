/*
    Este archivo contendrá todas las configuraciones de las rutas.

    Además, solo deberá contener la ruta y la protección de las mismas,
    todos los callbacks donde se encuentra la lógica estarán en una
    carpeta llamada controllers.
*/

const { Router } = require('express');
const {
  getUsers,
  updateUser,
  postUser,
  deletUser,
  patchUser,
} = require('../controllers/users.controller');

const router = Router();

router.get('/', getUsers);

router.put('/:id', updateUser);

router.post('/', postUser);

router.delete('/', deletUser);

router.patch('/', patchUser);

module.exports = router;
