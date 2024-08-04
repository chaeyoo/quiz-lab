import { useState, useEffect } from "react";
import useQuizSet from "../../hooks/useQuizSet";
import { IQuizSet } from "../../types/quiz";
import { getRandomEls } from "./common";

export default function Exam({ id }: { id: number }) {
	const { data } = useQuizSet(id);
	const [idx, setIdx] = useState<number>(0);
	const [randomWords, setRandomWords] = useState<string[]>([]);
	const quizSet: IQuizSet | null = data ? data[0] : null;

	useEffect(() => {
		if (quizSet) {
			const words = quizSet.quiz?.map((v) => v.word);
			if (words) setRandomWords(getRandomEls(words, 4));
		}
	}, [quizSet, idx]); // quizSet이 변경될 때만 랜덤 단어 목록 업데이트

	if (data == null || quizSet == null) {
		return <>error</>;
	}

	const quizes = quizSet.quiz;

	if (quizes === undefined) {
		return <>error</>;
	}

	const handleNext = () => {
		// 정답체크 후 모달 오픈
		if (quizes.length > idx + 1) {
			setIdx(idx + 1);
		} else {
			console.log("끝났습니다.");
		}
	};

	return (
		<div data-testId="exam">
			뜻: {quizes[idx].meaning} <br />
			정답단어: {quizes[idx].word}
			{randomWords.map((word, index) => (
				<div onClick={handleNext} key={index}>
					{word}
				</div>
			))}
		</div>
	);
}
