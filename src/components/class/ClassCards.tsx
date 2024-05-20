import Card from "../atoms/Card";
import { FaRegEdit } from "react-icons/fa";

export default function ClassCards() {
	return (
		<>
			<div className="flex flex-col grow md:flex-row md:items-center">
				<Card
					title={"클래스 정보"}
					content={"클래스 정보"}
					width="w-1/4"
					height="h-72"
				/>
				<Card
					title={
						<div className="flex justify-between">
							<div>클래스 안내</div>
							<FaRegEdit className="hover:text-green-700" />
						</div>
					}
					content={"클래스 안내"}
					width="w-3/4"
					height="h-72"
				/>
			</div>
			<div className="flex flex-col md:flex-row grow md:items-center">
				<Card
					title={"Quiz 랭킹 TOP5"}
					content={"Quiz 랭킹 TOP5"}
					width="w-1/4"
					height="h-72"
				/>
				<Card
					title={"#월#일 출석현황"}
					content={"#월#일 출석현황"}
					width="w-3/4"
					height="h-72"
				/>
			</div>
		</>
	);
}
