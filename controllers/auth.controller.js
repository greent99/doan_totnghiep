const userModel = require('../models/user.model')


module.exports = {
    register: async (req, res) => {
        try{
            const username = req.body.username
            const password = req.body.password
            const phone = req.body.phone
        
            const users = await userModel.getByUsername(username)
            if(users) throw `Existing username: ${req.body.username}`;
            //if(password == "" || confirm == "") throw 'password or repassword not empty'
        
            let user = {
              username: username,
              phone: phone
            }
            userModel.setPassword(password, user)
            
            let newUserId = await userModel.add(user)
            newUser = await userModel.getById(newUserId)
            console.log(newUser)
            if(newUser)
            {
              req.session.isAuth = true
              req.session.authUser = newUser
              let url = req.session.retUrl || '/'
              res.redirect(url)
            }
            else
              throw 'Can not create new account'
        } catch (err) 
        {
              console.log(err);
              res.render('auth', {
                layout: false,
                isRegister: true,
                username: req.body.username,
                password: req.body.password,
                error: err
              });
        }
    },

    login: async (req, res) => {
        try{
            const username = req.body.username
            const inputPassword = req.body.password
        
            const user = await userModel.getByUsername(username)
            if(!user)
              throw 'User not exist'
        
            if(userModel.validPassword(inputPassword, user) == false)
              throw 'Password not correct'
        
            req.session.isAuth = true
            req.session.authUser = user
            
            let url = req.session.retUrl || '/';
            res.redirect(url);
        } catch (err) 
        {
            console.log(err);
            res.render('auth', {
              layout: false,
              username: req.body.username,
              password: req.body.password,
              error: err
            });
        }
    },

    logout: (req, res) => {
      req.session.isAuth = false;
      req.session.authUser = null;
      res.redirect(req.headers.referer);
    },
}

