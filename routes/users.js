/*
    Este archivo contendrá todas las configuraciones de las rutas.

    Además, solo deberá contener la ruta y la protección de las mismas,
    todos los callbacks donde se encuentra la lógica estarán en una
    carpeta llamada controllers.
*/

const {Router} = require('express');
const {check, query} = require('express-validator');

const {
    getUsers,
    updateUser,
    postUser,
    deleteUser,
    patchUser,
} = require('../controllers/users.controller');

const {validateFields} = require('../middlewares/validate-fields');
const {validateRole, validateEmail, existUserById} = require('../helpers/db-validators');

const router = Router();

router.get('/', [
        check('from', 'The beginning must be numeric ').if(check('from').exists()).isNumeric(),
        check('limit', 'The limit must be numeric').if(check('limit').exists()).isNumeric(),
        validateFields
    ],
    getUsers);

router.put(
    '/:id',
    [
        check('id', 'Invalid ID parameter').isMongoId(),
        check('id').custom(existUserById),
        check('rol').custom(validateRole),
        validateFields // If everything goes well it will be done in next to updateUser
    ],
    updateUser
);

router.post(
    '/',
    [
        check('name', 'The name is required').not().isEmpty(),
        check('password', 'The password must contain more than 6 letters').isLength(
            {min: 6}
        ),
        // check('email', 'Invalid email').isEmail(),
        check('email').custom(validateEmail).isEmail(),
        check('rol').custom(validateRole),
        validateFields,
    ],
    postUser
);

router.delete('/:id', [
    check('id', 'Invalid ID parameter').isMongoId(),
    check('id').custom(existUserById),
    validateFields
], deleteUser);

router.patch('/', patchUser);

module.exports = router;
