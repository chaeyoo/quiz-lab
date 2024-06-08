import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateQuiz from "./CreateQuiz";

const renderComponent = () => {
	render(<CreateQuiz />);

	const wordinput = screen.getByPlaceholderText(/단어/i);
	const meaningInput = screen.getByPlaceholderText(/뜻/i);

	const descErrorMessage = screen.getByText("단어를 입력해주세요.");
	const payerErrorMessage = screen.getByText("뜻을 입력해주세요.");

	return {
		wordinput,
		meaningInput,
		descErrorMessage,
		payerErrorMessage,
	};
};

describe("퀴즈 메인 페이지", () => {
	describe("퀴즈 추가 컴포넌트", () => {
		test("퀴즈 추가 컴포넌트 렌더링", () => {
			const { wordinput, meaningInput } = renderComponent();

			expect(wordinput).toBeInTheDocument();
			expect(meaningInput).toBeInTheDocument();
		});
	});
});
