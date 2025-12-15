import Navbar from '@/components/Navbar';
import HeroVideo from '@/components/HeroVideo';
import { FaHandshake, FaUserTie, FaLightbulb, FaCheckCircle } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="relative">
        <HeroVideo 
          src="/videos/Quienes Somos Nue.mp4"
          title="Quiénes Somos"
          subtitle="Conoce la historia y los valores que nos impulsan a ser líderes en el mercado inmobiliario."
          muted={false}
          volume={0.5}
          loop={true}
        />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-16 -mt-20 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Main Content Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-16 border border-slate-100">
            <div className="p-8 md:p-12">
              <div className="mb-12 text-center">
                <span className="text-amber-600 font-bold tracking-wider uppercase text-sm mb-2 block">Nuestra Esencia</span>
                <h2 className="text-4xl font-bold text-slate-900 mb-6 font-display">Construyendo Confianza, <br/>Creando Hogares</h2>
                <div className="h-1.5 w-24 bg-amber-500 rounded-full mx-auto mb-8"></div>
                <p className="text-slate-600 text-lg leading-relaxed max-w-3xl mx-auto">
                  Inmobiliaria Soconusco nació con la visión de transformar el mercado inmobiliario en la región. 
                  Con años de experiencia conectando a familias con sus hogares ideales, nos hemos consolidado como 
                  líderes en confianza y servicio personalizado. Entendemos que cada propiedad cuenta una historia y cada cliente tiene un sueño.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-slate-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow group border border-slate-100">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <FaUserTie />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 font-display">Profesionalismo</h3>
                  <p className="text-slate-500">Equipo experto dedicado a brindarte la mejor asesoría en cada paso.</p>
                </div>
                <div className="bg-slate-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow group border border-slate-100">
                  <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <FaHandshake />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 font-display">Compromiso</h3>
                  <p className="text-slate-500">Tu satisfacción es nuestra prioridad. Nos comprometemos con tus objetivos.</p>
                </div>
                <div className="bg-slate-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow group border border-slate-100">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <FaLightbulb />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 font-display">Innovación</h3>
                  <p className="text-slate-500">Utilizamos las últimas tecnologías para destacar tu propiedad.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="relative">
                  <div className="absolute -inset-4 bg-amber-500/20 rounded-2xl transform rotate-3"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Equipo de trabajo" 
                    className="relative rounded-xl shadow-lg w-full object-cover h-80"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 font-display">¿Por qué elegirnos?</h3>
                  <ul className="space-y-4">
                    {[
                      'Amplio catálogo de propiedades verificadas.',
                      'Asesoría legal y financiera experta.',
                      'Trato directo, humano y personalizado.',
                      'Marketing digital avanzado para tu inmueble.',
                      'Acompañamiento hasta la firma de escrituras.'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-slate-600">
                        <FaCheckCircle className="text-green-500 mt-1 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
