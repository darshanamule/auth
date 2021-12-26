const express = require('express');
const authController = require('../controllers/authController')
const postController = require('../controllers/postController')
const auth = require('../middlewares/auth')
const router = express.Router();

router.post('/register', authController().postRegister)

router.post('/login', authController().postLogin)

router.post('/forgetPassword', authController().forgetPass)

router.get('/post', postController().readPost)
router.post('/post/create', auth, postController().createPost)
router.patch('/post/:id', auth, postController().updatePost)
router.delete('/post/:id', auth, postController().deletePost)

router.patch('/post/like/:id', auth, postController().addLike)
router.patch('/post/comment/:id', auth, postController().addComment)

module.exports = router;