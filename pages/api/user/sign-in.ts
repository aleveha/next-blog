import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { email, password } = req.body;

	let user = await client.user.findFirst({
		where: {
			email,
		},
	});

	if (!user) {
		user = await client.user.create({
			data: { email, password, nickname: email.split("@")[0] },
		});
	}

	if (!user || user.password !== password) {
		res.status(401).send("Invalid email or password");
		return;
	}

	res.status(200).json(user);
}
