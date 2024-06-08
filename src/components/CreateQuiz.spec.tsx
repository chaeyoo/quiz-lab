import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateQuiz from "./CreateQuiz";

const renderComponent = () => {
	render(<CreateQuiz />);

	const wordinput = screen.getByPlaceholderText(/단어/i);
	const meaningInput = screen.getByPlaceholderText(/뜻/i);
	const addButton = screen.getByText("추가하기");
	const wordErrorMessage = screen.getByText("단어를 입력해주세요.");
	const meaningErrorMessage = screen.getByText("뜻을 입력해주세요.");

	return {
		wordinput,
		meaningInput,
		addButton,
		wordErrorMessage,
		meaningErrorMessage,
	};
};

describe("퀴즈 메인 페이지", () => {
	describe("퀴즈 추가 컴포넌트", () => {
		test("퀴즈 추가 컴포넌트 렌더링", () => {
			const { wordinput, meaningInput, addButton } = renderComponent();

			expect(wordinput).toBeInTheDocument();
			expect(meaningInput).toBeInTheDocument();
			expect(addButton).toBeInTheDocument();
		});

		test('퀴즈 추가에 필수적인 값을 입력하지 않고 "추가" 버튼 클릭시, 에러 메시지를 노출한다', async () => {
			const { addButton, wordErrorMessage, meaningErrorMessage } =
				renderComponent();

			expect(addButton).toBeInTheDocument();
			await userEvent.click(addButton);

			expect(wordErrorMessage).toHaveAttribute("data-valid", "false");
			expect(meaningErrorMessage).toHaveAttribute("data-valid", "false");
		});

		test('퀴즈 추가에 필수적인 값들을 입력한 후 "추가" 버튼 클릭시, 저장에 성공', async () => {
			const {
				wordinput,
				meaningInput,
				addButton,
				wordErrorMessage,
				meaningErrorMessage,
			} = renderComponent();

			await userEvent.type(wordinput, "happy");
			await userEvent.selectOptions(meaningInput, "행복한");
			await userEvent.click(addButton);

			expect(wordErrorMessage).toHaveAttribute("data-valid", "true");
			expect(meaningErrorMessage).toHaveAttribute("data-valid", "true");
		});
	});

	describe("새로운 퀴즈가 입력 되었을 때,", () => {
		const addNewQuiz = async () => {
			const { wordinput, meaningInput, addButton } = renderComponent();
			await userEvent.type(wordinput, "pencil");
			await userEvent.type(meaningInput, "연필");
			await userEvent.click(addButton);
		};
		test("단어와 뜻 데이터가 퀴즈 리스트에 추가 된다", async () => {
			await addNewQuiz();

			const quizListComponent = screen.getByTestId("quizList");
			const dateValue = within(quizListComponent).getByText("pencil");
			expect(dateValue).toBeInTheDocument();

			const descValue = within(quizListComponent).getByText("연필");
			expect(descValue).toBeInTheDocument();
		});
	});
});
