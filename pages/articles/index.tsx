import { post as Post } from "@prisma/client";
import axios from "axios";
import { useAtom } from "jotai";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Article } from "../../src/shared/article";
import { Button } from "../../src/shared/button";
import { Layout } from "../../src/shared/layout";
import { userAtom } from "../../src/states/userState";

const ArticlesPage: NextPage = () => {
	const [user] = useAtom(userAtom);
	const router = useRouter();
	const [articles, setArticles] = React.useState<Post[]>([]);

	useEffect(() => {
		if (!user) {
			router.push("/sign-in");
			return;
		}

		axios.get<Post[]>(`/api/articles/${user.nickname}`).then(({ data }) => {
			setArticles(data);
		});
	}, []);

	return (
		<Layout title="My articles">
			<div>
				{articles.map(article => (
					<Article article={article} key={article.id} />
				))}
			</div>
			<Button>New article</Button>
		</Layout>
	);
};

export default ArticlesPage;
