import clsx from "clsx";
import React, { ButtonHTMLAttributes, memo, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: keyof typeof VARIANTS;
}

const VARIANTS = {
	violet: "bg-indigo-600 hover:bg-indigo-700",
	red: "bg-red-600 hover:bg-red-700",
} as const;

export const Button = memo<Props>(({ children, className, variant = "violet", ...rest }) => {
	return (
		<button
			{...rest}
			className={clsx(
				"px-8 py-3 rounded-xl shadow-sm font-medium text-white cursor-pointer flex justify-center items-center disabled:bg-neutral-400 disabled:cursor-not-allowed",
				VARIANTS[variant],
				className
			)}
		>
			{children}
		</button>
	);
});

Button.displayName = "Button";
