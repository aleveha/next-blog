import { post as Post } from "@prisma/client";
import axios from "axios";
import { useAtom } from "jotai";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Article } from "../../src/shared/article";
import { Layout } from "../../src/shared/layout";
import { LinkButton } from "../../src/shared/link-button";
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
			<div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
				{articles
					.sort((a, b) => b.id - a.id)
					.map(article => (
						<Article article={article} key={article.id} />
					))}
			</div>
			<LinkButton className="w-fit" href="/articles/edit/0">
				New article
			</LinkButton>
		</Layout>
	);
};

export default ArticlesPage;
