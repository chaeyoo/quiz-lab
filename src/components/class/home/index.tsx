import Card from "../../atoms/Card";
import ClassLayout from "./layout";

export default function ClassHome() {
	return (
		<ClassLayout>
			<div>
				<div>
					<div>클래스 정보</div>
					<div>클래스 안내</div>
				</div>
				<div>
					<div>Quiz 랭킹 TOP5</div>
					<div>#월#일 출석현황</div>
				</div>
				<Card title="카드 제목" content="카드 내용" />
			</div>
		</ClassLayout>
	);
}
