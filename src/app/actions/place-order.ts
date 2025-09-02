'use server';

import type { CartItem } from '@/types';
import { MongoClient } from 'mongodb';

export async function placeOrder(cartItems: CartItem[]) {
  const connectionString = process.env.MONGO_DB_CONNECTION_STRING;

  if (!connectionString) {
    console.error('MONGO_DB_CONNECTION_STRING is not set in the environment variables.');
    throw new Error('Database configuration is missing.');
  }
  
  if (!cartItems || cartItems.length === 0) {
    throw new Error('Cannot place an order with an empty cart.');
  }

  const client = new MongoClient(connectionString);

  try {
    await client.connect();
    const db = client.db('restaurant');
    const orders = db.collection('orders');
    
    const orderData = {
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
      createdAt: new Date(),
    };

    const result = await orders.insertOne(orderData);
    
    console.log('Order placed successfully:', result.insertedId);
    return JSON.parse(JSON.stringify({ success: true, orderId: result.insertedId }));

  } catch (error) {
    console.error('Failed to place order:', error);
    throw new Error('Failed to connect to the database and place order.');
  } finally {
    await client.close();
  }
}
