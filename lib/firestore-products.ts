'use client';

import { useState, useEffect } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  deleteDoc,
  writeBatch,
  getDocs,
  serverTimestamp,
  arrayUnion,
} from 'firebase/firestore';
import { db } from './firebase';
import { Product, ProductReview, BOUTIQUE_PRODUCTS } from './products';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
      email: null,
      emailVerified: false,
      isAnonymous: false,
      tenantId: null,
      providerInfo: [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  return errInfo;
}

export const PRODUCTS_COLLECTION = 'products';

// Flag to avoid duplicate seeding in memory during the same session
let isSeedingInProgress = false;

/**
 * Seeds initial boutique products to Firestore if the collection is empty.
 */
export async function seedInitialProductsIfEmpty(): Promise<boolean> {
  if (isSeedingInProgress) return false;
  try {
    isSeedingInProgress = true;
    const snap = await getDocs(collection(db, PRODUCTS_COLLECTION));
    const existingIds = new Set(snap.docs.map((d) => d.id));
    const missingProducts = BOUTIQUE_PRODUCTS.filter((p) => !existingIds.has(p.id));

    if (missingProducts.length > 0) {
      console.log(`Seeding ${missingProducts.length} missing products into Firestore...`);
      const batch = writeBatch(db);
      for (const product of missingProducts) {
        const docRef = doc(db, PRODUCTS_COLLECTION, product.id);
        batch.set(docRef, {
          ...product,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }
      await batch.commit();
      console.log('Successfully synced boutique products into Firestore');
      isSeedingInProgress = false;
      return true;
    }
    isSeedingInProgress = false;
    return false;
  } catch (err) {
    console.error('Error checking or seeding Firestore products:', err);
    isSeedingInProgress = false;
    return false;
  }
}

/**
 * Hook to subscribe to real-time products collection from Firestore.
 */
export function useRealtimeProducts() {
  const [products, setProducts] = useState<Product[]>(BOUTIQUE_PRODUCTS);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [isLive, setIsLive] = useState<boolean>(false);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    try {
      const q = collection(db, PRODUCTS_COLLECTION);
      unsubscribe = onSnapshot(
        q,
        async (snapshot) => {
          if (snapshot.empty) {
            // Seed initial data if empty so the shop displays right away
            await seedInitialProductsIfEmpty();
            // In the meantime, use fallback
            setProducts(BOUTIQUE_PRODUCTS);
          } else {
            const liveProducts: Product[] = [];
            snapshot.forEach((docSnap) => {
              const data = docSnap.data() as Product;
              liveProducts.push({
                ...data,
                id: docSnap.id,
              });
            });
            setProducts(liveProducts);
          }
          setLoading(false);
          setIsLive(true);
        },
        (err) => {
          console.warn('Firestore onSnapshot error (using cached fallback):', err);
          setError(err);
          setLoading(false);
          // Fallback to local products
          setProducts(BOUTIQUE_PRODUCTS);
        }
      );
    } catch (err: any) {
      console.error('Firestore listener setup failed:', err);
      // Asynchronously handle fallback error
      queueMicrotask(() => {
        setError(err);
        setLoading(false);
        setProducts(BOUTIQUE_PRODUCTS);
      });
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return {
    products,
    loading,
    error,
    isLive,
  };
}

/**
 * Hook to subscribe in real-time to a single product document by ID.
 */
export function useRealtimeProduct(productId: string) {
  const defaultFallback =
    BOUTIQUE_PRODUCTS.find((p) => p.id === productId) || BOUTIQUE_PRODUCTS[0];
  const [product, setProduct] = useState<Product>(defaultFallback);
  const [loading, setLoading] = useState<boolean>(Boolean(productId));
  const [isLive, setIsLive] = useState<boolean>(false);

  useEffect(() => {
    if (!productId) {
      return;
    }

    const docRef = doc(db, PRODUCTS_COLLECTION, productId);
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setProduct({
            ...(docSnap.data() as Product),
            id: docSnap.id,
          });
          setIsLive(true);
        } else {
          // If not in firestore yet, check static list
          const found =
            BOUTIQUE_PRODUCTS.find((p) => p.id === productId) || BOUTIQUE_PRODUCTS[0];
          setProduct(found);
        }
        setLoading(false);
      },
      (err) => {
        console.warn('Firestore single product listener error:', err);
        const found =
          BOUTIQUE_PRODUCTS.find((p) => p.id === productId) || BOUTIQUE_PRODUCTS[0];
        setProduct(found);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [productId]);

  return { product, loading, isLive };
}

/**
 * Add or save a product directly to Firestore
 */
export async function addProductToFirestore(product: Product): Promise<void> {
  const docRef = doc(db, PRODUCTS_COLLECTION, product.id);
  await setDoc(docRef, {
    ...product,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
}

/**
 * Update an existing product in Firestore
 */
export async function updateProductInFirestore(
  productId: string,
  updates: Partial<Product>
): Promise<void> {
  const docRef = doc(db, PRODUCTS_COLLECTION, productId);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: new Date().toISOString(),
  });
}

/**
 * Delete a product from Firestore
 */
export async function deleteProductFromFirestore(productId: string): Promise<void> {
  const docRef = doc(db, PRODUCTS_COLLECTION, productId);
  await deleteDoc(docRef);
}

/**
 * Add a review to a product document in Firestore
 */
export async function addReviewToProductInFirestore(
  productId: string,
  review: ProductReview,
  currentReviews: ProductReview[] = [],
  currentRating: number = 5,
  currentReviewsCount: number = 0
): Promise<void> {
  const docRef = doc(db, PRODUCTS_COLLECTION, productId);
  const updatedReviews = [review, ...currentReviews];
  const newReviewsCount = currentReviewsCount + 1;
  const newAverageRating = Number(
    (
      (currentRating * currentReviewsCount + review.rating) /
      newReviewsCount
    ).toFixed(1)
  );

  await updateDoc(docRef, {
    reviews: updatedReviews,
    reviewsCount: newReviewsCount,
    rating: newAverageRating,
    updatedAt: new Date().toISOString(),
  });
}
