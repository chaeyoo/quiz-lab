export default function ExamSkeleton() {
	return (
		<div className="animate-pulse">
			<div
				data-testId="header"
				className="flex justify-between items-center mx-5 my-2 "
			>
				<div className="w-6 h-6 bg-_light-gray rounded-md"></div>
				<div className="w-20 h-6 bg-_light-gray rounded-md"></div>
				<div className="w-6 h-6 bg-_light-gray rounded-md"></div>
			</div>

			{/* progress bar */}
			<div className="relative h-[3px] w-full bg-_light-gray rounded">
				<div
					className="absolute h-full bg-_purple rounded"
					style={{ width: `100%` }}
				></div>
			</div>
			<div>
				<div className="mx-4 h-[350px] content-center text-xl">
					<div className="w-20 h-12 bg-_light-gray rounded-md"></div>
				</div>

				<div className=" mx-4 px-4 py-3 border-2 border-opacity-60 border-_light-gray mb-2 rounded-lg">
					<div className="w-32 h-7 bg-_light-gray rounded-md"></div>
				</div>
				<div className=" mx-4 px-4 py-3 border-2 border-opacity-60 border-_light-gray mb-2 rounded-lg">
					<div className="w-32 h-7 bg-_light-gray rounded-md"></div>
				</div>
				<div className=" mx-4 px-4 py-3 border-2 border-opacity-60 border-_light-gray mb-2 rounded-lg">
					<div className="w-32 h-7 bg-_light-gray rounded-md"></div>
				</div>
				<div className=" mx-4 px-4 py-3 border-2 border-opacity-60 border-_light-gray mb-2 rounded-lg">
					<div className="w-32 h-7 bg-_light-gray rounded-md"></div>
				</div>
			</div>
		</div>
	);
}
