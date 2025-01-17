"use client";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Image from "next/image";
import styled from "styled-components";
import { twMerge } from "tailwind-merge";
import { useProducts } from "./context/ProductConext";
import { Product, ProductCardProps } from "./types/product";
import { useInView } from "react-intersection-observer";
import Modal from "./components/Modal/Modal";
import ProductForm from "./components/Form/ProductForm";
import { useAuth } from "./context/authContext";
const ITEMS_PER_PAGE = 12;
const LOAD_MORE_THRESHOLD = 0.8;

// Styled Components con los colores de marca
const Container = styled.div.attrs({
  className: twMerge(
    "bg-gradient-to-b from-[#13332b] to-transparent mx-auto px-4 py-8 "
  ),
})``;

const Grid = styled.div.attrs({
  className: twMerge(
    "grid container pt-8 pr-9 pl-9 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
  ),
})``;

const Card = styled.div.attrs({
  className: twMerge(
    "group bg-gray-400 rounded-xl shadow-lg overflow-hidden transition-all duration-300"
  ),
})`
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
      0 8px 10px -6px rgb(0 0 0 / 0.1);
  }
`;

const ImageWrapper = styled.div.attrs({
  className: twMerge("relative h-56 w-full overflow-hidden bg-gray-100"),
})``;

const ContentWrapper = styled.div.attrs({
  className: twMerge("p-5"),
})``;

const Title = styled.h3.attrs({
  className: twMerge("text-lg font-semibold text-gray-900 mb-2 truncate"),
})``;

const Price = styled.p.attrs({
  className: twMerge("text-2xl font-bold text-condatyBlue mb-3"),
})``;

const Category = styled.span.attrs({
  className: twMerge(
    "inline-block px-3 py-1 text-sm bg-condatyBlue text-white rounded-full mb-4"
  ),
})``;

const ButtonGroup = styled.div.attrs({
  className: twMerge("flex gap-3 mt-4"),
})``;

const Button = styled.button.attrs<{ variant?: "primary" | "danger" }>(
  (props) => ({
    className: twMerge(
      "flex-1 px-4 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200",
      props.variant === "danger"
        ? "bg-red-50 text-red-600 hover:bg-red-100"
        : "bg-condatyBlue text-white hover:bg-condatyBlue/90"
    ),
  })
)<{ variant?: "primary" | "danger" }>``;

const LoadingWrapper = styled.div.attrs({
  className: twMerge("h-20 flex items-center justify-center"),
})``;

const LoadingSpinner = styled.div.attrs({
  className: twMerge(
    "animate-spin rounded-full h-8 w-8 border-2 border-condatyGreen border-r-transparent"
  ),
})``;

// Skeleton Components
const SkeletonComponent = styled.div.attrs({
  className: twMerge("animate-pulse"),
})``;

const SkeletonImage = styled.div.attrs({
  className: twMerge("h-56 bg-gray-200 rounded-t-xl"),
})``;

const SkeletonContent = styled.div.attrs({
  className: twMerge("p-5"),
})``;

const SkeletonText = styled.div.attrs<{ width?: string }>((props) => ({
  className: twMerge("h-4 bg-gray-200 rounded", props.width),
}))<{ width?: string }>``;

const Badge = styled.span.attrs({
  className: twMerge(
    "absolute top-3 right-3 bg-condatyGreen text-white text-xs font-medium px-2.5 py-1 rounded-full"
  ),
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
      setPage((prev) => prev + 1);
    }
  }, [inView, totalItems, page]);

  return { page, loadMoreRef: ref };
};

// Componente de imagen optimizado
const OptimizedImage = React.memo(
  ({ src, alt }: { src: string; alt: string }) => (
    <ImageWrapper>
      <Image
        src={src || "/placeholder.png"}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
    </ImageWrapper>
  )
);

OptimizedImage.displayName = "OptimizedImage";

// Componente ProductCard
const ProductCard = React.memo(
  ({ product, onEdit, onDelete, isAuthenticated }: ProductCardProps) => {
    const handleEdit = useCallback(() => onEdit(product), [onEdit, product]);
    const handleDelete = useCallback(
      () => onDelete(product.id),
      [onDelete, product.id]
    );

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

          {isAuthenticated && (
            <Fragment>
              <ButtonGroup>
                <Button onClick={handleEdit}>Editar</Button>
                <Button variant="danger" onClick={handleDelete}>
                  Eliminar
                </Button>
              </ButtonGroup>
            </Fragment>
          )}
        </ContentWrapper>
      </Card>
    );
  }
);

ProductCard.displayName = "ProductCard";

const CreateProductCard = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="group bg-black rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full min-h-[280px] w-full flex flex-col items-center justify-center gap-4 cursor-pointer"
  >
    <div className="w-16 h-16 rounded-full border-2 border-condatyGreen flex items-center justify-center group-hover:bg-condatyGreen/5 transition-colors">
      <svg
        className="w-8 h-8 text-condatyGreen"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v16m8-8H4"
        />
      </svg>
    </div>
    <span className="text-lg font-medium text-condatyGreen">Agregar Producto</span>
  </button>
);

// Componente ProductList principal

const ProductList: React.FC = () => {
  const { products, loading, error, refreshProducts, deleteProduct } =
    useProducts();
  const { isAuthenticated } = useAuth();
  const { page, loadMoreRef } = useLoadMore(products.length);
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

  const handleSubmit = async (data: Partial<Product>) => {
    try {
      if (selectedProduct) {
        // Actualizar producto existente
        await fetch(`/api/products?id=${selectedProduct.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
        });
      } else {
        // Crear nuevo producto
        await fetch("/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
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
      if (
        window.confirm("¿Estás seguro de que deseas eliminar este producto?")
      ) {
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
    <div className="bg-gradient-to-b from-[#13332b] to-transparent mx-auto px-4 py-8">
      <div className="grid container pt-8 pr-9 pl-9 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
      </div>

      {!loading && products.length > paginatedProducts.length && (
        <div
          className="h-20 flex items-center justify-center"
          ref={loadMoreRef}
        >
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-condatyGreen border-r-transparent" />
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ProductForm
          product={selectedProduct}
          onSubmit={handleSubmit}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default ProductList;
