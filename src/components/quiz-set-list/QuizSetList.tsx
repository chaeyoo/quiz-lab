import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const REACT_APP_SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(
	SUPABASE_URL!,
	REACT_APP_SUPABASE_ANON_KEY!
);

export default function QuizSetList() {
	const [quizSets, setQuizSets] = useState([]);

	async function getQuizSets() {
		const { data }: any = await supabase.from("quiz_set").select();
		setQuizSets(data);
	}

	useEffect(() => {
		console.log(quizSets);
	}, [quizSets]);
	useEffect(() => {
		getQuizSets();
	}, []);

	return (
		<div className="mx-16 my-14">
			<h1 className="text-4xl font-extrabold mb-7">퀴즈랩</h1>
			<div>
				<input
					className="w-full bg-inherit mb-5 p-2 border-b-2 focus:border-b-4 focus:outline-none "
					placeholder="세트 필터링"
				/>
			</div>
		</div>
	);
}
