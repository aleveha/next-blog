import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { nickname } = req.query;
	const articles = await client.post.findMany({ where: { user_nickname: nickname as string } });
	res.status(200).json(articles);
}
