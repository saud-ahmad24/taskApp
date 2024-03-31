const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.cookies['token'];
    if (!token) {
        return res.redirect('/login');
    }

    jwt.verify(token, 'hithisisSaud', (err, decoded) => {
        if (err) {
            return res.redirect('/login');
        }
        req.userId = decoded.userId;
        next();
    });
};

module.exports = { authenticateToken }