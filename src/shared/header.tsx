import { useAtom } from "jotai";
import Link from "next/link";
import React, { memo } from "react";
import { userAtom } from "../states/userState";
import { LinkButton } from "./link-button";

export const Header = memo(() => {
	const [user] = useAtom(userAtom);

	return (
		<header className="bg-white flex justify-center border-b max-h-[100px]">
			<div className="container py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
				<Link href="/">
					<a className="font-semibold uppercase text-xl text-neutral-600">Blog</a>
				</Link>
				<div className="flex space-x-10">
					{user ? (
						<>
							<LinkButton href="/profile">Profile</LinkButton>
							<LinkButton href="/articles">My articles</LinkButton>
						</>
					) : null}
					<LinkButton href={"/sign-in"}>{user ? "Log out" : "Sign in"}</LinkButton>
				</div>
			</div>
		</header>
	);
});

Header.displayName = "Header";
