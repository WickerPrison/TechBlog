const router = require('express').Router();
const {Comments, Posts} = require('../models');

router.get('/', async (req,res) => {
    const postsData = await Posts.findAll().catch((err) => {
        res.json(err);
    });

    const posts = postsData.map((post) => post.get({plain: true}));
    res.render('post', {posts,
    logged_in: req.session.logged_in});
});

router.get('/login', async (req,res) => {
    res.render('login');
});

module.exports = router;