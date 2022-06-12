import { post as Post } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { client } from "../../prisma/client";
import { Article } from "../../src/shared/article";

interface Props {
	article: Post;
}

const EditArticle: NextPage<Props> = ({ article }) => {
	return (
		<div>
			<Article article={article} />
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async req => {
	const { id } = req.query;
	const articleId = parseInt(id as string);
	const article = JSON.parse(JSON.stringify(await client.post.findFirst({ where: { id: articleId } })));
	return { props: { article: article } };
};

export default EditArticle;
