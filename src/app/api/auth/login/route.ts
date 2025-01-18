// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import fs from 'fs/promises';
import path from 'path';
import Cookies from 'js-cookie';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const usersFile = await fs.readFile(path.join(process.cwd(), 'src/app/api/users.json'), 'utf-8');
    const { users } = JSON.parse(usersFile);

    const user = users.find((u: any) => u.email === email);

    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        name: user.name
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    Cookies.set('token', token, {
      expires: 7,
      path: '/',
      secure: process.env.NODE_ENV === 'production', // solo HTTPS en producción
      sameSite: 'strict'
    });

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}