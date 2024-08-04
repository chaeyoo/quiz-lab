import { useEffect, useRef, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { PiGearSixDuotone } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useCardStore } from "../../store/useQuizStore";
import { IQuiz } from "../../types/quiz";
export default function Quizes({
	id,
	quizes = [],
}: {
	id: number;
	quizes?: IQuiz[];
}) {
	const navigate = useNavigate();
	const [showMeaning, setShowMeaning] = useState(false);
	const [idx, setIdx] = useState<number>(0);
	const [quiz, setQuiz] = useState<IQuiz>(quizes![idx]);
	const [animationClass, setAnimationClass] = useState<string | null>(null);

	const known = useCardStore((state) => state.known);
	const ing = useCardStore((state) => state.ing);
	const addQuiz = useCardStore((state) => state.add);
	const upKnown = useCardStore((state) => state.upKnown);
	const upIng = useCardStore((state) => state.upIng);

	const progress = (idx / (quizes?.length || 1)) * 100;
	const startX = useRef(0);

	const handleTouchStart = (e: any) => {
		startX.current = e.touches[0].clientX;
	};

	const handleTouchEnd = (e: any) => {
		const endX = e.changedTouches[0].clientX;
		const diffX = startX.current - endX;

		if (Math.abs(diffX) > 50) {
			const newIndex = idx + 1;
			if (diffX > 0) {
				upIng();
				addQuiz(quizes![idx]);
				setAnimationClass("card-swipe-left");
			} else {
				upKnown();
				setAnimationClass("card-swipe-right");
			}

			if (newIndex >= quizes!.length) {
				setTimeout(() => {
					navigate(`/card/result?id=${id}`);
				}, 500);
			} else {
				setQuiz(quizes![newIndex]);
				setIdx(newIndex);
			}
		}
	};

	useEffect(() => {
		if (animationClass) {
			const timer = setTimeout(() => {
				setAnimationClass(null);
			}, 500);

			return () => clearTimeout(timer);
		}
	}, [animationClass]);
	return (
		<div>
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

			{/* 알고있음, 학습중 카운트 */}
			<div className="flex justify-between">
				<div className="text-_red border-_red border-r border-y pl-3 pr-4 py-1 mt-4 rounded-r-3xl">
					{ing}
				</div>
				<div className="text-_green border-_green border-l border-y pr-3 pl-4 py-1 mt-4 rounded-l-3xl">
					{known}
				</div>
			</div>

			{/* 단어 */}
			<div className="m-5">
				<div
					className={`relative w-full h-[430px] perspective-1000 cursor-pointer card ${
						animationClass || ""
					}`}
					onClick={() => setShowMeaning(!showMeaning)}
					onTouchStart={handleTouchStart}
					onTouchEnd={handleTouchEnd}
				>
					<div
						className={`relative w-full h-full flex items-center justify-center transition-transform duration-500 transform-style-preserve-3d rounded-xl text-2xl ${
							showMeaning ? "rotateY-180" : "rotateY-0"
						}`}
					>
						<div className="absolute w-full h-full flex items-center justify-center bg-_gray rounded-xl backface-hidden">
							{quiz?.word}
						</div>
						<div className="absolute w-full h-full flex items-center justify-center bg-_gray rounded-xl backface-hidden rotateY-180">
							{quiz?.meaning}
						</div>
					</div>
				</div>
				<div className="text-center mt-5">
					학습 중 표시는 왼쪽으로 스와이프 하세요
				</div>
			</div>
		</div>
	);
}
