import { post as Post } from "@prisma/client";
import type { NextPage } from "next";
import { client } from "../prisma/client";
import { Article } from "../src/shared/article";
import { Layout } from "../src/shared/layout";

interface Props {
	articles: Post[];
}

const Home: NextPage<Props> = ({ articles = [] }) => {
	return (
		<Layout title="All articles">
			{articles.map(article => (
				<Article article={article} key={article.id} />
			))}
		</Layout>
	);
};

export async function getStaticProps() {
	const posts = JSON.parse(JSON.stringify(await client.post.findMany())) as Post[];

	return {
		props: { articles: posts },
	};
}

export default Home;
