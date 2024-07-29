import "./card.css";
import { useNavigate } from "react-router-dom";
import useQuizSet from "../../hooks/useQuizSet";
import { IQuizSet } from "../../types/quiz";
import { FaXmark } from "react-icons/fa6";
import { PiGearSixDuotone } from "react-icons/pi";
import { useRef, useState } from "react";
export default function Card({ id }: { id: number }) {
	const navigate = useNavigate();
	const { data } = useQuizSet(id);
	const [idx, setIdx] = useState<number>(0);
	const [studying, setStudying] = useState<number>(0);
	const [complete, setComplete] = useState<number>(0);

	const [showMeaning, setShowMeaning] = useState(false);
	const startX = useRef(0);
	if (data == null) {
		return null;
	}
	const handleTouchStart = (e: any) => {
		startX.current = e.touches[0].clientX;
	};
	const handleTouchEnd = (e: any) => {
		const endX = e.changedTouches[0].clientX;
		const diffX = startX.current - endX;

		if (Math.abs(diffX) > 50) {
			// 스와이프 거리 조정
			if (diffX > 0) {
				console.log("스와이프 왼쪽");
				alert("스와이프 왼쪽");
			} else {
				console.log("스와이프 오른쪽");
				alert("스와이프 오른쪽");
			}
		}
	};
	const quizSet: IQuizSet = data[0];
	const quiz = quizSet?.quiz && quizSet?.quiz[idx];
	return (
		<div>
			<div
				data-testId="header"
				className="flex justify-between items-center mx-5 my-2 "
			>
				<FaXmark className="text-2xl" />
				<div className="font-semibold tracking-widest">{`${idx + 1}/${
					quizSet.quiz?.length
				}`}</div>
				<PiGearSixDuotone className="text-2xl" />
			</div>

			{/* progress bar */}
			<div className="h-[3px] w-full bg-_light-gray"></div>

			<div className="flex justify-between">
				<div className="text-_red border-_red border-r border-y pl-3 pr-4 py-1 mt-4 rounded-r-3xl">
					{studying}
				</div>
				<div className="text-_green border-_green border-l border-y pr-3 pl-4 py-1 mt-4 rounded-l-3xl">
					{complete}
				</div>
			</div>

			{/* 단어 */}
			<div className="m-5">
				<div
					className="relative w-full h-[615px] perspective-1000 cursor-pointer"
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
