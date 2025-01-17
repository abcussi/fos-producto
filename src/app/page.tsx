// components/ProductList.tsx

'use client';

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useProducts } from './context/ProductConext';
import { Product } from './types/product';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  padding-top: 75%;
  background: #f5f5f5;
  
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Content = styled.div`
  padding: 1rem;
`;

const Title = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
  color: #333;
`;

const Price = styled.div`
  font-weight: bold;
  color: #00e38c;
  font-size: 1.2rem;
`;

const Category = styled.span`
  background: #f0f0f0;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  color: #666;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const EditButton = styled(Button)`
  background: #00e38c;
  color: white;
`;

const DeleteButton = styled(Button)`
  background: #ff4444;
  color: white;
`;

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => (
  <Card>
    <ImageContainer>
      <img 
        src={product.images[0] || '/placeholder.png'} 
        alt={product.name} 
      />
    </ImageContainer>
    <Content>
      <Title>{product.name}</Title>
      <Price>${product.price.toFixed(2)}</Price>
      <Category>{product.category}</Category>
      <ButtonGroup>
        <EditButton onClick={() => onEdit(product)}>Edit</EditButton>
        <DeleteButton onClick={() => onDelete(product.id)}>Delete</DeleteButton>
      </ButtonGroup>
    </Content>
  </Card>
);

const ProductList: React.FC = () => {
  const { products, loading, error, refreshProducts, deleteProduct } = useProducts();

  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  const handleEdit = (product: Product) => {
    // Implementation will be handled by parent component
    console.log('Edit product:', product);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Grid>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </Grid>
  );
};

export default ProductList;