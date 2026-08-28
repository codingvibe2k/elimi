'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRealtimeHouses, House } from '@/lib/firestore-houses';
import { MapPin, Bed, Bath, Maximize2, Building2, ShieldCheck, Sparkles, ArrowRight, Phone, Navigation, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import ElimiHeader from '@/components/ElimiHeader';
import GoogleLocationMap from '@/components/GoogleLocationMap';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
const defaultCenter = { lat: 34.0522, lng: -118.2437 };

function HousesContent() {
  const { houses, loading } = useRealtimeHouses();
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

  // Filter the houses based on the selected tab
  const filteredHouses = useMemo(() => {
    if (filter === 'rent') {
      return houses.filter(h => h.rent);
    }
    if (filter === 'sale') {
      return houses.filter(h => h.sales);
    }
    return houses;
  }, [houses, filter]);

  const [selectedHouseId, setSelectedHouseId] = useState<string | null>(null);

  const activeHouse = useMemo(() => {
    if (selectedHouseId) {
      const found = filteredHouses.find(h => h.id === selectedHouseId) || houses.find(h => h.id === selectedHouseId);
      if (found) return found;
    }
    return filteredHouses[0] || houses[0] || null;
  }, [selectedHouseId, filteredHouses, houses]);

  return (
    <div className="min-h-screen bg-[#f5efe6] font-sans text-gray-900 flex flex-col">
      {/* Home Page Navigation Header */}
      <ElimiHeader />

      {/* Hero Section */}
      <section className="relative bg-[#f5efe6] flex flex-col lg:flex-row min-h-[460px] lg:min-h-[520px]">
        <div 
          className="w-full lg:w-2/3 min-h-[280px] sm:min-h-[380px] lg:min-h-[520px] bg-cover bg-center relative"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1600)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent lg:bg-transparent"></div>
          <div className="lg:hidden absolute bottom-4 left-4 right-4 text-white">
            <span className="text-xs font-semibold tracking-wider uppercase bg-[#0D52FF] text-white px-2.5 py-1 rounded shadow">
              Luxury Estates & Residences
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
                Villas & Penthouses
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl mb-3 sm:mb-4 text-gray-900 leading-tight">
                Let&apos;s find your<br />perfect fit.
              </h1>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Browse prestige villas, modern apartments, and executive residences for purchase or long-term lease.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                <button 
                  onClick={() => setFilter('sale')}
                  className={`w-full py-3 px-4 rounded-xl text-sm font-medium transition-all shadow-sm flex items-center justify-center gap-2 ${filter === 'sale' ? 'bg-[#0D52FF] text-white ring-2 ring-[#0D52FF]/20 shadow-blue-500/20' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                >
                  <span>Browse Homes for Sale</span>
                  {filter === 'sale' && <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded">Active</span>}
                </button>
                <button 
                  onClick={() => setFilter('rent')}
                  className={`w-full py-3 px-4 rounded-xl text-sm font-medium transition-all shadow-sm flex items-center justify-center gap-2 ${filter === 'rent' ? 'bg-[#0D52FF] text-white ring-2 ring-[#0D52FF]/20 shadow-blue-500/20' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                >
                  <span>Browse Homes for Rent</span>
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
              Interactive Map
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl mb-4 text-gray-900">Map your commute.</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
              View our available properties across prime neighborhoods. Whether you&apos;re looking to buy or lease, explore locations that perfectly suit your lifestyle.
            </p>
            <div className="flex gap-2">
              <div className="flex-grow flex items-center bg-white border border-gray-300/80 rounded-xl px-3.5 py-2.5 shadow-sm">
                <MapPin className="w-4 h-4 text-[#0D52FF] mr-2 shrink-0" />
                <span className="text-xs sm:text-sm text-gray-700 font-medium">Showing {filteredHouses.length} available properties</span>
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
                {filteredHouses.map((house) => (
                  <AdvancedMarker key={house.id} position={house.location} title={house.title}>
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
              Available Properties
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl leading-tight text-gray-900">
              {filteredHouses.length} {filteredHouses.length === 1 ? 'community' : 'communities'} ready for you.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-2.5 w-full sm:w-auto">
            <button 
              onClick={() => setFilter('all')}
              className={`flex-1 sm:flex-initial border rounded-xl py-2 px-3.5 sm:px-4 text-xs sm:text-sm font-medium transition-all ${filter === 'all' ? 'bg-[#0D52FF] text-white border-[#0D52FF] shadow-sm' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
            >
              All Properties
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
            {filteredHouses.map((house) => (
              <article key={house.id} className="border border-gray-200 rounded-2xl overflow-hidden flex flex-col bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                <div className="relative w-full h-52 sm:h-56 overflow-hidden bg-gray-100">
                  <img alt={house.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" src={house.imageUrl} />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {house.sales && (
                      <span className="bg-[#0D52FF] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-md shadow-sm">
                        Sale
                      </span>
                    )}
                    {house.rent && (
                      <span className="bg-[#1e40af] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-md shadow-sm">
                        Rent
                      </span>
                    )}
                  </div>
                  {house.sqft && (
                    <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-md">
                      {house.sqft.toLocaleString()} sqft
                    </span>
                  )}
                </div>
                
                <div className="p-5 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-1.5">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-gray-900 line-clamp-1">{house.title}</h3>
                  </div>
                  
                  <div className="mb-2.5 space-y-0.5">
                    {house.sales && house.price > 0 && (
                      <p className="font-bold text-gray-900 text-base sm:text-lg">
                        ${house.price.toLocaleString()} <span className="text-xs font-normal text-gray-500">Sale</span>
                      </p>
                    )}
                    {house.rent && house.rentPrice && (
                      <p className="font-bold text-[#0D52FF] text-base sm:text-lg">
                        ${house.rentPrice.toLocaleString()}/mo <span className="text-xs font-normal text-gray-500">Rent</span>
                      </p>
                    )}
                  </div>
                  
                  <p className="text-xs sm:text-sm text-gray-500 flex items-center mb-4">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 mr-1 flex-shrink-0" />
                    <span className="truncate">{house.address}</span>
                  </p>
                  
                  <div className="grid grid-cols-3 gap-2 mb-5 text-xs text-gray-600 bg-[#f8f5f0] p-2.5 rounded-xl border border-gray-200/50">
                    <div className="flex items-center gap-1">
                      <Bed className="w-3.5 h-3.5 text-[#0D52FF]" />
                      <span className="truncate">{house.bedrooms} Beds</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="w-3.5 h-3.5 text-[#0D52FF]" />
                      <span className="truncate">{house.bathrooms} Baths</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Maximize2 className="w-3.5 h-3.5 text-[#0D52FF]" />
                      <span className="truncate">{house.sqft ? `${house.sqft} sqft` : 'Spacious'}</span>
                    </div>
                  </div>
                  
                  <div className="mt-auto flex flex-col sm:flex-row gap-2 pt-2">
                    <Link 
                      href={`/houses/${house.id}`}
                      className="flex-1 bg-[#0D52FF] text-white text-center py-2.5 px-3 rounded-xl text-xs sm:text-sm font-medium hover:bg-[#0b45d6] transition-colors flex items-center justify-center gap-1 shadow-sm"
                    >
                      <span>View details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <a
                      href="tel:+25779000000"
                      className="flex-1 bg-white border border-gray-300 text-gray-700 text-center py-2.5 px-3 rounded-xl text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
                    >
                      Contact
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Real Address & Google Maps Interactive Explorer Section */}
        {activeHouse && (
          <div className="mt-14 pt-10 border-t border-gray-300/70">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
              <div>
                <span className="text-xs font-bold tracking-wider uppercase text-[#0D52FF] mb-1.5 inline-flex items-center gap-1 bg-blue-50 px-2.5 py-0.5 rounded-full">
                  <MapPin className="w-3 h-3" />
                  <span>Interactive Real Address Map</span>
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
                  Explore Verified Property Locations
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  Select any property below to view its pinpoint coordinates and neighborhood surroundings on Google Maps.
                </p>
              </div>

              {/* Property Selector Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
                {filteredHouses.slice(0, 5).map((h) => (
                  <button
                    key={h.id}
                    type="button"
                    onClick={() => setSelectedHouseId(h.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                      activeHouse.id === h.id
                        ? 'bg-[#0D52FF] text-white shadow-sm font-semibold'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <MapPin className="w-3 h-3" />
                    <span>{h.title.split(' in ')[0] || h.title}</span>
                  </button>
                ))}
              </div>
            </div>

            <GoogleLocationMap
              address={activeHouse.address}
              location={activeHouse.location}
              title={activeHouse.title}
              category="house"
              priceDisplay={activeHouse.sales && activeHouse.price > 0 ? `$${activeHouse.price.toLocaleString()} Sale` : (activeHouse.rent && activeHouse.rentPrice ? `$${activeHouse.rentPrice.toLocaleString()}/mo Rent` : undefined)}
            />
          </div>
        )}
      </section>

      {/* Real Estate Highlight / Trust Section */}
      <section className="bg-white py-12 sm:py-16 border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-wider uppercase text-[#0D52FF] mb-2 inline-block bg-blue-50 px-2.5 py-0.5 rounded-full">
              Why Choose ELIMI
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-gray-900 font-bold">Premium Living &amp; Estate Standards</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div className="flex flex-col items-center p-6 sm:p-8 rounded-2xl bg-[#f8f5f0]/80 border border-gray-200/60 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#0D52FF] text-white flex items-center justify-center mb-4 shadow-md shadow-blue-500/20">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold mb-2 text-gray-900">Prime Architectural Locations</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Handpicked luxury communities, panoramic views, secure residential compounds, and high-appreciation zones.
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 sm:p-8 rounded-2xl bg-[#f8f5f0]/80 border border-gray-200/60 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#0D52FF] text-white flex items-center justify-center mb-4 shadow-md shadow-blue-500/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold mb-2 text-gray-900">Verified Legal Title &amp; Escrow</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Complete documentation audit, notary guidance, and full security guarantees for purchases and leases.
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 sm:p-8 rounded-2xl bg-[#f8f5f0]/80 border border-gray-200/60 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#0D52FF] text-white flex items-center justify-center mb-4 shadow-md shadow-blue-500/20">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold mb-2 text-gray-900">Concierge Lease &amp; Property Care</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                From fully furnished short-stay residences to dedicated property managers and private security staff.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-gradient-to-br from-[#0D52FF] to-[#1e40af] text-white py-14 sm:py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-3 font-bold">Ready when you are.</h2>
          <p className="text-blue-100 text-xs sm:text-sm max-w-xl mx-auto mb-8 leading-relaxed">
            Schedule a private consultation or tour with an ELIMI Real Estate advisor to find your residence or investment property.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-md mx-auto sm:max-w-none">
            <a
              href="tel:+25779000000"
              className="bg-white text-[#0D52FF] px-6 sm:px-8 py-3 rounded-xl text-sm font-semibold hover:bg-gray-100 transition-colors shadow-sm"
            >
              Schedule a Consultation
            </a>
            <a
              href="tel:+25779000000"
              className="border border-white/80 text-white px-6 sm:px-8 py-3 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-1.5"
            >
              <Phone className="w-4 h-4" />
              <span>Call Real Estate Concierge</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function HousesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f5efe6] flex items-center justify-center text-gray-600">Loading properties...</div>}>
      <HousesContent />
    </Suspense>
  );
}

