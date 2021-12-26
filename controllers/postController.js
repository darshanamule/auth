const Post = require('../models/post')

function postController() {
    return {
        async readPost(req, res) {
            try{
                const posts = await Post.find()
                res.send(posts)

            }catch(err) {
                console.log(err);
            } 
        },

        async createPost(req, res) {
            const postContent = req.body.postContent
            try {
                const post = new Post({
                    userId : req.user,
                    postContent: postContent
                })

                postSaved = await post.save()
                res.send(postSaved)

            } catch (err) {
                res.send(err)
            }
        },

        async updatePost(req, res) {
            const postId = req.params.id 
            const updatedContent = req.body.updatedContent

            try {
                const post = await Post.findById(postId)
                post.postContent = updatedContent;

                if(!(String(post.userId) === String(req.user._id ))) {
                    return res.send("You cannot Update other's posts")
                }

                updatedPost = await post.save()
                res.send(updatedPost)

            } catch (err) {
                res.send(err)
            }
        },

        async deletePost(req, res) {
            const postId = req.params.id
            try {
                const post = await Post.findById(postId)

                if(!(String(post.userId) === String(req.user._id ))) {
                    return res.send("You cannot Delete other's posts")
                }

                const postDel = await Post.findByIdAndDelete(postId)

                res.send('post deleted... ')
            } catch (err) {
                res.send(err)
            }
        },

        async addLike(req, res) {
            const postId = req.params.id

            try {
                const post = await Post.findById(postId)
                let likes = post.likes
                post.likes = ++likes

                const postUp = await post.save()
                res.send(postUp)

            } catch (err) {
                res.send(err)
            }
        },

        async addComment(req, res) {
            const postId = req.params.id
            const comment = req.body.comment

            try {
                const post = await Post.findById(postId)
                post.comments.push(comment)

                const postUp = await post.save()
                res.send(postUp)

            }catch(err) {
                res.send(err)
            }
        }

    }
}

module.exports = postController