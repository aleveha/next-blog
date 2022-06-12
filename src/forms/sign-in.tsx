import { user as User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import React, { memo, useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../shared/button";
import { Input } from "../shared/input";
import { Layout } from "../shared/layout";

interface FormData {
	email: string;
	password: string;
}

interface SignInFormProps {
	setUser: (user: User | null) => void;
}

export const SignInForm = memo<SignInFormProps>(({ setUser }) => {
	const router = useRouter();
	const { register, handleSubmit } = useForm<FormData>();

	const onSubmit = useCallback<SubmitHandler<FormData>>(async data => {
		const { data: user } = await axios.post("/api/user/sign-in", data);
		setUser(user);
		await router.push("/");
	}, []);

	return (
		<Layout>
			<div className="h-full">
				<div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
					<div className="sm:mx-auto sm:w-full sm:max-w-md">
						<h2 className="mt-6 text-center text-3xl font-extrabold text-neutral-700">
							Sign in to your account
						</h2>
					</div>
					<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
						<div className="bg-white py-8 px-4 shadow sm:rounded-xl sm:px-10">
							<form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
								<Input label="Email address" type="email" {...register("email")} />
								<Input label="Password" type="password" {...register("password")} />
								<Button className="w-full" type="submit">
									Submit
								</Button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
});

SignInForm.displayName = "SignInForm";
