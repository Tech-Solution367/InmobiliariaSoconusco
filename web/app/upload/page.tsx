'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import { FaCloudUploadAlt, FaTrash, FaVideo, FaPlus, FaMapMarkerAlt } from 'react-icons/fa';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface NearbyPlace {
  category: 'escuela' | 'banco' | 'plaza' | 'servicio' | 'negocio' | 'otro';
  name: string;
  distanceMeters: number;
}

export default function UploadPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    latitude: '',
    longitude: '',
    type: 'sale',
    whatsappNumber: '',
    view360: '',
  });
  
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  
  // Nearby Places State
  const [nearbyPlaces, setNearbyPlaces] = useState<NearbyPlace[]>([]);
  const [newPlace, setNewPlace] = useState<NearbyPlace>({
    category: 'escuela',
    name: '',
    distanceMeters: 0
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewPlace(prev => ({ ...prev, [name]: value }));
  };

  const addNearbyPlace = () => {
    if (!newPlace.name || newPlace.distanceMeters <= 0) {
      setError('Por favor completa el nombre y la distancia del lugar cercano.');
      return;
    }
    setNearbyPlaces(prev => [...prev, { ...newPlace, distanceMeters: Number(newPlace.distanceMeters) }]);
    setNewPlace({ category: 'escuela', name: '', distanceMeters: 0 });
    setError('');
  };

  const removeNearbyPlace = (index: number) => {
    setNearbyPlaces(prev => prev.filter((_, i) => i !== index));
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);

      // Validation: Check file size (max 10MB)
      const MAX_SIZE = 10 * 1024 * 1024; // 10MB
      const oversizedFiles = newFiles.filter(file => file.size > MAX_SIZE);
      
      if (oversizedFiles.length > 0) {
        setError(`Algunas imágenes exceden el límite de 10MB: ${oversizedFiles.map(f => f.name).join(', ')}`);
        return;
      }

      const totalFiles = imageFiles.length + newFiles.length;

      if (totalFiles > 5) {
        setError('No puedes subir más de 5 imágenes.');
        return;
      }

      setImageFiles(prev => [...prev, ...newFiles]);

      // Create previews
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...newPreviews]);
      setError('');
    }
  };

  const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => {
      // Revoke URL to avoid memory leaks
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== 'video/mp4') {
        setError('Solo se permiten videos en formato MP4.');
        return;
      }
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
      setError('');
    }
  };

  const removeVideo = () => {
    setVideoFile(null);
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
      setVideoPreview(null);
    }
  };

  const uploadFiles = async (files: File[]) => {
    const formData = new FormData();
    files.forEach(file => formData.append('file', file));

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) throw new Error('Error subiendo archivos');
    const data = await res.json();
    return data.urls as string[];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setUploadProgress('');

    if (imageFiles.length === 0) {
      setError('Debes seleccionar al menos una imagen.');
      setLoading(false);
      return;
    }

    try {
      // 1. Upload Images
      setUploadProgress('Subiendo imágenes...');
      const imageUrls = await uploadFiles(imageFiles);

      // 2. Upload Video (if exists)
      let videoUrl = '';
      if (videoFile) {
        setUploadProgress('Subiendo video...');
        const videoUrls = await uploadFiles([videoFile]);
        videoUrl = videoUrls[0];
      }

      // 3. Save Property
      setUploadProgress('Guardando propiedad...');
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          latitude: Number(formData.latitude),
          longitude: Number(formData.longitude),
          images: imageUrls,
          video: videoUrl,
          nearbyPlaces: nearbyPlaces,
        }),
      });

      if (!res.ok) {
        throw new Error('Error al crear la propiedad');
      }

      router.push('/');
      router.refresh();
    } catch (err) {
      console.error(err);
      setError('Ocurrió un error al procesar la solicitud. Intenta de nuevo.');
    } finally {
      setLoading(false);
      setUploadProgress('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="container mx-auto px-4 pt-8 pb-0 flex justify-end">
        <LanguageSwitcher variant="inline" />
      </div>
      <div className="container mx-auto p-4 py-12 max-w-3xl">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-slate-200">
          <div className="bg-slate-900 p-8 text-center">
            <h1 className="text-3xl font-bold text-white">Publicar Propiedad</h1>
            <p className="text-amber-500 mt-2 font-medium">Ingresa los detalles completos de tu inmueble</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r shadow-sm">
                <p className="font-bold">Atención</p>
                <p>{error}</p>
              </div>
            )}

            {uploadProgress && (
              <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 mb-6 rounded-r shadow-sm flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-700 mr-3"></div>
                <p className="font-bold">{uploadProgress}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="col-span-2">
                <label className="block text-slate-700 font-bold mb-2">Título del Anuncio</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-slate-900 placeholder-slate-400"
                  placeholder="Ej: Casa moderna en el centro"
                  required
                  maxLength={60}
                />
              </div>

              <div className="col-span-2">
                <label className="block text-slate-700 font-bold mb-2">Descripción Detallada</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all h-40 text-slate-900 placeholder-slate-400"
                  placeholder="Describe las características, habitaciones, servicios cercanos..."
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-2">Precio (MXN)</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-500 font-bold">$</span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-lg pl-8 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-slate-900 placeholder-slate-400"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-2">Tipo de Operación</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all bg-white text-slate-900"
                >
                  <option value="sale">Venta</option>
                  <option value="rent">Renta</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-slate-700 font-bold mb-2">Ubicación</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-slate-900 placeholder-slate-400"
                  placeholder="Dirección completa o zona"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 col-span-2">
                <div>
                  <label className="block text-slate-700 font-bold mb-2">Latitud</label>
                  <input
                    type="number"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleChange}
                    step="0.000001"
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-slate-900 placeholder-slate-400"
                    placeholder="Ej: 14.905556"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-2">Longitud</label>
                  <input
                    type="number"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleChange}
                    step="0.000001"
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-slate-900 placeholder-slate-400"
                    placeholder="Ej: -92.263056"
                    required
                  />
                </div>
              </div>

              <div className="col-span-2">
                <label className="block text-slate-700 font-bold mb-2">WhatsApp del Propietario</label>
                <div className="flex items-center">
                  <span className="bg-slate-100 border border-r-0 border-slate-300 rounded-l-lg px-3 py-3 text-slate-600 font-bold">+</span>
                  <input
                    type="text"
                    name="whatsappNumber"
                    value={formData.whatsappNumber}
                    onChange={handleChange}
                    placeholder="521234567890"
                    className="w-full border border-slate-300 rounded-r-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-slate-900 placeholder-slate-400"
                    required
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">Incluye el código de país (ej. 52 para México).</p>
              </div>
            </div>

            {/* Nearby Places Section */}
            <div className="border-t border-slate-200 pt-6 mb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Lugares Cercanos</h3>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Categoría</label>
                    <select
                      name="category"
                      value={newPlace.category}
                      onChange={handlePlaceChange}
                      className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 text-slate-900"
                    >
                      <option value="escuela">Escuela</option>
                      <option value="banco">Banco</option>
                      <option value="plaza">Plaza Comercial</option>
                      <option value="servicio">Servicio (Luz/Agua)</option>
                      <option value="negocio">Negocio</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-1">Nombre del Lugar</label>
                    <input
                      type="text"
                      name="name"
                      value={newPlace.name}
                      onChange={handlePlaceChange}
                      placeholder="Ej: Plaza Crystal"
                      className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Distancia (metros)</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        name="distanceMeters"
                        value={newPlace.distanceMeters}
                        onChange={handlePlaceChange}
                        placeholder="0"
                        className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 text-slate-900"
                      />
                      <button
                        type="button"
                        onClick={addNearbyPlace}
                        className="bg-amber-500 text-white p-2 rounded-md hover:bg-amber-600 transition-colors"
                        title="Agregar Lugar"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {nearbyPlaces.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {nearbyPlaces.map((place, index) => (
                    <div key={index} className="flex justify-between items-center bg-white p-3 rounded border border-slate-200 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="bg-slate-100 p-2 rounded-full text-slate-600">
                          <FaMapMarkerAlt />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-sm">{place.name}</p>
                          <p className="text-xs text-slate-500 capitalize">{place.category} • {place.distanceMeters}m</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeNearbyPlace(index)}
                        className="text-red-400 hover:text-red-600 p-1"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-slate-200 pt-6 mb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Multimedia</h3>
              
              {/* Image Upload Section */}
              <div className="mb-8">
                <label className="block text-slate-700 font-bold mb-2">
                  Imágenes <span className="text-amber-600 text-sm font-normal">(Máximo 5 imágenes, Max 10MB c/u)</span>
                </label>
                
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:bg-slate-50 hover:border-amber-400 transition-all cursor-pointer relative group">
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    onChange={handleImageSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={imageFiles.length >= 5}
                  />
                  <FaCloudUploadAlt className="mx-auto text-5xl text-slate-400 group-hover:text-amber-500 transition-colors mb-3" />
                  <p className="text-slate-600 font-medium">Haz clic o arrastra imágenes aquí</p>
                  <p className="text-sm text-slate-400">JPG, PNG, WEBP</p>
                </div>

                <div className="mt-4 grid grid-cols-3 md:grid-cols-5 gap-4">
                  {imagePreviews.map((src, index) => (
                    <div key={index} className="relative h-24 bg-slate-100 rounded-lg overflow-hidden group border border-slate-200 shadow-sm">
                      <img src={src} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 shadow-md"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  ))}
                </div>
                <p className="text-right text-sm text-slate-500 mt-2 font-medium">
                  {imageFiles.length} / 5 imágenes seleccionadas
                </p>
              </div>

              {/* Video Upload Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-700 font-bold mb-2">Video (MP4)</label>
                  {!videoFile ? (
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 hover:border-amber-400 transition-all cursor-pointer relative h-32 flex flex-col items-center justify-center group">
                      <input 
                        type="file" 
                        accept="video/mp4" 
                        onChange={handleVideoSelect}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <FaVideo className="mx-auto text-3xl text-gray-400 mb-2" />
                      <p className="text-gray-600 text-sm font-medium">Subir Video MP4</p>
                    </div>
                  ) : (
                    <div className="relative bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                      <video src={videoPreview!} className="w-full h-32 object-cover" />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <span className="text-white text-sm font-bold truncate px-2">{videoFile.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={removeVideo}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2">Vista 360° (URL)</label>
                  <input
                    type="text"
                    name="view360"
                    value={formData.view360}
                    onChange={handleChange}
                    placeholder="URL del visor 360 o iframe"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow h-[52px]"
                  />
                  <p className="text-xs text-gray-500 mt-2">Pega aquí el enlace de tu proveedor de tours virtuales.</p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-slate-900 text-white font-bold py-4 rounded-lg hover:bg-slate-800 transition-all transform hover:scale-[1.01] shadow-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Procesando...' : 'Publicar Propiedad'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
