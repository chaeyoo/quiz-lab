import { FaArrowLeftLong } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { MdCastForEducation } from "react-icons/md";
import { IoPencilOutline } from "react-icons/io5";
import { IQuizSet } from "../../types/quiz";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function QuizSet({ quizSet }: { quizSet: IQuizSet | null }) {
	const navigate = useNavigate();
	const [menuOpen, setMenuOpen] = useState<boolean>(false);
	if (!quizSet) {
		return <div>존재하지 않는 세트입니다.</div>;
	}
	return (
		<div data-testid="quiz-set" className="mx-16 my-14">
			{menuOpen && (
				<div className="fixed top-14 right-14 bg-gray-300 z-999 w-36 h-24 flex flex-col items-center justify-center rounded-md">
					<div className="p-2 text-black border-b-2 border-blue-900 w-full text-center font-semibold">
						수정하기
					</div>
					<div className="p-2 text-black border-blue-900 w-full text-center font-semibold">
						삭제하기
					</div>
				</div>
			)}
			<div data-testid="header" className="flex flex-row justify-between mb-7">
				<FaArrowLeftLong
					size={25}
					data-testid="back-icon"
					onClick={() => {
						navigate(`/`);
					}}
				/>
				<BsThreeDots
					size={25}
					data-testid="menu-icon"
					onClick={() => {
						setMenuOpen(true);
					}}
				/>
			</div>
			<div data-testId="intro">
				<div className="text-2xl font-semibold mb-5">{quizSet.name}</div>
				<div>
					<span className="font-semibold mr-2">{quizSet.author}</span> |
					<span className="font-semibold ml-2">{`${quizSet.length}단어`}</span>
				</div>
			</div>

			<div className="mb-7" data-testid="quiz-study">
				<div className="bg-slate-700 p-5 my-3 rounded-xl flex items-center">
					<MdCastForEducation className="mr-3" />
					낱말카드
				</div>

				<div className="bg-slate-700 p-5 my-3 rounded-xl flex items-center">
					<IoPencilOutline className="mr-3" />
					학습하기
				</div>
			</div>

			<div data-testid="word-list">
				<div className="mb-3 text-sm font-semibold">단어</div>
				{quizSet.quizes &&
					quizSet.quizes.length > 0 &&
					quizSet.quizes.map((quiz) => (
						<div
							className="bg-slate-700 p-7 my-3 rounded-xl"
							key={quiz.seq}
							data-testid="word"
						>
							<div className="mb-5">{quiz.word}</div>
							<div>{quiz.mean}</div>
						</div>
					))}
			</div>
		</div>
	);
}
