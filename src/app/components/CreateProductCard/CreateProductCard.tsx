import React from 'react';

interface CreateProductCardProps {
  onClick: () => void;
}

const CreateProductCard: React.FC<CreateProductCardProps> = ({ onClick }) => (
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
    <span className="text-lg font-medium text-condatyGreen">
      Agregar Producto
    </span>
  </button>
);

export default CreateProductCard;