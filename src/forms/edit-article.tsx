import { post as Post, user as User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import React, { memo, useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../shared/button";
import { Input } from "../shared/input";
import { Layout } from "../shared/layout";
import { TextArea } from "../shared/textaria";

interface Props {
	article: Post | null;
	user: User;
}

type FormData = Post | Omit<Post, "id">;

export const EditArticleForm = memo<Props>(({ article, user }) => {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { isValid, isDirty },
		reset,
	} = useForm<FormData>({
		defaultValues: article ? article : { date: new Date(), user_nickname: user.nickname },
		mode: "onChange",
	});

	const onSubmit = useCallback<SubmitHandler<FormData>>(
		async data => {
			const { data: article } = await axios.post("/api/articles/upsert", data);
			reset(article);
			await router.push("/articles");
		},
		[article]
	);

	const onDelete = useCallback(
		(data: Post) => async () => {
			const { data: delArticle } = await axios.post("/api/articles/delete", data);
			if (delArticle.id === article?.id) {
				await router.push("/articles");
			}
		},
		[article]
	);

	return (
		<Layout title={!article ? "New article" : `Edit: "${article.title}"`}>
			<div className="space-y-20">
				<div className="w-full md:w-1/2">
					<form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
						<Input label="Title" type="text" {...register("title", { required: true })} />
						<TextArea label="Content" {...register("text", { required: true })} />
						<Button disabled={!isDirty || !isValid} type="submit">
							Save article
						</Button>
					</form>
				</div>
				{article ? (
					<Button variant="red" onClick={onDelete(article)}>
						Delete article
					</Button>
				) : null}
			</div>
		</Layout>
	);
});

EditArticleForm.displayName = "EditArticleForm";
