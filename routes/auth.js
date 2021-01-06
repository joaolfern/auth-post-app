const router = require('express').Router()
const userController = require('../controllers/userController')
const verify = require('./verifyToken')

router.get('/', userController.index)
router.get('/profile', verify, userController.profile)
router.post('/register', userController.store)
router.get('/:id', userController.search)
router.delete('/:id', userController.delete)
router.patch('/:id', userController.update)
router.post('/login', userController.login)
router.patch('/follow/:id', verify, userController.follow)
router.patch('/unfollow/:id', verify, userController.unfollow)


module.exports = router