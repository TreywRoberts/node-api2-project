// implement your posts router here
const express = require('express');
const router = express.Router();
const Post = require('./posts-model');


router.get('/', (req, res)=>{
    Post.find()
        .then(posts =>{
            res.status(200).json(posts)
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                message: 'The posts information could not be retrieved'
            })
        })
})

router.get('/:id', (req, res)=>{
    Post.findById(req.params.id)
        .then(post=>{
            if(post){
                res.status(200).json(post);
            } else {
                res.status(404).json({message: 'The post with the specified ID does not exist' })
            }
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                message: 'The posts information could not be retrieved'
            })
        })
})

router.post('/', (req, res)=>{
    const newPost = req.body
    if (!newPost.title || !newPost.contents){
        res.status(400).json({message: 'Please provide title and contents for the post'})
    } else {

        Post.insert(newPost)
        .then(post =>{
            console.log(post)
           
           res.status(201).json(post)
                
        })
        .catch(err=>{
        console.log(err)
        res.status(500).json({
            message: 'The posts information could not be retrieved'
             })
         })
    }
})

router.put('/:id', (req, res)=>{
    const changes = req.body;
    const {id} = req.params
        if(!changes.title || !changes.contents){
            res.status(400).json({message:'Please provide title and contents for the post'})
        }  else {
            Post.update(id, changes)
            .then(post =>{
                 if (!post) {
                    res.status(404).json({message:'The post with the specified ID does not exist'})
                } else {
                    res.status(200).json(post)
                }
            })
            .catch(err=>{
                console.log(err)
                res.status(500).json({
                    message: 'The posts information could not be retrieved'
                     })
            })
        }  
})
router.delete('/:id', (req, res) => {
    const {id} = req.params
    Post.remove(id)
        .then(removed =>{
            if(removed > 0) {
                res.status(200).json({message: 'The post has been deleted'})
            } else {
                res.status(404).json({message:'The post with the specified ID does not exist'})
            }
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                message: 'The posts information could not be removed'
                 })
         })
})

router.get('/:id/comments', (req, res)=>{
    const {id} = req.params
    Post.findCommentById(id)
        .then(post=>{
            if(!post){
                res.status(404).json({ message: "The post with the specified ID does not exist"})
            } else {
                res.status(200).json(post)
            }
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                message: 'The posts information could not be removed'
                 })
         })

})


module.exports = router