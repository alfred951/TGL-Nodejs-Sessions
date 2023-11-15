const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader === process.env.API_TOKEN) {
        next();
    } else {
        res.status(401).send('Unauthorized')
    }
}

module.exports = authMiddleware;