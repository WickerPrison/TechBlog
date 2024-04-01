const router = require('express').Router();
const {Comments, Posts, Users} = require('../../models');

router.post('/login', async (req, res) => {
    try {
        console.log(req.body);
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
  
      const validPassword = await userData.checkPassword(req.body.password);
      console.log(validPassword);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
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

  
router.post('/logout', (req,res) => {
    if(req.session.logged_in){
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else{
        res.status(404).end();
    }
});


module.exports = router;