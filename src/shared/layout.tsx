import React, { FC, ReactNode } from "react";
import { Header } from "./header";

interface Props {
	children?: ReactNode;
	title?: string;
}

export const Layout: FC<Props> = ({ children, title }) => {
	return (
		<div className="min-h-screen bg-gray-50 space-y-20">
			<Header />
			<div className="flex justify-center">
				<div className="container space-y-8">
					{title ? <h1 className="font-semibold text-4xl uppercase">{title}</h1> : null}
					{children}
				</div>
			</div>
		</div>
	);
};
