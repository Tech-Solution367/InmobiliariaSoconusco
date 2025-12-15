'use client';

import { useState } from 'react';

interface ContactFormProps {
  propertyId?: string;
}

export default function ContactForm({ propertyId }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          propertyId,
        }),
      });

      if (!res.ok) {
        throw new Error('Error al enviar el formulario');
      }

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setStatus('error');
      setErrorMessage('Hubo un problema al enviar tu mensaje. Por favor intenta de nuevo.');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-slate-900 mb-4">
        {propertyId ? '¿Te interesa esta propiedad?' : 'Contáctanos'}
      </h3>
      <p className="text-gray-600 mb-6 text-sm">Déjanos tus datos y un asesor se pondrá en contacto contigo a la brevedad.</p>

      {status === 'success' ? (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg text-center">
          <p className="font-bold text-lg">¡Gracias!</p>
          <p>Hemos recibido tus datos. Te contactaremos pronto.</p>
          <button 
            onClick={() => setStatus('idle')}
            className="mt-4 text-sm text-green-800 underline hover:text-green-900"
          >
            Enviar otro mensaje
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre completo *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow text-slate-900"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow text-slate-900"
              placeholder="ejemplo@correo.com"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow text-slate-900"
              placeholder="10 dígitos"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow text-slate-900"
              placeholder={propertyId ? "Hola, me interesa esta propiedad..." : "Hola, me gustaría recibir más información..."}
            ></textarea>
          </div>

          {status === 'error' && (
            <div className="text-red-500 text-sm bg-red-50 p-2 rounded border border-red-100">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all transform hover:scale-[1.02] shadow-md ${
              status === 'submitting' 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/30'
            }`}
          >
            {status === 'submitting' ? 'Enviando...' : (propertyId ? 'Enviar interés' : 'Enviar mensaje')}
          </button>
        </form>
      )}
    </div>
  );
}
