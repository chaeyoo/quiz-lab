import { FaArrowLeftLong } from "react-icons/fa6";
import { MdCastForEducation } from "react-icons/md";
import { IoPencilOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchQuizSetById } from "../../api/quiz";
import { IQuizSet } from "../../types/quiz";

export default function QuizSet() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [quizSet, setQuizSet] = useState<IQuizSet>();
	useEffect(() => {
		async function getQuizSets() {
			try {
				const data = await fetchQuizSetById(Number(id));
				console.log(data, ":::");
				setQuizSet(data[0]);
			} catch (error) {
				console.error("Error in QuizSetList:", error);
			}
		}

		getQuizSets();
	}, []);
	if (!quizSet) {
		return <>{"존재하지 않는 퀴즈 세트"}</>;
	} else {
		return (
			<div data-testid="quiz-set" className="mx-5 my-14">
				<div
					data-testid="header"
					className="flex flex-row justify-between mb-7"
				>
					<FaArrowLeftLong
						size={25}
						data-testid="back-icon"
						onClick={() => {
							navigate(`/`);
						}}
					/>
				</div>
				<div data-testId="intro">
					<div className="text-2xl font-semibold mb-5">{quizSet.name}</div>
					<div className="flex">
						<div className="mr-5 text-sm">{quizSet.user.nick_name}</div>
						<div>{"|"}</div>
						<div className="ml-5  text-sm">{quizSet.quiz?.length} 단어</div>
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
					<div>
						{quizSet.quiz?.map((quiz) => (
							<div key={quiz.seq} className="bg-slate-700 p-5 my-3 rounded-xl">
								<div className="flex justify-between">
									<div className="mb-3 text-lg font-semibold">{quiz.word}</div>
									<div>{quiz.star ? '⭐' : ""}</div>
								</div>
								<div>{quiz.meaning}</div>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
}
