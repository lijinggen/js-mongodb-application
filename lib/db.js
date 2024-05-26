// src/lib/db.js
import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://localhost:27017');

/** @type {import('mongodb').Db} */
let db;

export async function connectDB() {
	await client.connect();
	db = client.db('myDatabase');
	console.log('Connected to MongoDB');
}

export function getDB() {
	return db;
}
