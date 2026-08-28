'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRealtimeCars, Car } from '@/lib/firestore-cars';
import { MapPin, Users, Fuel, Gauge, CarFront, ShieldCheck, Calendar, ArrowRight, Phone, Navigation, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import ElimiHeader from '@/components/ElimiHeader';
import GoogleLocationMap from '@/components/GoogleLocationMap';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
const defaultCenter = { lat: 34.0522, lng: -118.2437 };

function CarsContent() {
  const { cars, loading } = useRealtimeCars();
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState<'all' | 'rent' | 'sale'>(() => {
    const typeParam = searchParams.get('type') || searchParams.get('filter');
    if (typeParam === 'sale' || typeParam === 'buy') return 'sale';
    if (typeParam === 'rent') return 'rent';
    return 'all';
  });

  useEffect(() => {
    const typeParam = searchParams.get('type') || searchParams.get('filter');
    if (typeParam === 'sale' || typeParam === 'buy') {
      setTimeout(() => setFilter('sale'), 0);
    } else if (typeParam === 'rent') {
      setTimeout(() => setFilter('rent'), 0);
    }
  }, [searchParams]);

  // Filter the cars based on the selected tab
  const filteredCars = useMemo(() => {
    if (filter === 'rent') {
      return cars.filter(c => c.rent);
    }
    if (filter === 'sale') {
      return cars.filter(c => c.sales);
    }
    return cars;
  }, [cars, filter]);

  const [selectedCarId, setSelectedCarId] = useState<string | null>(null);

  const activeCar = useMemo(() => {
    if (selectedCarId) {
      const found = filteredCars.find(c => c.id === selectedCarId) || cars.find(c => c.id === selectedCarId);
      if (found) return found;
    }
    return filteredCars[0] || cars[0] || null;
  }, [selectedCarId, filteredCars, cars]);

  return (
    <div className="min-h-screen bg-[#f5efe6] font-sans text-gray-900 flex flex-col">
      {/* Home Page Navigation Header */}
      <ElimiHeader />

      {/* Hero Section */}
      <section className="relative bg-[#f5efe6] flex flex-col lg:flex-row min-h-[460px] lg:min-h-[520px]">
        <div 
          className="w-full lg:w-2/3 min-h-[280px] sm:min-h-[380px] lg:min-h-[520px] bg-cover bg-center relative"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1600)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent lg:bg-transparent"></div>
          <div className="lg:hidden absolute bottom-4 left-4 right-4 text-white">
            <span className="text-xs font-semibold tracking-wider uppercase bg-[#0D52FF] text-white px-2.5 py-1 rounded shadow">
              VIP Fleet & Mobility
            </span>
          </div>
        </div>
        <div className="hidden lg:block w-1/3 bg-[#f5efe6]"></div>
        
        {/* Floating / Responsive Card */}
        <div className="w-full lg:absolute right-0 top-1/2 lg:-translate-y-1/2 lg:w-[450px] xl:w-[480px] lg:mr-8 xl:mr-16 p-4 sm:p-6 lg:p-0">
          <div className="relative">
            <div className="hidden sm:block bg-[#0D52FF] absolute inset-0 transform translate-x-2 translate-y-2 sm:translate-x-3 sm:translate-y-3 rounded-2xl z-0 shadow-lg opacity-90"></div>
            <div className="bg-white p-6 sm:p-8 rounded-2xl relative z-10 border border-gray-200/90 shadow-md">
              <span className="hidden lg:inline-block text-[11px] font-bold tracking-wider uppercase text-[#0D52FF] mb-2 bg-blue-50 px-2.5 py-0.5 rounded-full">
                Prestige & Escort
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl mb-3 sm:mb-4 text-gray-900 leading-tight">
                Let&apos;s find your<br />perfect ride.
              </h1>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Browse prestige vehicles for certified purchase or rent for VIP protocol, executive travel, and special diplomatic missions.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                <button 
                  onClick={() => setFilter('sale')}
                  className={`w-full py-3 px-4 rounded-xl text-sm font-medium transition-all shadow-sm flex items-center justify-center gap-2 ${filter === 'sale' ? 'bg-[#0D52FF] text-white ring-2 ring-[#0D52FF]/20 shadow-blue-500/20' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                >
                  <span>Browse Cars for Sale</span>
                  {filter === 'sale' && <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded">Active</span>}
                </button>
                <button 
                  onClick={() => setFilter('rent')}
                  className={`w-full py-3 px-4 rounded-xl text-sm font-medium transition-all shadow-sm flex items-center justify-center gap-2 ${filter === 'rent' ? 'bg-[#0D52FF] text-white ring-2 ring-[#0D52FF]/20 shadow-blue-500/20' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                >
                  <span>Browse Cars for Rent</span>
                  {filter === 'rent' && <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded">Active</span>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-16 border-b border-gray-200/70 max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          <div className="w-full lg:w-1/3">
            <span className="text-xs font-bold tracking-wider uppercase text-[#0D52FF] mb-2 inline-block bg-blue-50 px-2.5 py-0.5 rounded-full">
              Live Fleet Map
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl mb-4 text-gray-900">Map your fleet.</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
              Locate available vehicles across our mobility hubs and premium showrooms. Whether you&apos;re purchasing or renting, explore locations with instant pickup or concierge delivery.
            </p>
            <div className="flex gap-2">
              <div className="flex-grow flex items-center bg-white border border-gray-300/80 rounded-xl px-3.5 py-2.5 shadow-sm">
                <MapPin className="w-4 h-4 text-[#0D52FF] mr-2 shrink-0" />
                <span className="text-xs sm:text-sm text-gray-700 font-medium">Showing {filteredCars.length} available vehicles</span>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-2/3 bg-gray-200 rounded-2xl overflow-hidden border border-gray-200 shadow-sm h-[320px] sm:h-[400px] lg:h-[440px] relative">
            <APIProvider apiKey={googleMapsApiKey}>
              <Map
                mapId="DEMO_MAP_ID"
                defaultCenter={defaultCenter}
                defaultZoom={10}
                gestureHandling={'greedy'}
                disableDefaultUI={false}
                internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
              >
                {filteredCars.map((car) => (
                  <AdvancedMarker key={car.id} position={car.location} title={car.title}>
                    <Pin background={'#0D52FF'} borderColor={'#1e3a8a'} glyphColor={'#ffffff'} />
                  </AdvancedMarker>
                ))}
              </Map>
            </APIProvider>
          </div>
        </div>
      </section>

      {/* Listings Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-16 max-w-7xl mx-auto w-full flex-grow">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 sm:mb-10">
          <div>
            <span className="text-xs font-bold tracking-wider uppercase text-[#0D52FF] mb-1 inline-block bg-blue-50 px-2.5 py-0.5 rounded-full">
              Available Listings
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl leading-tight text-gray-900">
              {filteredCars.length} {filteredCars.length === 1 ? 'vehicle' : 'vehicles'} ready for your journey.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-2.5 w-full sm:w-auto">
            <button 
              onClick={() => setFilter('all')}
              className={`flex-1 sm:flex-initial border rounded-xl py-2 px-3.5 sm:px-4 text-xs sm:text-sm font-medium transition-all ${filter === 'all' ? 'bg-[#0D52FF] text-white border-[#0D52FF] shadow-sm' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
            >
              All Vehicles
            </button>
            <button 
              onClick={() => setFilter('sale')}
              className={`flex-1 sm:flex-initial border rounded-xl py-2 px-3.5 sm:px-4 text-xs sm:text-sm font-medium transition-all ${filter === 'sale' ? 'bg-[#0D52FF] text-white border-[#0D52FF] shadow-sm' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
            >
              For Sale
            </button>
            <button 
              onClick={() => setFilter('rent')}
              className={`flex-1 sm:flex-initial border rounded-xl py-2 px-3.5 sm:px-4 text-xs sm:text-sm font-medium transition-all ${filter === 'rent' ? 'bg-[#0D52FF] text-white border-[#0D52FF] shadow-sm' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
            >
              For Rent
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-pulse flex space-x-2">
              <div className="h-3 w-3 bg-[#0D52FF] rounded-full"></div>
              <div className="h-3 w-3 bg-[#0D52FF] rounded-full animation-delay-200"></div>
              <div className="h-3 w-3 bg-[#0D52FF] rounded-full animation-delay-400"></div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car) => (
              <article key={car.id} className="border border-gray-200 rounded-2xl overflow-hidden flex flex-col bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                <div className="relative w-full h-52 sm:h-56 overflow-hidden bg-gray-100">
                  <img alt={car.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" src={car.imageUrl} />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {car.sales && (
                      <span className="bg-[#0D52FF] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-md shadow-sm">
                        Sale
                      </span>
                    )}
                    {car.rent && (
                      <span className="bg-[#1e40af] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-md shadow-sm">
                        Rent
                      </span>
                    )}
                  </div>
                  {car.year && (
                    <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-md">
                      {car.year}
                    </span>
                  )}
                </div>
                
                <div className="p-5 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-1.5">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-gray-900 line-clamp-1">{car.title}</h3>
                  </div>
                  
                  <div className="mb-2.5 space-y-0.5">
                    {car.sales && car.price > 0 && (
                      <p className="font-bold text-gray-900 text-base sm:text-lg">
                        ${car.price.toLocaleString()} <span className="text-xs font-normal text-gray-500">Purchase</span>
                      </p>
                    )}
                    {car.rent && car.rentPrice && (
                      <p className="font-bold text-[#0D52FF] text-base sm:text-lg">
                        ${car.rentPrice.toLocaleString()}/day <span className="text-xs font-normal text-gray-500">Rental Rate</span>
                      </p>
                    )}
                  </div>
                  
                  <p className="text-xs sm:text-sm text-gray-500 flex items-center mb-4">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 mr-1 flex-shrink-0" />
                    <span className="truncate">{car.address}</span>
                  </p>
                  
                  <div className="grid grid-cols-3 gap-2 mb-5 text-xs text-gray-600 bg-[#f8f5f0] p-2.5 rounded-xl border border-gray-200/50">
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#0D52FF]" />
                      <span className="truncate">{car.seats} Seats</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Gauge className="w-3.5 h-3.5 text-[#0D52FF]" />
                      <span className="truncate">{car.transmission}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Fuel className="w-3.5 h-3.5 text-[#0D52FF]" />
                      <span className="truncate">{car.fuelType.split('/')[0]}</span>
                    </div>
                  </div>
                  
                  <div className="mt-auto flex flex-col sm:flex-row gap-2 pt-2">
                    <Link 
                      href={`/cars/${car.id}`}
                      className="flex-1 bg-[#0D52FF] text-white text-center py-2.5 px-3 rounded-xl text-xs sm:text-sm font-medium hover:bg-[#0b45d6] transition-colors flex items-center justify-center gap-1 shadow-sm"
                    >
                      <span>View details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <a
                      href="tel:+25779000000"
                      className="flex-1 bg-white border border-gray-300 text-gray-700 text-center py-2.5 px-3 rounded-xl text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
                    >
                      Reserve / Inquire
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Real Address & Google Maps Interactive Explorer Section */}
        {activeCar && (
          <div className="mt-14 pt-10 border-t border-gray-300/70">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
              <div>
                <span className="text-xs font-bold tracking-wider uppercase text-[#0D52FF] mb-1.5 inline-flex items-center gap-1 bg-blue-50 px-2.5 py-0.5 rounded-full">
                  <MapPin className="w-3 h-3" />
                  <span>Interactive Fleet Hub Map</span>
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
                  Explore Showrooms &amp; Pickup Points
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  Select any vehicle to inspect its designated showroom or airport hub on Google Maps.
                </p>
              </div>

              {/* Vehicle Selector Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
                {filteredCars.slice(0, 5).map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCarId(c.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                      activeCar.id === c.id
                        ? 'bg-[#0D52FF] text-white shadow-sm font-semibold'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <MapPin className="w-3 h-3" />
                    <span>{c.title.split(' ')[0]} {c.title.split(' ')[1]}</span>
                  </button>
                ))}
              </div>
            </div>

            <GoogleLocationMap
              address={activeCar.address}
              location={activeCar.location}
              title={activeCar.title}
              category="car"
              priceDisplay={activeCar.rent && activeCar.rentPrice ? `$${activeCar.rentPrice.toLocaleString()}/day Rental` : (activeCar.sales && activeCar.price > 0 ? `$${activeCar.price.toLocaleString()} Sale` : undefined)}
            />
          </div>
        )}
      </section>

      {/* VIP Mobility Protocol Showcase Section */}
      <section className="bg-white py-12 sm:py-16 border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-wider uppercase text-[#0D52FF] mb-2 inline-block bg-blue-50 px-2.5 py-0.5 rounded-full">
              Why Choose ELIMI
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-gray-900 font-bold">VIP Mobility &amp; Fleet Standards</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div className="flex flex-col items-center p-6 sm:p-8 rounded-2xl bg-[#f8f5f0]/80 border border-gray-200/60 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#0D52FF] text-white flex items-center justify-center mb-4 shadow-md shadow-blue-500/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold mb-2 text-gray-900">Diplomatic & Executive Security</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Certified motorcade drivers, armored vehicle options, and discretion for dignitaries, delegations, and VIPs.
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 sm:p-8 rounded-2xl bg-[#f8f5f0]/80 border border-gray-200/60 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#0D52FF] text-white flex items-center justify-center mb-4 shadow-md shadow-blue-500/20">
                <CarFront className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold mb-2 text-gray-900">Pristine Fleet Condition</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Every vehicle is thoroughly sanitized, fully inspected, and maintained to manufacturer standards before departure.
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 sm:p-8 rounded-2xl bg-[#f8f5f0]/80 border border-gray-200/60 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#0D52FF] text-white flex items-center justify-center mb-4 shadow-md shadow-blue-500/20">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold mb-2 text-gray-900">Flexible Purchase & Rental</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                From daily ceremonial rentals and airport VIP escort to outright certified purchases with warranty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-gradient-to-br from-[#0D52FF] to-[#1e40af] text-white py-14 sm:py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-3 font-bold">Ready to take the wheel?</h2>
          <p className="text-blue-100 text-xs sm:text-sm max-w-xl mx-auto mb-8 leading-relaxed">
            Speak with an ELIMI Mobility advisor to reserve your vehicle, schedule a test drive, or arrange bespoke VIP convoy logistics.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-md mx-auto sm:max-w-none">
            <a
              href="tel:+25779000000"
              className="bg-white text-[#0D52FF] px-6 sm:px-8 py-3 rounded-xl text-sm font-semibold hover:bg-gray-100 transition-colors shadow-sm"
            >
              Schedule a Test Drive / Booking
            </a>
            <a
              href="tel:+25779000000"
              className="border border-white/80 text-white px-6 sm:px-8 py-3 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-1.5"
            >
              <Phone className="w-4 h-4" />
              <span>Call Mobility Concierge</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function CarsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f5efe6] flex items-center justify-center text-gray-600">Loading vehicles...</div>}>
      <CarsContent />
    </Suspense>
  );
}

