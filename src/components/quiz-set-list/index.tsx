import { useEffect, useState } from "react";
import { fetchQuizSets } from "../../api/quiz";
import { IQuizSet } from "../../types/quiz";
import { useNavigate } from "react-router-dom";
import { convertStr } from "../../lib/convertStr";
import { debounce } from "../../lib/debounce";
// import { createClient } from "@supabase/supabase-js";
// import { convertStr } from "../../lib/convertStr";
// const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
// const REACT_APP_SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;
// const supabase = createClient(SUPABASE_URL!, REACT_APP_SUPABASE_ANON_KEY!);
export default function QuizSetList() {
	type GroupedQuizSets = { [key: string]: IQuizSet[] };
	const [sortedYm, setSortedYm] = useState<string[]>();
	const [grouped, setGrouped] = useState<GroupedQuizSets>();
	const navigate = useNavigate();
	const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const data = await fetchQuizSets(convertStr(e.target.value));
		setQuizSetList(data);
	};

	function groupQuizSetsByDate(quizSets: IQuizSet[]): {
		[key: string]: IQuizSet[];
	} {
		return quizSets.reduce((acc, quizSet) => {
			const date = new Date(quizSet.created_at);
			const yearMonth = `${date.getFullYear()}년 ${date.getMonth() + 1}월`;

			if (!acc[yearMonth]) {
				acc[yearMonth] = [];
			}
			acc[yearMonth].push(quizSet);

			return acc;
		}, {} as { [key: string]: IQuizSet[] });
	}

	function setQuizSetList(data: IQuizSet[]) {
		const grouped: GroupedQuizSets = groupQuizSetsByDate(data);
		const sortedYearMonth = Object.keys(grouped).sort((a, b) => {
			const [aYear, aMonth] = a.split("년 ").map(Number);
			const [bYear, bMonth] = b.split("년 ").map(Number);
			return bYear - aYear || bMonth - aMonth;
		});
		setSortedYm(sortedYearMonth);
		setGrouped(grouped);
	}

	const handleChangeKeyWord = debounce<typeof onChange>(onChange, 700);
	// useEffect(() => {
	// 	async function getQuizSets() {
	// 		const { data, error } = await supabase
	// 			.from("quiz_set")
	// 			.select(
	// 				`
	// 			id,
	// 			name,
	// 			user (nick_name),
	// 			quiz ( id, word, meaning, star)
	// 		  `
	// 			)
	// 			.eq("id", 1);
	// 		console.log(data, '단건');
	// 	}
	// 	getQuizSets();
	// }, []);

	useEffect(() => {
		(async function getQuizSets() {
			try {
				const data = await fetchQuizSets();
				setQuizSetList(data);
			} catch (error) {
				console.error("Error in QuizSetList:", error);
			}
		})();

		// getQuizSets();
	}, []);

	return (
		<div className="mx-5 my-14 min-w-[300px]">
			<h1 className="text-4xl font-extrabold mb-7 ">Quizlab</h1>
			<div>
				<input
					className="w-full bg-inherit mb-5 p-2 border-b-_light-gray border-b-2 focus:border-b-4 focus:outline-none bg-_navy placeholder:text-_small-gray"
					placeholder="세트 필터링"
					onChange={handleChangeKeyWord}
				/>
			</div>
			<div>
				{sortedYm?.map((group, idx) => (
					<div key={idx} className="mb-10">
						<div className=" font-semibold mb-4">{group}에 만듦</div>
						<div>
							{grouped &&
								grouped[group].map((quizSet, idx) => (
									<div
										key={idx}
										className="border-gray-700 border-2  rounded-2xl p-4 mb-4 border-_gray"
										onClick={() => {
											navigate(`/${quizSet.id}`);
										}}
									>
										<div className="mb-1 font-semibold">{quizSet.name}</div>
										<div className="text-xs mb-3">
											{quizSet.quiz ? quizSet.quiz.length : 0} 단어
										</div>
										<div className="text-xs">{quizSet.user.nick_name}</div>
									</div>
								))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
