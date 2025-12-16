'use client';

import Navbar from '@/components/Navbar';
import ContactForm from '@/components/ContactForm';
import MapWrapper from '@/components/MapWrapper';
import { FaWhatsapp, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      {/* Header Section */}
      <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display">{t('contact_title')}</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light">
            {t('contact_subtitle')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-6 font-display border-b border-slate-100 pb-4">{t('contact_info_title')}</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 p-3 rounded-full text-amber-600 shrink-0">
                    <FaMapMarkerAlt className="text-xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{t('contact_location')}</h4>
                    <p className="text-slate-500 text-sm">Av. Central Norte #123,<br />Tapachula, Chiapas, México</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full text-blue-600 shrink-0">
                    <FaPhoneAlt className="text-xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{t('contact_phone')}</h4>
                    <p className="text-slate-500 text-sm">+52 962 123 4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full text-green-600 shrink-0">
                    <FaWhatsapp className="text-xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">WhatsApp</h4>
                    <p className="text-slate-500 text-sm">962 222 9339</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-3 rounded-full text-purple-600 shrink-0">
                    <FaEnvelope className="text-xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Email</h4>
                    <p className="text-slate-500 text-sm break-all">contacto@inmobiliariasoconusco.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-slate-100 p-3 rounded-full text-slate-600 shrink-0">
                    <FaClock className="text-xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{t('contact_schedule')}</h4>
                    <p className="text-slate-500 text-sm">{t('contact_schedule_days')}<br/>{t('contact_schedule_sat')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-8 rounded-2xl shadow-lg text-white text-center">
              <h3 className="text-xl font-bold mb-4 font-display">{t('contact_ready_publish')}</h3>
              <p className="mb-6 text-amber-100 text-sm">
                {t('contact_join_network')}
              </p>
              <a 
                href="https://wa.me/529622229339" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-white text-amber-600 px-6 py-3 rounded-full font-bold hover:bg-slate-100 transition-colors shadow-md"
              >
                {t('contact_contact_advisor')}
              </a>
            </div>
          </div>

          {/* Contact Form & Map */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-2 font-display">{t('contact_send_message_title')}</h3>
              <p className="text-slate-500 mb-8">{t('contact_send_message_desc')}</p>
              <ContactForm />
            </div>

            <div className="bg-white p-2 rounded-2xl shadow-lg border border-slate-100 h-[400px] overflow-hidden">
               <MapWrapper latitude={14.9056} longitude={-92.2633} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
