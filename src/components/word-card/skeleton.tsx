export default function CardSkeleton() {
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

			<div className="relative h-[3px] w-full bg-_light-gray rounded">
				<div
					className="absolute h-full bg-_purple rounded"
					style={{ width: `100%` }}
				></div>
			</div>

			<div className="flex justify-between">
				<div className="text-_red border-_red border-r border-y pl-3 pr-4 py-1 mt-4 rounded-r-3xl">
					{0}
				</div>
				<div className="text-_green border-_green border-l border-y pr-3 pl-4 py-1 mt-4 rounded-l-3xl">
					{0}
				</div>
			</div>

			<div className="m-5">
				<div
					className={`relative w-full h-[430px] perspective-1000 cursor-pointer card `}
				>
					<div
						className={`relative w-full h-full flex items-center justify-center transition-transform duration-500 transform-style-preserve-3d rounded-xl text-2xl`}
					>
						<div className="absolute w-full h-full flex items-center justify-center bg-_gray rounded-xl backface-hidden">
							<div className="w-28 h-12 rounded-md bg-_light-gray"></div>
						</div>
					</div>
				</div>
				<div className="text-center mt-5 text-_small-gray">
					학습 중 표시는 왼쪽으로 스와이프 하세요
				</div>
			</div>
		</div>
	);
}
