import { render, screen } from "@testing-library/react";
import QuizSetList from "./QuizSetList";

const renderComponent = () => {
	render(<QuizSetList />);
	const input = screen.getByPlaceholderText("세트 필터링");
	const list = screen.getByTestId("quiz-sets");
	return { input, list };
};

describe("퀴즈 세트 목록 페이지", () => {
	test("퀴즈 세트 목록 컴포넌트 렌더링", () => {
		const { input, list } = renderComponent();
		expect(input).not.toBeNull();
		expect(list).toBeInTheDocument();
	});
});
