import { post as Post } from "@prisma/client";
import { useAtom } from "jotai";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { client } from "../../../prisma/client";
import { EditArticleForm } from "../../../src/forms/edit-article";
import { userAtom } from "../../../src/states/userState";

interface Props {
	article: Post | null;
}

const EditArticle: NextPage<Props> = ({ article }) => {
	const [user] = useAtom(userAtom);
	const router = useRouter();

	useEffect(() => {
		if (!user) {
			router.push("/sign-in");
			return;
		}
	}, []);

	if (!user) {
		return null;
	}

	return <EditArticleForm article={article} user={user} />;
};

export const getServerSideProps: GetServerSideProps = async req => {
	const { id } = req.query;

	if (id === "0") {
		return { props: { article: null } };
	}

	const articleId = parseInt(id as string);
	const article = JSON.parse(JSON.stringify(await client.post.findFirst({ where: { id: articleId } })));
	return { props: { article: article } };
};

export default EditArticle;
