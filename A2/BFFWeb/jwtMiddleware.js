const jwt = require('jsonwebtoken');

function jwtMiddleware(req, res, next) {
    // Get the token from the Authorization header
    const token = req.headers.authorization;

    // Check if the token exists
    if (!token) {
        return res.status(401).json({ message: 'Missing JWT token' });
    }

    // Verify and decode the token
    jwt.verify(token.replace('Bearer ', ''), 'your-256-bit-secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid JWT token' });
        }

        // Store the decoded token in the request object for further use
        req.user = decoded;

        // Move to the next middleware or route handler
        next();
    });
}

module.exports = jwtMiddleware;
