import { post as Post } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const article = req.body as Post;
	const deletedArticle = await client.post.delete({
		where: {
			id: article.id,
		},
	});
	res.status(200).json(deletedArticle);
}
