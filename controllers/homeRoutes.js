const router = require('express').Router();
const {Comments, Posts, Users} = require('../models');
const withAuth = require("../utils/auth");

router.get('/', async (req,res) => {
    const postsData = await Posts.findAll().catch((err) => {
        res.json(err);
    });

    const posts = postsData.map((post) => post.get({plain: true}));
    res.render('posts', {posts,
    logged_in: req.session.logged_in});
});

router.get('/posts/:id', async (req,res) => {
    const postData = await Posts.findOne({
        where: {id: req.params.id}
    }).catch((err) => {
        res.json(err);
    });

    const post = postData.get({plain: true});

    const commentsData = await Comments.findAll(
        {
            where: {post_id: req.params.id},
            include: {model: Posts}
        }).catch((err) =>{
        res.json(err);
    });
    const comments = commentsData.map((comment) => comment.get({plain: true}));

    res.render('post', {post, comments,
    logged_in: req.session.logged_in});
});

router.get('/login', async (req,res) => {
    console.log("test");
    res.render('login');
});

router.get('/signUp', async (req,res) => {
    res.render('signUp');
});

router.get('/dashboard', withAuth, async (req,res) => {
    const userData = await Users.findByPk(req.session.user_id);
    const user = userData.get({plain: true});
    
    const postsData = await Posts.findAll({
        where: {username: user.name}
    }).catch((err) => {
        res.json(err);
    });
    
    const posts = postsData.map((post) => post.get({plain: true}));


    res.render('dashboard', {posts, logged_in: req.session.logged_in});
});

module.exports = router;