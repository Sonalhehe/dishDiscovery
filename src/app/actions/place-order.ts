'use server';

import type { CartItem } from '@/types';
import { MongoClient, ServerApiVersion } from 'mongodb';

export async function placeOrder(cartItems: CartItem[]) {
  const connectionString = process.env.MongoDbUri;

  if (!connectionString) {
    console.error('MongoDbUri is not set in the environment variables.');
    throw new Error('Database configuration is missing.');
  }
  
  if (!cartItems || cartItems.length === 0) {
    throw new Error('Cannot place an order with an empty cart.');
  }

  const client = new MongoClient(connectionString, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  try {
    await client.connect();
    const db = client.db('restaurant'); // database name from connection string is used if not specified
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
    // The result from insertOne contains BSON types that are not directly serializable
    return JSON.parse(JSON.stringify({ success: true, orderId: result.insertedId }));

  } catch (error) {
    console.error('Failed to place order:', error);
    if (error instanceof Error) {
        throw new Error(`Failed to place order: ${error.message}`);
    }
    throw new Error('An unknown error occurred while placing the order.');
  } finally {
    await client.close();
  }
}
