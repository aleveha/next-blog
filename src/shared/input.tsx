import clsx from "clsx";
import React, { FC, forwardRef, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	name: string;
}

export const Input: FC<Props> = forwardRef<HTMLInputElement, Props>(({ name, label, className, ...props }, ref) => {
	return (
		<div className="space-y-2">
			<label htmlFor={name} className="block text-sm font-medium text-neutral-600">
				{label}
			</label>
			<input
				ref={ref}
				name={name}
				aria-label={label}
				className={clsx(
					"py-3 px-4 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border border-gray-300 rounded-xl min-h-[2rem] w-full max-w-[30vw]",
					className
				)}
				{...props}
			/>
		</div>
	);
});

Input.displayName = "Input";
