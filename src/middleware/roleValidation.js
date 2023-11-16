const userService = require('../services/user')

const authorize = (requiredRole) => {
    return async (req, res, next) => {
        const userId = req.session.userId;
        try {
            const user = await userService.getUser(userId)
            if (user && user.role === requiredRole) {
                next();
            } else {
                return res.status(403).send('Forbidden')
            }
        } catch {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = authorize;