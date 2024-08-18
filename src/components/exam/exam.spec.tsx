import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Exam from "./exam";
import useQuizSet from "../../hooks/useQuizSet";

jest.mock("../../hooks/useQuizSet");
jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: () => jest.fn(),
}));

const mockCorrect = jest.fn();
const mockWrong = jest.fn();
const mockClearQuiz = jest.fn();

const mockUseAnsStore = jest.fn();
jest.mock("../../store/useAnsStore", () => ({
	useAnsStore: (selector: any) => mockUseAnsStore(selector),
}));

const queryClient = new QueryClient();

const mockQuizSet = {
	id: 1,
	name: "Test Quiz",
	user: { nick_name: "Tester" },
	created_at: "2024-03-15T00:00:00Z",
	modified_at: "2024-03-15T00:00:00Z",
	quiz: [
		{ word: "apple", meaning: "사과", seq: 1, star: false },
		{ word: "banana", meaning: "바나나", seq: 2, star: false },
		{ word: "cherry", meaning: "체리", seq: 3, star: false },
		{ word: "date", meaning: "대추", seq: 4, star: false },
	],
};

const renderComponent = (id: number) => {
	render(
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Exam id={id} />
			</BrowserRouter>
		</QueryClientProvider>
	);
};

describe("Exam Component", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		(useQuizSet as jest.Mock).mockReturnValue({
			data: [mockQuizSet],
			isLoading: false,
			error: null,
		});

		mockUseAnsStore.mockImplementation((selector) =>
			selector({
				oQuiz: [],
				xQuiz: [],
				correct: mockCorrect,
				wrong: mockWrong,
				clearQuiz: mockClearQuiz,
			})
		);
	});
	test("renders exam component", () => {
		renderComponent(1);
		expect(screen.getByTestId("exam")).toBeInTheDocument();
	});

	test("displays correct progress", () => {
		renderComponent(1);
		expect(screen.getByText("1/4")).toBeInTheDocument();
	});

	test("displays quiz meaning", () => {
		renderComponent(1);
		expect(screen.getByText("사과")).toBeInTheDocument();
	});

	test("displays error message when data is null", () => {
		(useQuizSet as jest.Mock).mockReturnValue({
			data: null,
			isLoading: false,
			error: null,
		});

		renderComponent(1);
		expect(screen.getByText("error")).toBeInTheDocument();
	});

	test("calls correct function when right answer is selected", async () => {
		renderComponent(1);
		fireEvent.click(screen.getByText("apple"));

		await waitFor(() => {
			expect(mockCorrect).toHaveBeenCalledWith(mockQuizSet.quiz[0]);
		});
	});

	test("calls wrong function when wrong answer is selected", async () => {
		renderComponent(1);
		fireEvent.click(screen.getByText("banana"));

		await waitFor(() => {
			expect(mockWrong).toHaveBeenCalledWith(mockQuizSet.quiz[0]);
		});
	});
});
