import clsx from "clsx";
import React, { ButtonHTMLAttributes, memo, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
}

export const Button = memo<Props>(({ children, className, ...rest }) => {
	return (
		<button
			className={clsx(
				"px-8 py-3 rounded-xl shadow-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer flex justify-center items-center disabled:bg-neutral-400 disabled:cursor-not-allowed",
				className
			)}
			{...rest}
		>
			{children}
		</button>
	);
});

Button.displayName = "Button";
