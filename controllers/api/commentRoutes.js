const router = require('express').Router();
const {Comments, Posts, Users} = require('../../models');

router.get('/', async (req, res) => {
    const comments = await Comments.findAll({include: {model: Posts}}).catch((err) =>{
        res.json(err);
    });
    res.json(comments);
});

router.post('/', async (req, res) => {

    const userData = await Users.findByPk(req.session.user_id);
    const user = userData.get({plain: true});

    req.body.username = user.name;

    const newComment = await Comments.create(req.body).catch((err) => {
        res.status(400).json(err);
    });

    res.status(200).json(newComment);
});

router.put('/:id', async (req,res) => {
    const updatedComment = await Comments.update(req.body, {
        where:{
            id: req.params.id
        }
    }).catch((err) => {
        res.status(400).json(err);
    });

    res.status(200).json(updatedComment);
});

router.delete('/:id', async (req,res) => {
    const deletedComment = await Comments.destroy({
        where:{
            id: req.params.id
        }
    }).catch((err) => {
        res.status(400);
    });

    if(!deletedComment){
        res.status(404).json({message: "Comment deletion failed"});
        return;
    }

    res.status(200).json({message: "Comment deleted"});
});

module.exports = router;