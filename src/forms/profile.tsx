import { user as User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import React, { memo, useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../shared/button";
import { Input } from "../shared/input";
import { Layout } from "../shared/layout";

interface ProfileFormProps {
	user: User;
	setUser: (user: User | null) => void;
}

export const ProfileForm = memo<ProfileFormProps>(({ user, setUser }) => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { isValid, isDirty },
		reset,
	} = useForm<User>({ defaultValues: user, mode: "onChange" });

	const onSubmit = useCallback<SubmitHandler<User>>(
		async data => {
			const { data: user } = await axios.post("/api/user/update", data);
			setUser(user);
			reset(user);
		},
		[user]
	);

	const onDelete = useCallback(
		(data: User) => async () => {
			const { data: delUser } = await axios.post("/api/user/delete", data);
			if (delUser.email === user.email) {
				setUser(null);
				await router.push("/sign-in");
			}
		},
		[user]
	);

	return (
		<Layout title="Profile">
			<div className="space-y-20">
				<div className="w-full md:w-1/2">
					<form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
						<Input label="Email address" type="email" {...register("email")} />
						<Input label="Nickname" type="text" {...register("nickname")} />
						<Input label="Password" type="password" {...register("password")} />
						<Button disabled={!isDirty || !isValid} type="submit">
							Submit
						</Button>
					</form>
				</div>
				<Button className="bg-red-700" onClick={onDelete(user)}>
					Delete account
				</Button>
			</div>
		</Layout>
	);
});

ProfileForm.displayName = "ProfileForm";
