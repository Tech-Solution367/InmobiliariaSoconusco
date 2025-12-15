import Navbar from '@/components/Navbar';
import HeroVideo from '@/components/HeroVideo';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto p-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
          <HeroVideo 
            src="/videos/QuienesSomos.mp4"
            title="Quiénes Somos"
            muted={false}
            volume={0.5}
            loop={true}
          />
          
          <div className="p-8 md:p-12">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-6 border-b-4 border-yellow-500 inline-block pb-2">Nuestra Historia</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Inmobiliaria Soconusco nació con la visión de transformar el mercado inmobiliario en la región. 
                Con años de experiencia conectando a familias con sus hogares ideales, nos hemos consolidado como 
                líderes en confianza y servicio personalizado.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Entendemos que comprar, vender o rentar una propiedad es una de las decisiones más importantes de la vida, 
                y estamos aquí para guiarte en cada paso del camino.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Equipo de trabajo" 
                  className="rounded-lg shadow-md mb-4 h-64 w-full object-cover"
                />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Nuestro Equipo</h3>
                <p className="text-gray-600">Profesionales dedicados y apasionados por el servicio al cliente.</p>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Satisfacción del cliente" 
                  className="rounded-lg shadow-md mb-4 h-64 w-full object-cover"
                />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Nuestra Misión</h3>
                <p className="text-gray-600">Brindar soluciones inmobiliarias integrales con transparencia y ética.</p>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-lg border-l-4 border-yellow-500">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">¿Por qué elegirnos?</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Amplio catálogo de propiedades verificadas.</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Asesoría legal y financiera experta.</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Trato directo y personalizado.</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Tecnología de punta para mostrar tu propiedad.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
