'use server';

import type { CartItem } from '@/types';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function placeOrder(cartItems: CartItem[]) {
  if (!cartItems || cartItems.length === 0) {
    throw new Error('Cannot place an order with an empty cart.');
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
    console.error('Failed to place order:', error);
    if (error instanceof Error) {
        throw new Error(`Failed to place order: ${error.message}`);
    }
    throw new Error('An unknown error occurred while placing the order.');
  }
}
