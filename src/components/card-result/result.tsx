import { FaXmark } from "react-icons/fa6";
import BoomIcon from "../../assets/svg/boomIcon";
import { useCardStore } from "../../store/useQuizStore";
import ErrorMessage from "../common/error";
import { useNavigate, useParams } from "react-router-dom";
import PieChart from "../common/donut-chart";

export default function CardResult() {
	const navigate = useNavigate();
	const { id } = useParams();
	const known = useCardStore((state) => state.known);
	const ing = useCardStore((state) => state.ing);
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
					<div>
						<PieChart
							data={[
								{ label: "알고 있음", value: known },
								{ label: "학습 중", value: ing },
							]}
							width={100}
							height={100}
						/>
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
			<div
				className="bg-_purple rounded-md mx-10 text-center py-2 font-semibold mt-auto mb-10"
				onClick={() => {
					resetCount();
					clearQuiz();
					navigate(`/${id}/exam`);
				}}
			>
				학습하기 모드에서 연습하기
			</div>
		</div>
	);
}
