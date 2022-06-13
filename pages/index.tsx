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
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
				{articles
					.sort((a, b) => b.id - a.id)
					.map(article => (
						<Article article={article} key={article.id} />
					))}
			</div>
		</Layout>
	);
};

export async function getServerSideProps() {
	const posts = JSON.parse(JSON.stringify(await client.post.findMany())) as Post[];

	return {
		props: { articles: posts },
	};
}

export default Home;
