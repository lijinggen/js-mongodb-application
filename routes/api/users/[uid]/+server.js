import { getDB } from '$lib';
import { error, json } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ params }) => {
	const db = getDB();
	const uid = params.uid;

	const resp = await db.collection('users').findOne({ _id: new ObjectId(uid) });

	return json(resp);
};

/** @type { import('./$types').RequestHandler} */
export const PUT = async ({ params, request }) => {
	const db = getDB();
	const uid = params.uid;

	if (request.body) {
		const upd = await request.json();
		const resp = await db.collection('users').updateMany(
			{ _id: new ObjectId(uid) },
			{
				$set: upd
			}
		);

		if (resp.modifiedCount > 0) {
			return json(resp);
		} else {
			return error(500, 'Unable to update');
		}
	}

	return error(400, 'Bad Req');
};

/** @type {import('./$types').RequestHandler} */
export const DELETE = async ({ params }) => {
	const db = getDB();
	const uid = params.uid;
	const resp = await db.collection('users').deleteOne({ _id: new ObjectId(uid) });
	if (resp.deletedCount > 0) return json(resp);
	else return error(500, 'Unable to delete');
};
