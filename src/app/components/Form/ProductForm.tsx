'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ProductFormProps } from '../../types/product';
import Image from 'next/image';

const ProductForm: React.FC<any> = ({ product, onSubmit, onClose }) => {

  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price || '',
    category: product?.category || '',
    description: product?.description || '',
    sellerId: product?.sellerId || '',
    condominium: product?.condominium || '',
  });

  const [imagePreview, setImagePreview] = useState<string>('');
  const [newImageSelected, setNewImageSelected] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Inicializar la vista previa de la imagen si existe un producto
  useEffect(() => {
    if (product?.images?.[0]) {
      setImagePreview(product.images[0]);
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setNewImageSelected(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formDataToSubmit = new FormData();
  
    formDataToSubmit.append('name', formData.name?.toString() || '');
    formDataToSubmit.append('price', (parseInt(formData.price) || 0).toString());
    formDataToSubmit.append('category', formData.category?.toString() || '');
    formDataToSubmit.append('description', formData.description?.toString() || '');
    formDataToSubmit.append('sellerId', formData.sellerId?.toString() || '');
    formDataToSubmit.append('condominium', formData.condominium?.toString() || '');
  
    if (product) {
      formDataToSubmit.append('id', product.id);
      if (product.createdAt) formDataToSubmit.append('createdAt', product.createdAt);
    }
  
    if (fileInputRef.current?.files?.[0]) {
      formDataToSubmit.append('image', fileInputRef.current.files[0]);
      console.log('Nueva imagen agregada:', fileInputRef.current.files[0].name);
    } else if (product?.images?.[0] && !newImageSelected) {
      formDataToSubmit.append('existingImage', product.images[0]);
      console.log('Manteniendo imagen existente:', product.images[0]);
    }
  
  
    let isEmpty = true;
    for (let [_, value] of formDataToSubmit.entries()) {
      if (value) {
        isEmpty = false;
        break;
      }
    }
  
    if (isEmpty) {
      console.error('FormData está vacío');
      return;
    }
    onSubmit(formDataToSubmit);
    onClose();
  };

  const removeImage = () => {
    setImagePreview('');
    setNewImageSelected(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <div className="flex justify-between items-center p-6 border-b">
        <h2 className="text-xl font-semibold text-gray-900">
          {product ? 'Editar Producto' : 'Crear Nuevo Producto'}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del producto
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-condatyGreen focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-condatyGreen focus:border-transparent"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Precio
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-condatyGreen focus:border-transparent"
              required
              step="0.01"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoría
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-condatyGreen focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Imagen del producto
            </label>
            <div className="space-y-2">
              <div className="flex gap-4 items-start">
                <div className="flex-1">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-condatyGreen focus:border-transparent"
                    required={!product?.images?.[0]}
                  />
                </div>
                {imagePreview && (
                  <div className="relative w-24 h-24 group">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full transform translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg 
                        className="w-4 h-4" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M6 18L18 6M6 6l12 12" 
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
              {imagePreview && (
                <p className="text-sm text-gray-500">
                  {newImageSelected ? 'Nueva imagen seleccionada' : 'Imagen actual del producto'}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-condatyBlue hover:bg-condatyBlue/90 rounded-lg transition-colors"
          >
            {product ? 'Actualizar' : 'Crear'}
          </button>
        </div>
      </form>
    </>
  );
};

export default ProductForm;