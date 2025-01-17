'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { ProductContextType, Product, ProductFormData } from '../types/product';
import { handleApiError, ApiError } from '../lib/utils/api';
import Cookies from 'js-cookie';

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAuthHeaders = () => {
    return {
      'Authorization': `Bearer token`,
    };
  };

  const refreshProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/products');
      
      if (!response.ok) {
        throw new ApiError(
          'Error al cargar productos',
          response.status,
          'FETCH_ERROR'
        );
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      const handledError = handleApiError(error);
      setError(handledError.message);
      console.error('Error en refreshProducts:', {
        message: handledError.message,
        status: handledError.statusCode,
        code: handledError.code
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const createProduct = useCallback(async (productData: ProductFormData) => {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch('/api/products', {
        method: 'POST',
        headers,
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new ApiError(
          'Error al crear el producto',
          response.status,
          'CREATE_ERROR'
        );
      }

      await refreshProducts();
    } catch (error) {
      handleApiError(error);
    }
  }, [refreshProducts]);

  const updateProduct = useCallback(async (id: string, data: FormData) => {
    try {
      const headers = getAuthHeaders();
      
      const response = await fetch(`/api/products?id=${id}`, {
        method: 'PATCH',
        headers,
        body: data,
      });

      if (!response.ok) {
        throw new ApiError(
          'Error al actualizar el producto',
          response.status,
          'UPDATE_ERROR'
        );
      }

      await refreshProducts();
    } catch (error) {
      handleApiError(error);
    }
  }, [refreshProducts]);
  
  const deleteProduct = useCallback(async (id: string) => {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) {
        throw new ApiError(
          'Error al eliminar el producto',
          response.status,
          'DELETE_ERROR'
        );
      }

      await refreshProducts();
    } catch (error) {
      handleApiError(error);
    }
  }, [refreshProducts]);

  return (
    <ProductContext.Provider 
      value={{
        products,
        loading,
        error,
        refreshProducts,
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts debe ser usado dentro de un ProductProvider');
  }
  return context;
};