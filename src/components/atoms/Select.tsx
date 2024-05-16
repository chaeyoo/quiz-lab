import { SelectHTMLAttributes, forwardRef } from "react";

interface ISelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	options: string[];
	label?: React.ReactNode;
	isRequired?: boolean;
	hasError?: boolean;
	helpMessage?: React.ReactNode;
	icon?: React.ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, ISelectProps>(
	function TextField({
		options,
		label,
		isRequired,
		hasError,
		helpMessage,
		icon,
		...props
	}) {
		return (
			<>
				{label ? (
					<label
						htmlFor={props.id}
						className={`block text-sm font-bold leading-6 ${
							hasError ? "text-red-600" : "text-gray-900"
						}`}
					>
						{label}
					</label>
				) : null}
				<div className="relative rounded-md shadow-sm">
					<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
						<span className="text-gray-500 sm:text-sm">{icon}</span>
					</div>
					<select {...props}>
						{options.map((option) => (
							<option>{option}</option>
						))}
					</select>
				</div>
			</>
		);
	}
);
