const prisma = require('../services/prisma');
const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');
const { hashPassword } = require('../utils/hash');

exports.register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name }
    });
    res.status(201).json({ message: 'User registered', user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    if (err.code === 'P2002') {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      next(err);
    }
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ userId: user.id });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    next(err);
  }
};