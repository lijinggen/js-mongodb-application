import { getDB } from '$lib';
import { json, error } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';

/** @type {import("./$types").RequestHandler} */
export const GET = async ({ url }) => {
	const db = getDB();
	const params = url.searchParams;

	/**
	 * @typedef {import('mongodb').Document} Document
	 * @typedef {import('mongodb').WithId<Document>} doc
	 * @type { doc | doc[] | null }
	 */
	let resp = null;

	if (params.size > 0) {
		const usr = params.get('username');
		if (usr) resp = await db.collection('users').findOne({ username: usr });
	} else {
		resp = await db.collection('users').find().toArray();
	}

	if (resp) return json(resp);
	return json({});
};

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request }) => {
	const db = getDB();

	if (!request.body) return error(400, 'Bad Req');

	const data = await request.json();

	// 仅为便于测试使用
	data._id = new ObjectId('662e6b900e8a9b81b6db5454')

	const resp = await db.collection('users').insertOne(data);

	if (resp.acknowledged) {
		return json(resp);
	}

	return error(500, 'Fail');
};
