// Updated ProductCard.tsx

import React from 'react';
import { Button } from '@/components/ui/button';
import { useProductContext } from '@/contexts/ProductContext';

const ProductCard = ({ product }) => {
  const {
    openComparePopup,
    openGreenerPopup,
    setSelectedProduct,
  } = useProductContext();

  const handleClickProduct = () => {
    setSelectedProduct(product);
    openComparePopup(); // default behavior for clicking the product
  };

  const handleCompareClick = (e) => {
    e.stopPropagation();
    setSelectedProduct(product);
    openComparePopup();
  };

  const handleGreenerClick = (e) => {
    e.stopPropagation();
    setSelectedProduct(product);
    openGreenerPopup();
  };

  return (
    <div
      className="border rounded-xl p-4 shadow cursor-pointer hover:bg-gray-50"
      onClick={handleClickProduct}
    >
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-500">{product.description}</p>
      <div className="flex gap-2 mt-4">
        <Button variant="outline" onClick={handleCompareClick}>
          Compare
        </Button>
        <Button variant="secondary" onClick={handleGreenerClick}>
          Greener Option
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
