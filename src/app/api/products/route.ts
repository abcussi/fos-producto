import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '../middleware/auth';

const productsFilePath = path.join(process.cwd(), 'src/app/api/productsTemp.json');

const readProducts = () => {
  const data = fs.readFileSync(productsFilePath, 'utf-8');
  return JSON.parse(data);
};

const writeProducts = (products: any[]) => {
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf-8');
};

export async function GET() {
  const products = readProducts();
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const isAuthorized = verifyJWT(authHeader);

  if (!isAuthorized) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const body = await req.json();
  const products = readProducts();
  products.push({ ...body, createdAt: new Date(), updatedAt: new Date() });
  writeProducts(products);

  return NextResponse.json({ message: 'Product added' }, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const isAuthorized = verifyJWT(authHeader);

  if (!isAuthorized) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return new NextResponse('Product ID is required', { status: 400 });
  }

  const products = readProducts();
  const updatedProducts = products.filter((product: any) => product.id !== id);
  writeProducts(updatedProducts);

  return NextResponse.json({ message: 'Product deleted' });
}

export async function PATCH(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const isAuthorized = verifyJWT(authHeader);

  if (!isAuthorized) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const updates = await req.json();

  if (!id) {
    return new NextResponse('Product ID is required', { status: 400 });
  }

  const products = readProducts();
  const index = products.findIndex((product: any) => product.id === id);

  if (index === -1) {
    return new NextResponse('Product not found', { status: 404 });
  }

  products[index] = { ...products[index], ...updates, updatedAt: new Date() };
  writeProducts(products);

  return NextResponse.json({ message: 'Product updated' });
}
