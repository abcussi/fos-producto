'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useProducts } from './context/ProductContext';
import { useAuth } from './context/authContext';
import { Product } from './types/product';
import Modal from './components/Modal/Modal';
import ProductForm from './components/Form/ProductForm';
import ProductCard from './components/ProductCard/ProductCard';
import CreateProductCard from './components/CreateProductCard/CreateProductCard';
import Skeleton from './components/Skeleton/Skeleton';
import useLoadMore from './lib/hooks/useLoadMore';
import { Container, Grid, LoadingWrapper, LoadingSpinner } from './home.styled';

const ITEMS_PER_PAGE = 12;

const ProductList: React.FC = () => {
  const { products, loading, error, refreshProducts, deleteProduct } = useProducts();
  const { isAuthenticated } = useAuth();
  const { page, loadMoreRef } = useLoadMore(products.length, ITEMS_PER_PAGE);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();

  const paginatedProducts = useMemo(() => {
    return products.slice(0, page * ITEMS_PER_PAGE);
  }, [products, page]);

  const handleEdit = useCallback((product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }, []);

  const handleCreate = () => {
    setSelectedProduct(undefined);
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: any) => {
    try {
      if (selectedProduct) {
        await fetch(`/api/products?id=${selectedProduct.id}`, {
          method: "PATCH",
          headers: {
          },
          body:data,
        });
      } else {
        await fetch("/api/products", {
          method: "POST",
          headers: {
          },
          body: data,
        });
      }
      refreshProducts();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = useCallback(
    async (id: string) => {
      if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
        try {
          await deleteProduct(id);
        } catch (error) {
          console.error("Error al eliminar el producto:", error);
        }
      }
    },
    [deleteProduct]
  );

  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-50 rounded-lg">
        Error: {error}
      </div>
    );
  }

  return (
    <Container>
      <Grid>
        {isAuthenticated && <CreateProductCard onClick={handleCreate} />}
        {paginatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isAuthenticated={isAuthenticated}
          />
        ))}

        {loading &&
          Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={`skeleton-${index}`} />
          ))}
      </Grid>

      {!loading && products.length > paginatedProducts.length && (
        <LoadingWrapper ref={loadMoreRef}>
          <LoadingSpinner />
        </LoadingWrapper>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ProductForm
          product={selectedProduct}
          onSubmit={handleSubmit}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </Container>
  );
};

export default ProductList;