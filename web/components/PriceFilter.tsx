'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function PriceFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    const min = searchParams.get('minPrice');
    const max = searchParams.get('maxPrice');
    if (min) setMinPrice(min);
    if (max) setMaxPrice(max);
  }, [searchParams]);

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (minPrice) {
      params.set('minPrice', minPrice);
    } else {
      params.delete('minPrice');
    }

    if (maxPrice) {
      params.set('maxPrice', maxPrice);
    } else {
      params.delete('maxPrice');
    }

    router.push(`?${params.toString()}`);
  };

  const handleClear = () => {
    setMinPrice('');
    setMaxPrice('');
    router.push('?');
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-8">
      <h3 className="text-lg font-semibold mb-4 text-slate-800">Filtrar por Precio</h3>
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="w-full md:w-1/3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Precio Mínimo</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Ej. 1000000"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-slate-900"
          />
        </div>
        <div className="w-full md:w-1/3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Precio Máximo</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Ej. 5000000"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-slate-900"
          />
        </div>
        <div className="flex gap-2 w-full md:w-1/3">
          <button
            onClick={handleFilter}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Filtrar
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Limpiar
          </button>
        </div>
      </div>
    </div>
  );
}
