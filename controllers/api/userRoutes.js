const router = require('express').Router();
const {Comments, Posts, Users} = require('../../models');

router.post('/login', async (req, res) => {
    try {
      const userData = await Users.findOne(
        { 
            where: { name: req.body.name } 
        });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'No user with this username' });
        return;
      }
  
    //   const validPassword = await userData.checkPassword(req.body.password);
  
    //   if (!validPassword) {
    //     res
    //       .status(400)
    //       .json({ message: 'Incorrect email or password, please try again' });
    //     return;
    //   }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        console.log(req.session.logged_in);
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });

module.exports = router;