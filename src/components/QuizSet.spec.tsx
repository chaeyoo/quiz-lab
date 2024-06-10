import { render, screen } from "@testing-library/react";
import QuizSet from "./QuizSet";

const renderComponent = () => {
	render(<QuizSet />);

	const quizSet = screen.getByTestId("quiz-set");
	return { quizSet };
};

describe("퀴즈 세트 상세 페이지", () => {
	test("퀴즈 세트 상세 컴포넌트 렌더링", () => {
		const { quizSet } = renderComponent();
		expect(quizSet).not.toBeNull();
	});
});
