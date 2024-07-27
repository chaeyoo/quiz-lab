import { useQuery } from "react-query";
import { IQuizSet } from "../types/quiz";
import { fetchQuizSets } from "../api/quiz";

export default function useQuizSetList(query: string) {

	const { data, isLoading, error } = useQuery<IQuizSet[]>(
		["quiz-list", query],
		() => fetchQuizSets(query),
		{
			suspense: true,
		}
	);

	return { data, isLoading, error };
}
