const { verify } = require('jsonwebtoken');

const auth = (req, res, next) => {
    // get token from header
    const token = req.header('x-auth-token');

    //check if not token
    if (!token) {
        return res
            .status(401)
            .json({ msg: 'No token, authorization denied' });
    }

    //verify token
    try {
        const secret = process.env.SECRET;
        verify(token, secret, (error, decoded) => {
            if (error) {
                return res
                    .status(401)
                    .json({ msg: 'Token is not valid' });
            }
            else {
                req.user = decoded.user;
                next();
            }
        });
    } catch (error) {
        return res
            .status(500)
            .json({
                errors: [{
                    msg: 'Something went wrong on the server. Please try again later',
                    error: error.message
                }]
            });
    }
};

module.exports = auth;