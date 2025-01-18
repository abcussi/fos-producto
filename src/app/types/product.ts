export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  sellerId?: string;
  condominium?: string;
  images: string[];
  createdAt?: string;
  updatedAt?: string;
}
export type ProductFormData = FormData | Partial<Product>;
export interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  isAuthenticated: boolean;
}

export interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  refreshProducts: () => Promise<void>;
  createProduct: (data: ProductFormData) => Promise<void>;
  updateProduct: (id: string, data: FormData) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}
export interface ProductFormProps {
  product?: Product;
  onSubmit: (data: FormData) => Promise<void>;
  onClose: () => void;
}