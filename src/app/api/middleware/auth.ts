import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export function verifyJWT(authHeader: string | null): boolean {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }

  const token = authHeader.split(' ')[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    return true;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw NextResponse.json(
        { error: 'Token expirado' },
        { status: 401 }
      );
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw NextResponse.json(
        { error: 'Token inválido' },
        { status: 401 }
      );
    }
    
    console.error('Error al verificar token:', error);
    throw NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}