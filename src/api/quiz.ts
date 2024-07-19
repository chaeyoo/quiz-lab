const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const REACT_APP_SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

export async function fetchQuizSets() {
	try {
		const response = await fetch(`${SUPABASE_URL}/rest/v1/quiz_set?select=*`, {
			headers: {
				"Content-Type": "application/json",
				apikey: REACT_APP_SUPABASE_ANON_KEY!,
			},
		});
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		return await response.json();
	} catch (error) {
		console.error("Error fetching quiz sets:", error);
		throw error;
	}
}
