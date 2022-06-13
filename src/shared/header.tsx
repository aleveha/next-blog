import { user as User } from "@prisma/client";
import clsx from "clsx";
import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import React, { memo, useCallback, useState } from "react";
import { userAtom } from "../states/userState";
import { LinkButton } from "./link-button";

interface HeaderButtonsProps {
	user: User | null;
}

const HeaderButtons = memo<HeaderButtonsProps>(({ user }) => (
	<>
		{user ? (
			<>
				<LinkButton href="/profile">Profile</LinkButton>
				<LinkButton href="/articles">My articles</LinkButton>
			</>
		) : null}
		<LinkButton href={"/sign-in"}>{user ? "Log out" : "Sign in"}</LinkButton>
	</>
));

export const Header = memo(() => {
	const [user] = useAtom(userAtom);
	const [openBurger, setOpenBurger] = useState(false);

	const onBurgerOpen = useCallback((value: boolean) => () => setOpenBurger(value), [setOpenBurger]);

	return (
		<header className="bg-white flex justify-center border-b max-h-[100px]">
			<div className="px-6 sm:px-0 container py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
				<Link href="/">
					<a className="font-semibold uppercase text-xl text-neutral-600 flex justify-center items-center">
						<Image src="/static/home.svg" alt="home" width={40} height={40} />
					</a>
				</Link>
				<div className="hidden sm:flex sm:space-x-10">
					<HeaderButtons user={user} />
				</div>
				<a onClick={onBurgerOpen(true)} className="sm:hidden flex justify-center items-center">
					<Image src="/static/menu-burger.svg" alt="menu-burger" width={40} height={40} />
				</a>
				<div
					className={clsx(
						"absolute inset-y-0 right-0 w-3/4 z-10 border-indigo-600 border-l",
						openBurger ? "block" : "hidden"
					)}
				>
					<div className="p-10 flex flex-col justify-end bg-neutral-50 w-full h-full space-y-6">
						<HeaderButtons user={user} />
						<a className="flex justify-center items-center p-2" onClick={onBurgerOpen(false)}>
							<Image src="/static/exit.svg" alt="exit" width={30} height={30} />
						</a>
					</div>
				</div>
			</div>
		</header>
	);
});

Header.displayName = "Header";
