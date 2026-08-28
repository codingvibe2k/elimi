'use client';

import { useState, useEffect } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  writeBatch,
} from 'firebase/firestore';
import { db } from './firebase';

export interface AvailableCarUnit {
  unitId: string;
  availableDate: string;
  price: number;
  isRent: boolean;
}

export interface Car {
  id: string;
  title: string;
  description: string;
  price: number; // for sale price
  rentPrice?: number; // for rent price (e.g. per day or per month)
  sales: boolean;
  rent: boolean;
  location: { lat: number; lng: number };
  address: string;
  mapsLink?: string;
  seats: number;
  transmission: string;
  fuelType: string;
  year: number;
  mileage?: string;
  modelTrim: string;
  availableUnits: AvailableCarUnit[];
  amenities: string[];
  photos: string[];
  imageUrl: string;
}

const DEFAULT_CAR_FEATURES = [
  'Professional Chauffeur Available',
  'Executive Leather Interior',
  '4WD / All-Terrain Capability',
  'Advanced GPS & Navigation',
  'Apple CarPlay & Android Auto',
  'Panoramic Sunroof',
  'Surround Sound Audio System',
  'Full Comprehensive Insurance Included'
];

const DEFAULT_CAR_PHOTOS = [
  'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800'
];

export const SAMPLE_CARS: Car[] = [
  {
    id: 'car-1',
    title: 'Mercedes-Benz V-Class VIP Edition',
    description: 'Ultra-luxurious 7-seater executive van with recliner massage seats, ambient lighting, and high-speed onboard Wi-Fi.',
    price: 115000,
    rentPrice: 350,
    sales: true,
    rent: true,
    location: { lat: 34.0736, lng: -118.4004 },
    address: 'Beverly Hills Showroom, CA',
    mapsLink: 'https://maps.app.goo.gl/random_car_1',
    seats: 7,
    transmission: 'Automatic',
    fuelType: 'Diesel / Hybrid',
    year: 2024,
    mileage: '12,500 miles',
    modelTrim: 'V300d Extra Long Luxury',
    availableUnits: [
      { unitId: 'VC-01', availableDate: 'Available Today', price: 350, isRent: true },
      { unitId: 'VC-02', availableDate: 'Available Now', price: 115000, isRent: false }
    ],
    amenities: DEFAULT_CAR_FEATURES,
    photos: [
      '/public/assets/shop/mercedes-vclass.jpg',
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'car-2',
    title: 'Toyota Land Cruiser Prado TX-L',
    description: 'Iconic heavy-duty luxury SUV built for commanding road presence, diplomatic protocol, and rough terrains.',
    price: 85000,
    rentPrice: 200,
    sales: true,
    rent: true,
    location: { lat: 34.0407, lng: -118.2468 },
    address: 'Downtown Hub, Los Angeles, CA',
    mapsLink: 'https://maps.app.goo.gl/random_car_2',
    seats: 7,
    transmission: 'Automatic 4WD',
    fuelType: 'Turbo Diesel',
    year: 2024,
    mileage: '8,200 miles',
    modelTrim: 'TX-L Premium Package',
    availableUnits: [
      { unitId: 'PR-10', availableDate: 'Available Now', price: 200, isRent: true },
      { unitId: 'PR-11', availableDate: 'Available Now', price: 85000, isRent: false }
    ],
    amenities: [
      'Full-Time 4WD with Multi-Terrain Select',
      'Rear Seat Entertainment',
      'Cool Box Refrigerator',
      'Roof Railing System',
      '360 Panoramic View Monitor',
      'Chauffeur Service Optional'
    ],
    photos: [
      '/public/assets/elimi-images/4-pillar-section/PRADO.webp',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'car-3',
    title: 'Range Rover Autobiography LWB',
    description: 'The pinnacle of refined British engineering, offering unmatched comfort, serene ride quality, and executive presence.',
    price: 185000,
    rentPrice: 650,
    sales: true,
    rent: true,
    location: { lat: 34.0259, lng: -118.5155 },
    address: 'Coastal Mobility Center, Santa Monica, CA',
    mapsLink: 'https://maps.app.goo.gl/random_car_3',
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Twin-Turbo V8',
    year: 2024,
    mileage: '5,100 miles',
    modelTrim: 'Autobiography Long Wheelbase',
    availableUnits: [
      { unitId: 'RR-01', availableDate: 'Available Now', price: 650, isRent: true },
      { unitId: 'RR-02', availableDate: 'Ready for delivery', price: 185000, isRent: false }
    ],
    amenities: DEFAULT_CAR_FEATURES,
    photos: DEFAULT_CAR_PHOTOS,
    imageUrl: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'car-4',
    title: 'Porsche 911 Carrera GTS',
    description: 'Iconic sports car delivering adrenaline-fueled handling, timeless design, and precision performance.',
    price: 155000,
    sales: true,
    rent: false,
    location: { lat: 34.1425, lng: -118.2551 },
    address: 'Glendale Performance Showroom, CA',
    mapsLink: 'https://maps.app.goo.gl/random_car_4',
    seats: 4,
    transmission: '8-Speed PDK',
    fuelType: 'Twin-Turbo Boxer 6',
    year: 2023,
    mileage: '3,800 miles',
    modelTrim: 'Carrera GTS Coupe',
    availableUnits: [
      { unitId: 'PO-911', availableDate: 'Available Now', price: 155000, isRent: false }
    ],
    amenities: [
      'Sport Chrono Package',
      'Sport Exhaust System',
      'PASM Sport Suspension',
      'Carbon Ceramic Brakes',
      'Bose Surround Sound',
      'Alcantara Interior'
    ],
    photos: DEFAULT_CAR_PHOTOS,
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'car-5',
    title: 'Mercedes-Maybach S 580 4MATIC',
    description: 'Presidential comfort with extended legroom, reclining first-class airline style seats, and noise-cancelling cabin.',
    price: 230000,
    rentPrice: 800,
    sales: true,
    rent: true,
    location: { lat: 34.0522, lng: -118.2437 },
    address: 'Financial District VIP Terminal, CA',
    mapsLink: 'https://maps.app.goo.gl/random_car_5',
    seats: 4,
    transmission: 'Automatic 9G-TRONIC',
    fuelType: 'V8 Biturbo Mild Hybrid',
    year: 2024,
    mileage: '2,900 miles',
    modelTrim: 'Maybach S 580 Executive',
    availableUnits: [
      { unitId: 'MB-580', availableDate: 'Available Today', price: 800, isRent: true },
      { unitId: 'MB-581', availableDate: 'Available Now', price: 230000, isRent: false }
    ],
    amenities: DEFAULT_CAR_FEATURES,
    photos: DEFAULT_CAR_PHOTOS,
    imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'car-6',
    title: 'Cadillac Escalade ESV Platinum',
    description: 'Commanding full-size luxury SUV with curved OLED display, Super Cruise, and generous luggage capacity.',
    price: 125000,
    rentPrice: 400,
    sales: true,
    rent: true,
    location: { lat: 34.2506, lng: -118.1887 },
    address: 'North Hills Showroom, CA',
    mapsLink: 'https://maps.app.goo.gl/random_car_6',
    seats: 7,
    transmission: '10-Speed Automatic',
    fuelType: '6.2L V8',
    year: 2024,
    mileage: '9,400 miles',
    modelTrim: 'ESV Platinum Luxury',
    availableUnits: [
      { unitId: 'CD-88', availableDate: 'Available Now', price: 400, isRent: true },
      { unitId: 'CD-89', availableDate: 'Available Now', price: 125000, isRent: false }
    ],
    amenities: DEFAULT_CAR_FEATURES,
    photos: DEFAULT_CAR_PHOTOS,
    imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'car-7',
    title: 'BMW X7 M60i xDrive',
    description: 'Dynamic 3-row performance SUV with M Sport styling, panoramic Sky Lounge LED roof, and brisk acceleration.',
    price: 118000,
    rentPrice: 380,
    sales: true,
    rent: true,
    location: { lat: 34.0195, lng: -118.4912 },
    address: 'Venice Auto Pavilion, CA',
    mapsLink: 'https://maps.app.goo.gl/random_car_7',
    seats: 6,
    transmission: '8-Speed Sport Automatic',
    fuelType: '4.4L BMW M TwinPower Turbo V8',
    year: 2024,
    mileage: '6,200 miles',
    modelTrim: 'M60i Performance Package',
    availableUnits: [
      { unitId: 'BM-X7', availableDate: 'Available Now', price: 380, isRent: true }
    ],
    amenities: DEFAULT_CAR_FEATURES,
    photos: DEFAULT_CAR_PHOTOS,
    imageUrl: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'car-8',
    title: 'Audi RS6 Avant Performance',
    description: 'The ultimate super-wagon combining sports car acceleration with everyday practicality and Quattro all-wheel drive.',
    price: 135000,
    rentPrice: 420,
    sales: true,
    rent: true,
    location: { lat: 34.1478, lng: -118.1445 },
    address: 'Pasadena High-End Motors, CA',
    mapsLink: 'https://maps.app.goo.gl/random_car_8',
    seats: 5,
    transmission: '8-Speed Tiptronic',
    fuelType: 'Twin-Turbo V8 Hybrid',
    year: 2024,
    mileage: '4,000 miles',
    modelTrim: 'RS6 Avant Performance',
    availableUnits: [
      { unitId: 'AU-66', availableDate: 'Available Now', price: 420, isRent: true },
      { unitId: 'AU-67', availableDate: 'Available Now', price: 135000, isRent: false }
    ],
    amenities: DEFAULT_CAR_FEATURES,
    photos: DEFAULT_CAR_PHOTOS,
    imageUrl: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'car-9',
    title: 'Tesla Model X Plaid',
    description: 'Tri-motor all-electric SUV featuring Falcon Wing doors, rapid 0-60 in 2.5s, and cutting-edge Autopilot tech.',
    price: 98000,
    rentPrice: 290,
    sales: true,
    rent: true,
    location: { lat: 34.0224, lng: -118.2851 },
    address: 'University Park EV Station, CA',
    mapsLink: 'https://maps.app.goo.gl/random_car_9',
    seats: 6,
    transmission: 'Single-Speed Electric AWD',
    fuelType: '100% Electric (1020 HP)',
    year: 2023,
    mileage: '11,000 miles',
    modelTrim: 'Plaid Tri-Motor',
    availableUnits: [
      { unitId: 'TS-XP', availableDate: 'Available Now', price: 290, isRent: true },
      { unitId: 'TS-XQ', availableDate: 'Available Now', price: 98000, isRent: false }
    ],
    amenities: [
      'Tri-Motor All-Wheel Drive',
      'Falcon Wing Doors with Sensors',
      'Full Self-Driving Capability',
      '17-inch Cinematic Display',
      'Yoke Steering Controller',
      'HEPA Air Filtration System'
    ],
    photos: DEFAULT_CAR_PHOTOS,
    imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=800',
  }
];

export const CARS_COLLECTION = 'cars';

let isCarSeedingInProgress = false;

export async function forceUpdateCarsSchema(): Promise<boolean> {
  if (isCarSeedingInProgress) return false;
  try {
    isCarSeedingInProgress = true;
    console.log('Forcing schema update for all cars in Firestore...');
    const batch = writeBatch(db);
    for (const car of SAMPLE_CARS) {
      const docRef = doc(db, CARS_COLLECTION, car.id);
      batch.set(docRef, {
        ...car,
        updatedAt: new Date().toISOString(),
      }, { merge: true });
    }
    await batch.commit();
    console.log('Successfully updated cars schema in Firestore');
    isCarSeedingInProgress = false;
    return true;
  } catch (err) {
    console.error('Error updating Firestore cars schema:', err);
    isCarSeedingInProgress = false;
    return false;
  }
}

export function useRealtimeCars() {
  const [cars, setCars] = useState<Car[]>(SAMPLE_CARS);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [isLive, setIsLive] = useState<boolean>(false);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    try {
      const q = collection(db, CARS_COLLECTION);
      unsubscribe = onSnapshot(
        q,
        async (snapshot) => {
          if (snapshot.empty) {
            await forceUpdateCarsSchema();
            setCars(SAMPLE_CARS);
          } else {
            const liveCars: Car[] = [];
            let needsSchemaUpdate = false;

            snapshot.forEach((docSnap) => {
              const data = docSnap.data() as Car;
              
              if (data.seats === undefined || !data.amenities || !data.photos || data.mapsLink === undefined) {
                needsSchemaUpdate = true;
              }

              liveCars.push({
                ...data,
                id: docSnap.id,
              });
            });

            if (needsSchemaUpdate) {
              await forceUpdateCarsSchema();
            } else {
              setCars(liveCars);
            }
          }
          setLoading(false);
          setIsLive(true);
        },
        (err) => {
          console.warn('Firestore onSnapshot error (using cached fallback):', err);
          setError(err);
          setLoading(false);
          setCars(SAMPLE_CARS);
        }
      );
    } catch (err: any) {
      console.error('Firestore listener setup failed:', err);
      queueMicrotask(() => {
        setError(err);
        setLoading(false);
        setCars(SAMPLE_CARS);
      });
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return { cars, loading, error, isLive };
}
