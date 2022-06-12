import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { email, nickname, password } = req.body;

	let user = await client.user.findFirst({
		where: {
			email,
		},
	});

	if (!user) {
		res.status(404).json({
			message: "User not found",
		});
		return;
	}

	user = await client.user.update({
		where: {
			email,
		},
		data: {
			email,
			nickname,
			password,
		},
	});

	res.status(200).json(user);
}
