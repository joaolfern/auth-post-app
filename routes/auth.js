const router = require('express').Router()
const verify = require('./verifyToken')
const multer = require('multer')
const multerConfig = require('../config/multer')

const userController = require('../controllers/userController')
const { get } = require('mongoose')

router.get('/', userController.index)
router.get('/profile', verify, userController.profile)
router.post('/register', userController.store)

router.post('/image', multer(multerConfig).single('photo'), userController.imageStore)
router.get('/images', userController.imageIndex)

router.get('/:id', userController.search)
router.delete('/:id', userController.delete)
router.patch('/:id', userController.update)
router.post('/login', multer(multerConfig).single('photo'), userController.login)
router.patch('/follow/:id', verify, userController.follow)
router.patch('/unfollow/:id', verify, userController.unfollow)

module.exports = router