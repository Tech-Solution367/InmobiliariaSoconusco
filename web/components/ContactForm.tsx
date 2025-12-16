'use client';

import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface ContactFormProps {
  propertyId?: string;
}

export default function ContactForm({ propertyId }: ContactFormProps) {
  const { t } = useLanguage();
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
        throw new Error(t('contact_error_generic'));
      }

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setStatus('error');
      setErrorMessage(t('contact_error_submit'));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-slate-900 mb-4">
        {propertyId ? t('contact_interested') : t('contact_title')}
      </h3>
      <p className="text-gray-600 mb-6 text-sm">{t('contact_leave_data')}</p>

      {status === 'success' ? (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg text-center">
          <p className="font-bold text-lg">{t('form_success_title')}</p>
          <p>{t('form_success_msg')}</p>
          <button 
            onClick={() => setStatus('idle')}
            className="mt-4 text-sm text-green-800 underline hover:text-green-900"
          >
            {t('contact_send_another')}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">{t('form_name')}</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow text-slate-900"
              placeholder={t('contact_placeholder_name')}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{t('form_email')}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow text-slate-900"
              placeholder={t('contact_placeholder_email')}
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">{t('form_phone')}</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow text-slate-900"
              placeholder={t('contact_placeholder_phone')}
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">{t('form_message')}</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow text-slate-900"
              placeholder={propertyId ? t('contact_placeholder_msg_prop') : t('contact_placeholder_msg_gen')}
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
            {status === 'submitting' ? t('form_sending') : (propertyId ? t('contact_send_interest') : t('form_send'))}
          </button>
        </form>
      )}
    </div>
  );
}
