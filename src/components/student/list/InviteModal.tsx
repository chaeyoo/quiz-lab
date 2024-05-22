import { CiMail } from "react-icons/ci";
export default function InviteModal() {
	return (
		<div className="flex p-5 flex-col w-full items-center md:p-10">
			<CiMail fontSize={28} />
			<h3 className="font-bold mb-10">여기쌤에 학생들을 초대해볼까요?</h3>
			<div className="flex flex-col  w-full">
				<p className="text-xs font-bold mb-1 text-green-900">
					학생이름이나, 아이디, 이메일로 검색해보세요.
				</p>
				<div className="flex items-center justify-items-center rounded-lg">
					<input className="border-2 border-green-900 border-opacity-70 focus:border-green-800 focus:border-opacity-40 w-10/12 h-10 rounded-l-md" />
					<button className="bg-green-800 bg-opacity-80 py-1 w-2/12 text-white text-sm hover:bg-900 hover:bg-opacity-70  h-10 rounded-r-md">
						초대
					</button>
				</div>
			</div>
		</div>
	);
}
