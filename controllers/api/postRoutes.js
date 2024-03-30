const router = require('express').Router();
const {Comments, Posts} = require('../../models');

router.get('/', async (req, res) => {
    const posts = await Posts.findAll({include: {model: Comments}}).catch((err) =>{
        res.json(err);
    });
    res.json(posts);
});

router.post('/', async (req, res) => {
    const newPost = await Posts.create(req.body).catch((err) => {
        res.status(400).json(err);
    });

    res.status(200).json(newPost);
});

router.put('/:id', async (req,res) => {
    const updatedPost = await Posts.update(req.body, {
        where:{
            id: req.params.id
        }
    }).catch((err) => {
        res.status(400).json(err);
    });

    res.status(200).json(updatedPost);
});

router.delete('/:id', async (req,res) => {
    const deletedPost = await Posts.destroy({
        where:{
            id: req.params.id
        }
    }).catch((err) => {
        res.status(400);
    });

    if(!deletedPost){
        res.status(404).json({message: "Post deletion failed"});
        return;
    }

    res.status(200).json({message: "Post deleted"});
});

module.exports = router;