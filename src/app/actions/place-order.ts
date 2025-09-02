'use server';

import type { CartItem } from '@/types';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function placeOrder(cartItems: CartItem[]) {
  if (!cartItems || cartItems.length === 0) {
    return { success: false, error: 'Cannot place an order with an empty cart.' };
  }

  try {
    const orderData = {
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, 'orders'), orderData);
    
    console.log('Order placed successfully with ID: ', docRef.id);
    return { success: true, orderId: docRef.id };

  } catch (error) {
    console.error('Detailed error placing order:', error);
    let errorMessage = 'An unknown error occurred while placing the order.';
    if (error instanceof Error) {
        // Log the full error for server-side debugging
        console.error(error.stack);
        errorMessage = `Failed to place order: ${error.message}`;
    }
    
    // Also check for Firebase-specific error codes
    if (typeof error === 'object' && error !== null && 'code' in error) {
      const firebaseError = error as { code: string, message: string };
      if (firebaseError.code === 'permission-denied') {
        errorMessage = "Failed to place order due to database security rules. Please ensure Firestore rules allow writes to the 'orders' collection.";
      }
    }
    
    return { success: false, error: errorMessage };
  }
}
