import clsx from "clsx";
import React, { FC, forwardRef, TextareaHTMLAttributes } from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label: string;
	name: string;
}

export const TextArea: FC<Props> = forwardRef<HTMLTextAreaElement, Props>(
	({ name, label, className, ...props }, ref) => {
		return (
			<div className="space-y-2">
				<label htmlFor={name} className="block text-sm font-medium text-neutral-600">
					{label}
				</label>
				<textarea
					ref={ref}
					name={name}
					aria-label={label}
					className={clsx(
						"py-3 px-4 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border border-gray-300 rounded-xl min-h-[2rem] w-full",
						className
					)}
					{...props}
				/>
			</div>
		);
	}
);

TextArea.displayName = "TextArea";
