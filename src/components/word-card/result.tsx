import { FaXmark } from "react-icons/fa6";
import BoomIcon from "../../assets/svg/boomIcon";
import { useCardStore } from "../../store/useQuizStore";
import ErrorMessage from "./error";
import { useLocation, useNavigate } from "react-router-dom";

export default function CardResult() {
	const navigate = useNavigate();
	const quiz = useCardStore((state) => state.quiz);
	const known = useCardStore((state) => state.known);
	const ing = useCardStore((state) => state.ing);
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const id = queryParams.get("id");
	const resetCount = useCardStore((state) => state.resetCount);
	const clearQuiz = useCardStore((state) => state.clearQuiz);
	if (!known && !ing) {
		return (
			<div className="w-full h-full">
				<ErrorMessage />
			</div>
		);
	}
	return (
		<div className="flex flex-col min-h-screen min-w-[380px]">
			<div
				data-testId="header"
				className="flex justify-between items-center mx-5 mt-9 "
			>
				<FaXmark
					className="text-2xl"
					onClick={() => {
						resetCount();
						clearQuiz();
						navigate(`/${id}`);
					}}
				/>
			</div>

			<div className="flex-grow">
				<div className="flex items-center justify-center px-5 mt-7">
					<div className="text-xl font-bold w-4/6 ml-3">
						잘하고 있어요! <br />
						어려운 단어에 계속
						<br /> 집중하세요!
					</div>
					<div className="w-2/6">
						<BoomIcon className="" />
					</div>
				</div>
				<div className="flex items-center justify-evenly px-5 mt-14">
					<div className="w-2/6 text-5xl font-semibold">
						{((known / (known + ing)) * 100).toFixed(0)}%
					</div>
					<div className="w-3/6 font-semibold">
						<div className=" text-_green flex w-full justify-between mb-5">
							<div>알고 있음</div>
							<div className="border border-_green px-2 rounded-xl">
								{known}
							</div>
						</div>
						<div className="text-_red  flex w-full justify-between">
							<div>학습 중</div>
							<div className="border border-_red px-2 rounded-xl">{ing} </div>
						</div>
					</div>
				</div>
			</div>
			<div className="bg-_purple rounded-md mx-5 text-center py-2 font-semibold mt-auto mb-20">
				학습하기 모드에서 연습하기
			</div>
		</div>
	);
}
