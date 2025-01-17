// types/product.ts

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    images: string[];
    sellerId: string;
    condominium: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface ProductFormData {
    name: string;
    description: string;
    price: number;
    category: string;
    images: File[];
    condominium: string;
  }
  
  export interface ProductContextType {
    products: Product[];
    loading: boolean;
    error: string | null;
    createProduct: (data: ProductFormData) => Promise<void>;
    updateProduct: (id: string, data: ProductFormData) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
    refreshProducts: () => Promise<void>;
  }