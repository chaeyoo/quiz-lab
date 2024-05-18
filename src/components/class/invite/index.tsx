import { Input } from "../../atoms/input";

// TODO: debouncing 넣기
export default function ClassInvite() {
	return (
		<div className="w-full flex flex-col justify-center">
			<h5 className="text-lg font-bold text-center mt-10 text-gray-400">
				학생들을 초대해 볼까요?
			</h5>
			<h3 className="text-3xl font-bold text-center  my-5">
				{"{$클래스명}"}에 오신 것을 환영합니다.
			</h3>
			<div className="mx-56 mt-5">
				<Input
					id="student"
					type="text"
					name="student"
					className="block w-full rounded-md border-0 py-1.5 pl-7 pr-3 mt-2 mb-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-200 sm:text-sm sm:leading-6"
					placeholder="이름 또는 이메일"
					label="이름이나 이메일 주소로 학생 찾기"
				/>
				<button
					type="submit"
					className="w-full bg-green-500 hover:bg-green-700 text-white  font-bold py-2 px-4 rounded mt-24 mb-5"
				>
					다음
				</button>

				<a className="block mx-0 text-center text-sm text-blue-500 hover:text-green-700" href="/class">
					이 단계 건너뛰기
				</a>
			</div>
		</div>
	);
}
