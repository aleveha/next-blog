import { post as Post } from "@prisma/client";
import { useAtom } from "jotai";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { client } from "../../prisma/client";
import { Layout } from "../../src/shared/layout";
import { LinkButton } from "../../src/shared/link-button";
import { userAtom } from "../../src/states/userState";

interface Props {
	article: Post;
}

const EditArticle: NextPage<Props> = ({ article }) => {
	const [user] = useAtom(userAtom);
	return (
		<Layout title={article.title}>
			<div className="text-xl space-y-10">
				<div className="flex justify-between">
					<p>Article by: @{article.user_nickname}</p>
					<p>{article.date.toString().split("T")[0]}</p>
				</div>
				<p>{article.text}</p>
			</div>
			{user?.nickname === article.user_nickname && (
				<LinkButton className="w-fit" href={`/articles/edit/${article.id}`}>
					Edit article
				</LinkButton>
			)}
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async req => {
	const { id } = req.query;
	const articleId = parseInt(id as string);
	const article = JSON.parse(JSON.stringify(await client.post.findFirst({ where: { id: articleId } })));
	return { props: { article: article } };
};

export default EditArticle;
