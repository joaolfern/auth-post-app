const router = require('express').Router()
const postController = require('../controllers/postController')
const verify = require('../middlewares/verifyToken')
const pagination = require('../middlewares/pagination')

router.get('/all', postController.all)
router.get('/profile/:id', postController.index, pagination)
router.get('/', verify, postController.index, pagination)
router.post('/', verify, postController.store)
router.get('/:match', verify, postController.search)
router.delete('/:id', verify, postController.delete)
router.patch('/like/:id', verify, postController.like)
router.patch('/retweet/:id', verify, postController.retweet)
router.get('/explore/:id', postController.explore)

module.exports = router