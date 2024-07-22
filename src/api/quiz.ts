const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const REACT_APP_SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

export async function fetchQuizSets(query?: string) {
	try {
		let str = query ? "&name=ilike.%25" + query + "%25" : "";
		const response = await fetch(
			`${SUPABASE_URL}/rest/v1/quiz_set?select=id%2Cname%2Cuser%28nick_name%29%2Cquiz%28id%2Cword%29${str}`,
			{
				headers: {
					"Content-Type": "application/json",
					apikey: REACT_APP_SUPABASE_ANON_KEY!,
				},
			}
		);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		return await response.json();
	} catch (error) {
		console.error("Error fetching quiz sets:", error);
		throw error;
	}
}

export async function fetchQuizSetById(id: number) {
	try {
		const response = await fetch(
			`${SUPABASE_URL}/rest/v1/quiz_set?select=id%2Cname%2Cuser%28nick_name%29%2Cquiz%28id%2Cword%2Cmeaning%2Cstar%29&id=eq.${id}`,
			{
				headers: {
					"Content-Type": "application/json",
					apikey: REACT_APP_SUPABASE_ANON_KEY!,
				},
			}
		);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		return await response.json();
	} catch (error) {
		console.error("Error fetching quiz:", error);
		throw error;
	}
}
