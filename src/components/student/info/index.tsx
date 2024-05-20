import ClassLayout from "../../class/home/layout";

export default function StudentInfo() {
	return (
		<ClassLayout>
			<div className="flex flex-col flex-wrap md:flex-row h-full md:items-start">
				<div className="md:w-64 flex-shrink-0 border-2 border-gray-200 rounded-lg py-1 mb-3 md:mb-0">
					<div className="font-bold px-3 py-2">{"{학생이름}"}</div>
					<div className="text-sm p-3">
						<p className="text-xs">광영여고 1학년</p>
						<p>이번 달 결석 #회</p>
						<p>이번주 퀴즈 ##점</p>
						<p>부모님 연락처 010-9999-9999</p>
					</div>
				</div>
				<div className="flex flex-col  flex-grow md:w-96 rounded-lg py-1 md:ml-2">
					<div className="h-56 border-2 border-gray-200 mb-3">
						점수 차트
					</div>
					<div className="h-40  border-2 border-gray-200 mb-3">
						점수 4개
					</div>
					<div className="h-56  border-2 border-gray-200">
						점수 차트
					</div>
				</div>
			</div>
		</ClassLayout>
	);
}
