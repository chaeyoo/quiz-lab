import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import QuizExam from ".";

const queryClient = new QueryClient();

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useParams: jest.fn(),
}));

jest.mock("./exam", () => () => <div>Quiz Exam Component</div>);
jest.mock("./skeleton", () => () => <div>Skeleton</div>);

describe("Word Exam Component Tests", () => {
	test("should render QuizExam component with correct id parameter from route", async () => {
		require("react-router-dom").useParams.mockReturnValue({ id: "1" });

		render(
			<QueryClientProvider client={queryClient}>
				<MemoryRouter>
					<QuizExam />
				</MemoryRouter>
			</QueryClientProvider>
		);

		const quizSetElement = await screen.findByTestId("word-exam");
		expect(quizSetElement).toBeInTheDocument();
	});

	test("should display an error message when id parameter is missing from the route", async () => {
		require("react-router-dom").useParams.mockReturnValue({ id: undefined });

		render(
			<QueryClientProvider client={queryClient}>
				<MemoryRouter>
					<QuizExam />
				</MemoryRouter>
			</QueryClientProvider>
		);

		const errorElement = await screen.findByText("error");
		expect(errorElement).toBeInTheDocument();
	});
});
