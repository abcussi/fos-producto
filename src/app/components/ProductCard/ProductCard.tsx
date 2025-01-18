import React, { useCallback, useMemo } from 'react';
import Image from 'next/image';
import { ProductCardProps } from '../../types/product';
import {
  Card,
  ImageWrapper,
  ContentWrapper,
  Title,
  Price,
  Category,
  ButtonGroup,
  Button,
  Badge
} from '@/app/home.styled';

const ProductCard = React.memo(
  ({ product, onEdit, onDelete, isAuthenticated }: ProductCardProps) => {
    const handleEdit = useCallback(() => onEdit(product), [onEdit, product]);
    const handleDelete = useCallback(
      () => onDelete(product.id),
      [onDelete, product.id]
    );

    const isNew = useMemo(() => {
      const createdDate = new Date(product.createdAt!);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - createdDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7;
    }, [product.createdAt]);

    return (
      <Card>
        <div className="relative">
          <div className="relative h-56 w-full overflow-hidden bg-gray-100">
            <Image
              src={product.images[0] || '/placeholder.png'}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          {isNew && <Badge>Nuevo</Badge>}
        </div>

        <ContentWrapper>
          <Title>{product.name}</Title>
          <Price>${product.price.toFixed(2)}</Price>
          <Category>{product.category}</Category>

          {isAuthenticated && (
            <ButtonGroup>
              <Button onClick={handleEdit}>Editar</Button>
              <Button variant="danger" onClick={handleDelete}>
                Eliminar
              </Button>
            </ButtonGroup>
          )}
        </ContentWrapper>
      </Card>
    );
  }
);

ProductCard.displayName = 'ProductCard';

export default ProductCard;