function auth(req, res, next) {
    if(req.isAuthenticated()) {        
        return next()
    }

    return res.send('Please Login')
}

module.exports = auth 