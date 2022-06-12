import { post as Post } from "@prisma/client";
import Link from "next/link";
import React, { memo } from "react";

interface ArticleProps {
	article: Post;
}

export const Article = memo<ArticleProps>(({ article }) => {
	return (
		<div className="relative bg-white p-6 shadow sm:rounded-xl max-w-[35vw] grid grid-rows-[1fr 1fr auto] grid-cols-2 gap-y-4">
			<h2 className="col-span-2 text-2xl font-semibold">{article.title}</h2>
			<p className="font-semibold">@{article.user_nickname}</p>
			<p>{article.date.toString().split("T")[0]}</p>
			<p className="col-span-2 truncate">{article.text}</p>
			<Link href={`/articles/${article.id}`}>
				<a className="absolute inset-0">
					<span className="sr-only">Edit article</span>
				</a>
			</Link>
		</div>
	);
});

Article.displayName = "Article";
