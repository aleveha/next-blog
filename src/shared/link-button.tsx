import Link from "next/link";
import React, { AnchorHTMLAttributes, forwardRef, memo, ReactNode } from "react";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
	children: ReactNode;
}

const ButtonBase = forwardRef<AnchorHTMLAttributes<HTMLAnchorElement>, Props>(({ children, ...restProps }, ref) => {
	return (
		<a
			{...ref}
			{...restProps}
			className="px-8 py-3 rounded-xl shadow-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer flex justify-center items-center"
		>
			{children}
		</a>
	);
});

export const LinkButton = memo<Props>(props => {
	return props.href ? (
		<Link href={props.href}>
			<ButtonBase {...props} children={props.children} />
		</Link>
	) : (
		<ButtonBase {...props} children={props.children} />
	);
});

LinkButton.displayName = "LinkButton";
