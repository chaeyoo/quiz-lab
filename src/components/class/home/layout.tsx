import { Disclosure } from "@headlessui/react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const navigation = [
	{ name: "Home", href: "/class", current: true },
	{ name: "학생관리", href: "/student", current: false },
	{ name: "출결관리", href: "/attend", current: false },
	{ name: "오늘의 퀴즈", href: "/quiz", current: false },
];

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export default function ClassLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const location = useLocation();
	useEffect(() => {
		console.log(location);
	}, [location]);
	return (
		<>
			<Disclosure
				as="nav"
				className="border-b-2 border-gray-200 border-opacity-5"
			>
				<>
					<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
						<div className="relative flex h-16 items-center justify-between">
							<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
								<div className="sm:ml-6 sm:block">
									<div className="flex space-x-4">
										{navigation.map((item) => (
											<a
												key={item.name}
												href={item.href}
												className={classNames(
													location.pathname ===
														item.href
														? "border-b-4 border-green-900  text-green-900 font-bold text-sm  py-1"
														: "text-green-700 hover:bg-gray-100 text-sm pt-2",
													"px-3 font-semibold"
												)}
												aria-current={
													item.current
														? "page"
														: undefined
												}
											>
												{item.name}
											</a>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
			</Disclosure>
			{children}
		</>
	);
}
