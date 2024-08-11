import { useNavigate, useParams } from "react-router-dom";
import { useAnsStore } from "../../store/useAnsStore";
import { FaXmark } from "react-icons/fa6";
import PieChart from "../common/donut-chart";
import ErrorMessage from "../common/error";

export default function ExamResult() {
	const navigate = useNavigate();
	const { id } = useParams();
	const oQuiz = useAnsStore((state) => state.oQuiz);
	const xQuiz = useAnsStore((state) => state.xQuiz);
	const clearQuiz = useAnsStore((state) => state.clearQuiz);
	if (oQuiz.length === 0 && xQuiz.length === 0) {
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
				className="flex justify-between items-center mx-5 mt-7 "
			>
				<FaXmark
					className="text-2xl"
					onClick={() => {
						clearQuiz();
						navigate(`/${id}`);
					}}
				/>
			</div>

			<div className="flex-grow px-10 mt-7">
				<div className="text-xl font-semibold">테스트 결과</div>
				<div className="flex justify-evenly mt-5 mb-10 items-center">
					<div>
						<PieChart
							data={[
								{ label: "정답", value: oQuiz.length || 0 },
								{ label: "오답", value: xQuiz.length || 0 },
							]}
							width={100}
							height={100}
						/>
					</div>
					<div className="w-3/6 font-semibold">
						<div className=" text-_green flex w-full justify-around mb-5">
							<div>정답</div>
							<div className="border border-_green px-2 rounded-xl">
								{oQuiz.length || 0}
							</div>
						</div>
						<div className="text-_red  flex w-full justify-around ">
							<div>오답</div>
							<div className="border border-_red px-2 rounded-xl">
								{xQuiz.length || 0}{" "}
							</div>
						</div>
					</div>
				</div>
				{xQuiz.length > 0 && (
					<div className="mb-10">
						<div className="text-xl font-semibold">틀린 단어</div>
						{xQuiz.map((quiz, idx) => (
							<div
								key={idx}
								className="bg-_medium-gray px-5 py-2 my-3 rounded-xl"
							>
								<div className="flex justify-between">
									<div className="mb-3 text-lg font-semibold">{quiz.word}</div>
								</div>
								<div>{quiz.meaning}</div>
							</div>
						))}
					</div>
				)}
			</div>
			<div
				className="bg-_purple rounded-md mx-10 text-center py-2 font-semibold mt-auto mb-10"
				onClick={() => {
					clearQuiz();
					navigate(`/${id}/card`);
				}}
			>
				낱말카드 모드에서 연습하기
			</div>
		</div>
	);
}
