import { SiGoogleclassroom } from "react-icons/si";
import { FaPagelines } from "react-icons/fa6";
import { MdAccessTime, MdCalendarToday } from "react-icons/md";
import { LuBook } from "react-icons/lu";
import { Input } from "../../atoms/input";
import { Select } from "../../atoms/Select";

export default function ClassCreate() {
	const age: string[] = ["중1", "중2", "중3", "고1", "고2", "고3"];
	const subject: string[] = ["국어", "영어", "수학", "과학", "한국사"];
	const day: string[] = ["월", "화", "수", "목", "금", "토", "일"];

	return (
		<div className="w-full flex flex-col justify-center">
			<h3 className="text-3xl font-bold text-center  my-10">
				클래스를 만들어주세요
			</h3>
			<div className="mx-56">
				<Input
					id="classNm"
					type="text"
					name="classNm"
					className="block w-full rounded-md border-0 py-1.5 pl-7 pr-3 mt-2 mb-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-200 sm:text-sm sm:leading-6"
					placeholder="클래스 이름"
					label="클래스 이름"
					icon={<SiGoogleclassroom />}
				/>
				<Select
					id="age"
					name="age"
					className="block w-full rounded-md border-0 py-1.5 pl-7 pr-3  mt-2 mb-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-200 sm:text-sm sm:leading-6"
					options={age}
					label="클래스 대상 학년"
					icon={<FaPagelines />}
				/>
				<Select
					id="subject"
					name="subject"
					className="block w-full rounded-md border-0 py-1.5 pl-7 pr-3  mt-2 mb-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-200 sm:text-sm sm:leading-6"
					options={subject}
					label="클래스 대상 과목"
					icon={<LuBook />}
				/>
				<Select
					id="day"
					name="day"
					className="block w-full rounded-md border-0 py-1.5 pl-7 pr-3  mt-2 mb-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-200 sm:text-sm sm:leading-6"
					options={day}
					label="클래스 요일"
					icon={<MdCalendarToday />}
				/>
				<Input
					id="time"
					name="time"
					className="block w-full rounded-md border-0 py-1.5 pl-7 pr-3  mt-2 mb-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-200 sm:text-sm sm:leading-6"
					placeholder="클래스 시간"
					label="클래스 시간"
					icon={<MdAccessTime />}
				/>

				<button
					type="submit"
					className="w-full bg-green-500 hover:bg-green-700 text-white  font-bold py-2 px-4 rounded mt-5"
				>
					다음
				</button>
			</div>
		</div>
	);
}
