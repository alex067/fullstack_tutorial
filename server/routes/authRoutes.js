const passport = require('passport');

module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
        })
    );
    
    app.get('/auth/google/callback',
        passport.authenticate('google'),
        // redirect user after successful login
        (req,res) => {
            res.redirect('/surveys');
        }
    );

    app.get('/api/logout', (req, res) => {
        console.log(req)
        // passport auto attaches this function logout, to detatch the cookie
        req.logout();
        res.redirect("/");
    })

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });

}

