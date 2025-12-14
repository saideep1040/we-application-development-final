import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' });

  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Email and password required' });

  // Find user
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user)
    return res.status(400).json({ message: 'Invalid email or password' });

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch)
    return res.status(400).json({ message: 'Invalid email or password' });

  // Create JWT
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  // Set cookie
  res.setHeader(
    'Set-Cookie',
    `token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}`
  );

  return res.status(200).json({ message: 'Login successful', user });
}
