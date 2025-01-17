'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { twMerge } from 'tailwind-merge';
import { useProducts } from './context/ProductConext';
import { Product, ProductCardProps } from './types/product';
import { useInView } from 'react-intersection-observer';

// Constantes
const ITEMS_PER_PAGE = 12;
const LOAD_MORE_THRESHOLD = 0.8;

// Styled Components con los colores de marca
const Container = styled.div.attrs({
  className: twMerge(
    'bg-gradient-to-b from-[#13332b] to-transparent mx-auto px-4 py-8 '
  )
})``;

const Grid = styled.div.attrs({
  className: twMerge(
    'grid container pt-8 pr-9 pl-9 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
  )
})``;

const Card = styled.div.attrs({
  className: twMerge(
    'group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300'
  )
})`
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  }
`;

const ImageWrapper = styled.div.attrs({
  className: twMerge(
    'relative h-56 w-full overflow-hidden bg-gray-100'
  )
})``;

const ContentWrapper = styled.div.attrs({
  className: twMerge(
    'p-5'
  )
})``;

const Title = styled.h3.attrs({
  className: twMerge(
    'text-lg font-semibold text-gray-900 mb-2 truncate'
  )
})``;

const Price = styled.p.attrs({
  className: twMerge(
    'text-2xl font-bold text-condatyBlue mb-3'
  )
})``;

const Category = styled.span.attrs({
  className: twMerge(
    'inline-block px-3 py-1 text-sm bg-gray-50 text-gray-600 rounded-full mb-4 border border-gray-100'
  )
})``;

const ButtonGroup = styled.div.attrs({
  className: twMerge(
    'flex gap-3 mt-4'
  )
})``;

const Button = styled.button.attrs<{ variant?: 'primary' | 'danger' }>(props => ({
  className: twMerge(
    'flex-1 px-4 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200',
    props.variant === 'danger' 
      ? 'bg-red-50 text-red-600 hover:bg-red-100' 
      : 'bg-condatyBlue text-white hover:bg-condatyBlue/90'
  )
}))<{ variant?: 'primary' | 'danger' }>``;

const LoadingWrapper = styled.div.attrs({
  className: twMerge(
    'h-20 flex items-center justify-center'
  )
})``;

const LoadingSpinner = styled.div.attrs({
  className: twMerge(
    'animate-spin rounded-full h-8 w-8 border-2 border-condatyGreen border-r-transparent'
  )
})``;

// Skeleton Components
const SkeletonComponent = styled.div.attrs({
  className: twMerge(
    'animate-pulse'
  )
})``;

const SkeletonImage = styled.div.attrs({
  className: twMerge(
    'h-56 bg-gray-200 rounded-t-xl'
  )
})``;

const SkeletonContent = styled.div.attrs({
  className: twMerge(
    'p-5'
  )
})``;

const SkeletonText = styled.div.attrs<{ width?: string }>(props => ({
  className: twMerge(
    'h-4 bg-gray-200 rounded',
    props.width
  )
}))<{ width?: string }>``;

const Badge = styled.span.attrs({
  className: twMerge(
    'absolute top-3 right-3 bg-condatyGreen text-white text-xs font-medium px-2.5 py-1 rounded-full'
  )
})``;

const Skeleton = () => (
  <SkeletonComponent>
    <SkeletonImage />
    <SkeletonContent>
      <SkeletonText className="h-6 w-3/4 mb-4" />
      <SkeletonText className="h-8 w-1/3 mb-4" />
      <SkeletonText className="h-4 w-1/2 mb-6" />
      <div className="flex gap-3">
        <SkeletonText className="h-10 w-1/2" />
        <SkeletonText className="h-10 w-1/2" />
      </div>
    </SkeletonContent>
  </SkeletonComponent>
);

// Hook personalizado para infinite scroll
const useLoadMore = (totalItems: number) => {
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView({
    threshold: LOAD_MORE_THRESHOLD,
  });

  useEffect(() => {
    if (inView && page * ITEMS_PER_PAGE < totalItems) {
      setPage(prev => prev + 1);
    }
  }, [inView, totalItems, page]);

  return { page, loadMoreRef: ref };
};

// Componente de imagen optimizado
const OptimizedImage = React.memo(({ src, alt }: { src: string; alt: string }) => (
  <ImageWrapper>
    <Image
      src={src || '/placeholder.png'}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="object-cover transition-transform duration-300 group-hover:scale-105"
      loading="lazy"
    />
  </ImageWrapper>
));

OptimizedImage.displayName = 'OptimizedImage';

// Componente ProductCard
const ProductCard = React.memo(({ 
  product, 
  onEdit, 
  onDelete 
}: ProductCardProps) => {
  const handleEdit = useCallback(() => onEdit(product), [onEdit, product]);
  const handleDelete = useCallback(() => onDelete(product.id), [onDelete, product.id]);
  
  // Calcular si el producto es nuevo (menos de 7 días)
  const isNew = useMemo(() => {
    const createdDate = new Date(product.createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - createdDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  }, [product.createdAt]);

  return (
    <Card>
      <div className="relative">
        <OptimizedImage src={product.images[0]} alt={product.name} />
        {isNew && <Badge>Nuevo</Badge>}
      </div>
      
      <ContentWrapper>
        <Title>{product.name}</Title>
        <Price>${product.price.toFixed(2)}</Price>
        <Category>{product.category}</Category>
        
        <ButtonGroup>
          <Button onClick={handleEdit}>
            Editar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Eliminar
          </Button>
        </ButtonGroup>
      </ContentWrapper>
    </Card>
  );
});

ProductCard.displayName = 'ProductCard';

// Componente ProductList principal
const ProductList: React.FC = () => {
  const { products, loading, error, refreshProducts, deleteProduct } = useProducts();
  const { page, loadMoreRef } = useLoadMore(products.length);
  
  const paginatedProducts = useMemo(() => {
    return products.slice(0, page * ITEMS_PER_PAGE);
  }, [products, page]);

  const handleEdit = useCallback((product: Product) => {
    console.log('Edit product:', product);
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        await deleteProduct(id);
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
      }
    }
  }, [deleteProduct]);

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
        {paginatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
        
        {loading && Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={`skeleton-${index}`} />
        ))}
      </Grid>
      
      {!loading && products.length > paginatedProducts.length && (
        <LoadingWrapper ref={loadMoreRef}>
          <LoadingSpinner />
        </LoadingWrapper>
      )}
    </Container>
  );
};

export default ProductList;