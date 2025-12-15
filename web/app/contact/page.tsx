import Navbar from '@/components/Navbar';
import { FaWhatsapp, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto p-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
          <div 
            className="relative bg-slate-900 p-8 text-center bg-cover bg-center"
            style={{ 
              backgroundImage: 'url(/backgrounds/contact.jpg)',
              backgroundColor: '#0f172a'
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Contáctanos</h1>
              <p className="text-blue-200">¿Quieres vender o rentar tu propiedad? ¡Nosotros te ayudamos!</p>
            </div>
          </div>
          
          <div className="p-8 md:p-12">
            <div className="text-center mb-10">
              <p className="text-xl text-gray-700 mb-6">
                Si deseas que tu inmueble aparezca en nuestro sitio web y llegue a miles de clientes potenciales, 
                contáctanos a través de los siguientes medios:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <a 
                href="https://wa.me/529622229339" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center p-6 bg-green-50 rounded-xl border border-green-100 hover:shadow-lg transition-shadow group"
              >
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-3xl mb-4 group-hover:scale-110 transition-transform">
                  <FaWhatsapp />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">WhatsApp</h3>
                <p className="text-green-600 font-semibold text-lg">962 222 9339</p>
                <span className="text-sm text-gray-500 mt-2">Clic para chatear</span>
              </a>

              <a 
                href="mailto:oscaralexander_28@hotmail.com"
                className="flex flex-col items-center p-6 bg-blue-50 rounded-xl border border-blue-100 hover:shadow-lg transition-shadow group"
              >
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl mb-4 group-hover:scale-110 transition-transform">
                  <FaEnvelope />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Correo Electrónico</h3>
                <p className="text-blue-600 font-semibold text-lg break-all">oscaralexander_28@hotmail.com</p>
                <span className="text-sm text-gray-500 mt-2">Escríbenos un email</span>
              </a>
            </div>

            <div className="mt-12 p-6 bg-yellow-50 rounded-lg border border-yellow-200 text-center">
              <h3 className="text-lg font-bold text-yellow-800 mb-2">¿Qué sucede después?</h3>
              <p className="text-gray-700">
                Una vez que nos contactes, te daremos acceso para que puedas subir toda la información de tu propiedad, 
                incluyendo fotos, videos y recorridos 360°.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
