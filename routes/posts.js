const router = require('express').Router()
const postController = require('../controllers/postController')
const verify = require('./verifyToken')

router.get('/profile/', verify, postController.profile)
router.get('/', verify, postController.index)
router.post('/', verify, postController.store)
router.get('/:match', verify, postController.search)
router.delete('/:id', verify, postController.delete)

module.exports = router