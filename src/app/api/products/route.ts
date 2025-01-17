import fs from 'fs';
import { writeFile } from 'fs/promises';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '../middleware/auth';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

const productsFilePath = path.join(process.cwd(), 'src/app/api/productsTemp.json');
const imagesDirectory = path.join(process.cwd(), 'public/images');

if (!fs.existsSync(imagesDirectory)) {
  fs.mkdirSync(imagesDirectory, { recursive: true });
}

const readProducts = (): Product[] => {
  try {
    const data = fs.readFileSync(productsFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading products:', error);
    return [];
  }
};

const writeProducts = (products: Product[]) => {
  try {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing products:', error);
    throw new Error('Failed to write products to file');
  }
};

const deleteImage = (imagePath: string) => {
  const fullPath = path.join(process.cwd(), 'public', imagePath);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
};

const handleImageUpload = async (image: File, productId: string): Promise<string> => {
  try {
    const extension = image.name.split('.').pop() || 'jpg';
    const filename = `product-${productId}.${extension}`;
    const imagePath = path.join(imagesDirectory, filename);
    
    await writeFile(imagePath, Buffer.from(await image.arrayBuffer()));
    return `/images/${filename}`;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
};

export async function GET() {
  try {
    const products = readProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const image = formData.get('image') as File | null;
    
    const id = Date.now().toString();
    
    let imagePath: string | null = null;
    if (image) {
      imagePath = await handleImageUpload(image, id);
    }

    const newProduct: Product = {
      id,
      name: formData.get('name') as string,
      price: parseInt(formData.get('price') as string),
      category: formData.get('category') as string,
      images: imagePath ? [imagePath] : [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const products = readProducts();
    products.push(newProduct);
    writeProducts(products);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
export async function PATCH(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    let updates: any = {};
    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      try {
        const formData = await req.formData();
        for (const [key, value] of formData.entries()) {
          if (key === 'image') {
            const file = value as File;
            updates.images = [await handleImageUpload(file, id)];
          } else if (key === 'price') {
            // Convertir price a número, usando 0 como valor por defecto si es inválido
            updates[key] = parseFloat(value as string) || 0;
          } else {
            updates[key] = value;
          }
        }
      } catch (error) {
        console.error('Error processing formData:', error);
        return NextResponse.json(
          { error: 'Error processing form data' },
          { status: 400 }
        );
      }
    } else {
      updates = await req.json();
      // También manejar el precio en caso de JSON
      if (updates.price) {
        updates.price = parseFloat(updates.price) || 0;
      }
    }

    const products = readProducts();
    const productIndex = products.findIndex((p: any) => p.id === id);

    if (productIndex === -1) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Asegurarse de que el precio sea un número antes de guardar
    if (updates.price !== undefined) {
      updates.price = parseFloat(updates.price) || 0;
    }

    products[productIndex] = {
      ...products[productIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    writeProducts(products);

    return NextResponse.json(products[productIndex]);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const products = readProducts();
    const product = products.find((p) => p.id === id);

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Delete associated image if it exists
    if (product.images?.[0]) {
      deleteImage(product.images[0]);
    }

    const updatedProducts = products.filter((p) => p.id !== id);
    writeProducts(updatedProducts);

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}