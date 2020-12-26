const router = require('express').Router()
const userController = require('../controllers/userController')
const verify = require('./verifyToken')

router.get('/', userController.index)
router.post('/register', userController.store)
router.get('/:match', userController.search)
router.delete('/:id', userController.delete)
router.patch('/:id', userController.update)
router.post('/login', userController.login)
router.patch('/follow/:id', verify, userController.follow)

module.exports = router