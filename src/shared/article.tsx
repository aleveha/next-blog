import { post as Post } from "@prisma/client";
import Link from "next/link";
import React, { memo } from "react";
import Image from "next/image";

interface ArticleProps {
	article: Post;
}

export const Article = memo<ArticleProps>(({ article }) => {
	return (
		<div className="relative bg-white p-6 shadow rounded-xl w-full xl:max-w-[35vw] space-y-4 flex flex-col justify-between sm:transition sm:duration-300 sm:ease-in-out sm:hover:-translate-y-2 sm:hover:scale-105 sm:hover:shadow-xl">
			<div className="space-y-4 flex flex-col">
				<h2 className="text-2xl font-semibold">{article.title}</h2>
				<div className="flex w-full justify-between">
					<p className="font-semibold">@{article.user_nickname}</p>
					<p className="text-end">{article.date.toString().split("T")[0]}</p>
				</div>
				<p className="text-start items-start line-clamp-4">{article.text}</p>
			</div>
			<div className="w-full flex justify-end">
				<Image src="/static/arrow-right.svg" width={20} height={20} />
			</div>
			<Link href={`/articles/${article.id}`}>
				<a className="absolute inset-0">
					<span className="sr-only">See article</span>
				</a>
			</Link>
		</div>
	);
});

Article.displayName = "Article";
