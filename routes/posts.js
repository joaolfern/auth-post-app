const router = require('express').Router()
const postController = require('../controllers/postController')
const verify = require('./verifyToken')

router.get('/profile/', verify, postController.profile)
router.get('/', verify, postController.index)
router.post('/', verify, postController.store)
router.get('/:match', postController.search)
router.delete('/:id', postController.delete)
router.patch('/:id', postController.update)

module.exports = router