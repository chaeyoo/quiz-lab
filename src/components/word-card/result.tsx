import BoomIcon from "../../assets/svg/boomIcon";
import { useCardStore } from "../../store/useQuizStore";

export default function CardResult() {
	const quiz = useCardStore((state) => state.quiz);
	const known = useCardStore((state) => state.known);
	const ing = useCardStore((state) => state.ing);

	return (
		<div className="flex flex-col min-h-screen">
			{" "}
			{/* 전체 화면 높이를 채우는 flex 컨테이너 */}
			<div className="flex-grow">
				{" "}
				{/* 상단의 내용을 flex-grow로 화면을 채우도록 설정 */}
				<div className="flex items-center justify-evenly px-5 mt-10">
					<div className="text-xl font-bold w-4/6">
						잘하고 있어요! 어려운
						<br />
						단어에 계속 집중하세요!
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
							<div>알고 있음</div>{" "}
							<div className="border border-_green px-2 rounded-xl">
								{known}{" "}
							</div>
						</div>
						<div className="text-_red  flex w-full justify-between">
							<div>학습 중</div>{" "}
							<div className="border border-_red px-2 rounded-xl">{ing} </div>
						</div>
					</div>
				</div>
			</div>
			{/* 바닥쪽에 고정된 두 개의 div */}
			<div className="bg-_purple rounded-md mx-5 text-center py-2 font-semibold mt-auto mb-3">
				{`${ing} 단어 계속 복습하기`}
			</div>
			<div className="border border-l-_light-gray rounded-md mx-5 text-center py-2 font-semibold mt-2  mb-16">
				학습하기 모드에서 연습하기
			</div>
		</div>
	);
}
