import { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useBearStore } from "../../store/useBearStore";
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const REACT_APP_SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL!, REACT_APP_SUPABASE_ANON_KEY!);

export default function TestComponent() {
	const bears = useBearStore((state) => state.bears);
	const upBear = useBearStore((state) => state.increase);

	useEffect(() => {
		async function getQuizSets() {
			const { data, error } = await supabase
				.from("quiz_set")
				.select(
					`
				id,
				name,
				user (nick_name),
				quiz ( id, word, meaning, star)
			  `
				)
				.eq("id", 1);
			console.log(data, "단건");
		}
		getQuizSets();
	}, []);
	return (
		<>
			테스트
			<center>
				<h2>count is {bears}</h2>
			</center>
			<center>
				<button
					type="button"
					onClick={() => {
						upBear(100);
					}}
				>
					증가
				</button>
			</center>
		</>
	);
}
