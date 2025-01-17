import jwt from 'jsonwebtoken';

export function verifyJWT(authHeader: string | null): boolean {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }

  const token = authHeader.split(' ')[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    return true;
  } catch {
    return false;
  }
}
