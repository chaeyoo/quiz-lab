import { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const REACT_APP_SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL!, REACT_APP_SUPABASE_ANON_KEY!);

export default function TestComponent() {
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
	return <>테스트</>;
}
