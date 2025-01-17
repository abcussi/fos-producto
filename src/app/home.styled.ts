import styled from "styled-components";
import { twMerge } from "tailwind-merge";

export const Container = styled.div.attrs({
  className: twMerge(
    "bg-gradient-to-b from-[#13332b] to-transparent mx-auto px-4 py-8"
  ),
})``;

export const Grid = styled.div.attrs({
  className: twMerge(
    "grid container pt-8 pr-9 pl-9 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
  ),
})``;

export const Card = styled.div.attrs({
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

export const ImageWrapper = styled.div.attrs({
  className: twMerge("relative h-56 w-full overflow-hidden bg-gray-100"),
})``;

export const ContentWrapper = styled.div.attrs({
  className: twMerge("p-5"),
})``;

export const Title = styled.h3.attrs({
  className: twMerge("text-lg font-semibold text-gray-900 mb-2 truncate"),
})``;

export const Price = styled.p.attrs({
  className: twMerge("text-2xl font-bold text-condatyBlue mb-3"),
})``;

export const Category = styled.span.attrs({
  className: twMerge(
    "inline-block px-3 py-1 text-sm bg-condatyBlue text-white rounded-full mb-4"
  ),
})``;

export const ButtonGroup = styled.div.attrs({
  className: twMerge("flex gap-3 mt-4"),
})``;

export const Button = styled.button.attrs<{ variant?: "primary" | "danger" }>(
  (props) => ({
    className: twMerge(
      "flex-1 px-4 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200",
      props.variant === "danger"
        ? "bg-red-50 text-red-600 hover:bg-red-100"
        : "bg-condatyBlue text-white hover:bg-condatyBlue/90"
    ),
  })
)<{ variant?: "primary" | "danger" }>``;

export const LoadingWrapper = styled.div.attrs({
  className: twMerge("h-20 flex items-center justify-center"),
})``;

export const LoadingSpinner = styled.div.attrs({
  className: twMerge(
    "animate-spin rounded-full h-8 w-8 border-2 border-condatyGreen border-r-transparent"
  ),
})``;

export const Badge = styled.span.attrs({
  className: twMerge(
    "absolute top-3 right-3 bg-condatyGreen text-white text-xs font-medium px-2.5 py-1 rounded-full"
  ),
})``;

// Skeleton styles
export const SkeletonComponent = styled.div.attrs({
  className: twMerge("animate-pulse"),
})``;

export const SkeletonImage = styled.div.attrs({
  className: twMerge("h-56 bg-gray-200 rounded-t-xl"),
})``;

export const SkeletonContent = styled.div.attrs({
  className: twMerge("p-5"),
})``;

export const SkeletonText = styled.div.attrs<{ width?: string }>((props) => ({
  className: twMerge("h-4 bg-gray-200 rounded", props.width),
}))<{ width?: string }>``;