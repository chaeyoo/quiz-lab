import { useQuery } from "react-query";
import { IQuizSet } from "../types/quiz";
import { fetchQuizSetById } from "../api/quiz";

export default function useQuizSet(id: number) {
	const { data, isLoading, error } = useQuery<IQuizSet[]>(
		["quiz-set"],
		() => fetchQuizSetById(id),
		{
			suspense: true,
		}
	);
	console.log(data, "dkdkdkdk");

	return { data, isLoading, error };
}
