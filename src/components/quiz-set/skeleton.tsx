import { IoPencilOutline } from "react-icons/io5";
import { MdCastForEducation } from "react-icons/md";

export default function QuizSetSkeleton() {
	return (
		<div className="animate-pulse">
			<div data-testId="intro">
				<div className="text-2xl font-semibold mb-5">
					<div className="w-[100px] bg-_small-gray bg-opacity-20 h-[35px] rounded-md"></div>
				</div>
				<div className="flex">
					<div className="mr-5  w-[50px] bg-_small-gray bg-opacity-20 h-[20px] rounded-md"></div>
					<div>{"|"}</div>
					<div className="ml-5  w-[60px] bg-_small-gray bg-opacity-20 h-[20px] rounded-md"></div>
				</div>
			</div>

			<div className="mb-7" data-testid="quiz-study">
				<div className="bg-slate-700 p-5 my-3 rounded-xl flex  bg-_medium-gray items-center">
					<MdCastForEducation className="mr-3" />
					<div className="w-[100px] bg-_small-gray bg-opacity-20 h-[20px] rounded-md"></div>
				</div>

				<div className="bg-slate-700 p-5 my-3 rounded-xl flex  bg-_medium-gray  items-center">
					<IoPencilOutline className="mr-3" />
					<div className="w-[100px] bg-_small-gray bg-opacity-20 h-[20px] rounded-md"></div>
				</div>
			</div>
			<div data-testid="word-list">
				<div className="mb-3 text-sm font-semibold">단어</div>
				<div>
					<div className="bg-_medium-gray p-5 my-3 rounded-xl">
						<div className="flex justify-between">
							<div className="mb-3 text-lg font-semibold">
								<div className="w-[200px] bg-_small-gray bg-opacity-20 h-[30px] rounded-md"></div>
							</div>
						</div>
						<div>
							<div className="w-[150px] bg-_small-gray bg-opacity-20 h-[25px] rounded-md"></div>
						</div>
					</div>
					<div className="bg-_medium-gray p-5 my-3 rounded-xl">
						<div className="flex justify-between">
							<div className="mb-3 text-lg font-semibold">
								<div className="w-[200px] bg-_small-gray bg-opacity-20 h-[30px] rounded-md"></div>
							</div>
						</div>
						<div>
							<div className="w-[150px] bg-_small-gray bg-opacity-20 h-[25px] rounded-md"></div>
						</div>
					</div>
					<div className="bg-_medium-gray p-5 my-3 rounded-xl">
						<div className="flex justify-between">
							<div className="mb-3 text-lg font-semibold">
								<div className="w-[200px] bg-_small-gray bg-opacity-20 h-[30px] rounded-md"></div>
							</div>
						</div>
						<div>
							<div className="w-[150px] bg-_small-gray bg-opacity-20 h-[25px] rounded-md"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
