import { useState, useEffect } from "react";
import useQuizSet from "../../hooks/useQuizSet";
import { IQuizSet } from "../../types/quiz";
import { getRandomEls, shuffleArray } from "./common";
import { FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { PiGearSixDuotone } from "react-icons/pi";
import Modal from "./modal";
import { useAnsStore } from "../../store/useAnsStore";
export type modalMsg = {
	msg: string;
	word: string;
	mean: string;
	select: string;
};
export default function Exam({ id }: { id: number }) {
	const { data } = useQuizSet(id);
	const [idx, setIdx] = useState<number>(0);
	const [randomWords, setRandomWords] = useState<string[]>([]);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [modalMessage, setModalMessage] = useState<modalMsg>({
		msg: "",
		word: "",
		mean: "",
		select: "",
	});
	const [correct, setCorrect] = useState<boolean>(false);
	const quizSet: IQuizSet | null = data ? data[0] : null;
	const navigate = useNavigate();
	const correctQuiz = useAnsStore((state) => state.correct);
	const wrongQuiz = useAnsStore((state) => state.wrong);
	useEffect(() => {
		if (quizSet) {
			const words = quizSet.quiz?.map((v) => v.word);
			if (words && quizes) {
				let random = [
					quizes[idx].word,
					...getRandomEls(words, 3, quizes[idx].word),
				];
				setRandomWords(shuffleArray(random));
			}
		}
	}, [quizSet, idx]);

	if (data == null || quizSet == null) {
		return <>error</>;
	}

	const quizes = quizSet.quiz;
	const progress = (idx / (quizes?.length || 1)) * 100;
	if (quizes === undefined) {
		return <>error</>;
	}
	const handleModalClose = () => {
		setIsModalOpen(false);
		if (quizes.length > idx + 1) {
			setIdx(idx + 1);
		} else {
			setTimeout(() => {
				navigate(`/${id}/exam/result`);
			}, 300);
		}
	};
	const handleNext = (event: React.MouseEvent<HTMLDivElement>) => {
		const clickedWord = (event.currentTarget as HTMLDivElement).getAttribute(
			"data-word"
		);
		if (clickedWord) {
			if (quizes[idx].word === clickedWord) {
				correctQuiz(quizes[idx]);
				setModalMessage({
					msg: "😆 정확해요!",
					word: quizes[idx].word,
					mean: quizes[idx].meaning,
					select: clickedWord,
				});
				setCorrect(true);
			} else {
				wrongQuiz(quizes[idx]);
				setModalMessage({
					msg: `😞학습이 필요해요!`,
					word: quizes[idx].word,
					mean: quizes[idx].meaning,
					select: clickedWord,
				});
				setCorrect(false);
			}
			setIsModalOpen(true);
		}
	};

	return (
		<div data-testId="exam">
			{/* header */}
			<div
				data-testId="header"
				className="flex justify-between items-center mx-5 my-2 "
			>
				<FaXmark className="text-2xl" onClick={() => navigate(`/${id}`)} />
				<div className="font-semibold tracking-widest">{`${idx + 1}/${
					quizes?.length
				}`}</div>
				<PiGearSixDuotone className="text-2xl" />
			</div>

			{/* progress bar */}
			<div className="relative h-[3px] w-full bg-_light-gray rounded">
				<div
					className="absolute h-full bg-_purple rounded transition-width duration-300 ease-in-out"
					style={{ width: `${progress}%` }}
				></div>
			</div>
			<div>
				<div className="mx-4 h-[350px] content-center text-xl">
					{quizes[idx].meaning}
				</div>
				{randomWords.map((word, index) => (
					<div
						className=" mx-4 px-4 py-3 border-2 border-opacity-60 border-_light-gray mb-2 rounded-lg"
						onClick={handleNext}
						key={index}
						data-word={word}
					>
						{word}
					</div>
				))}
				<Modal
					isOpen={isModalOpen}
					onClose={handleModalClose}
					message={modalMessage}
					correct={correct}
				/>
			</div>
		</div>
	);
}
