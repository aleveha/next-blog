import { post as Post } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const article = req.body as Post;

	if (!article.id) {
		const newArticle = await client.post.create({
			data: {
				...article,
			},
		});
		res.status(200).json(newArticle);
		return;
	}

	const updatedArticle = await client.post.update({
		where: {
			id: article.id,
		},
		data: {
			...article,
		},
	});

	res.status(200).json(updatedArticle);
}
