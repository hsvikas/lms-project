const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'your_jwt_secret';

exports.sign = (payload) => jwt.sign(payload, secret, { expiresIn: '7d' });
exports.verify = (token) => jwt.verify(token, secret);