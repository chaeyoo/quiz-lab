import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Card from "./card";
import useQuizSet from "../../hooks/useQuizSet";
import { IQuizSet } from "../../types/quiz";

const queryClient = new QueryClient();

jest.mock("../../hooks/useQuizSet");

const renderComponent = (id: number) => {
	render(
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Card id={id} />
			</BrowserRouter>
		</QueryClientProvider>
	);
};

describe("Card Component Tests", () => {
	test("should display 'error' message when data is not available", async () => {
		(useQuizSet as jest.Mock).mockReturnValue({
			data: null,
			isLoading: false,
			error: null,
		});

		renderComponent(123);
		expect(screen.getByText("error")).toBeInTheDocument();
	});

	test("should display 'error' message when quiz set is null", async () => {
		(useQuizSet as jest.Mock).mockReturnValue({
			data: [null],
			isLoading: false,
			error: null,
		});

		renderComponent(123);
		expect(screen.getByText("error")).toBeInTheDocument();
	});

	test("should display quiz set information when data is successfully fetched", async () => {
		const mockQuizSet: IQuizSet = {
			name: "Sample Quiz Set",
			user: { nick_name: "User1" },
			quiz: [
				{ seq: 1, word: "word1", meaning: "meaning1", star: true },
				{ seq: 2, word: "word2", meaning: "meaning2", star: false },
			],
			created_at: "2024-07-28T00:00",
			modified_at: "2024-07-28T00:00",
			id: 1,
		};

		(useQuizSet as jest.Mock).mockReturnValue({
			data: [mockQuizSet],
			isLoading: false,
			error: null,
		});

		renderComponent(1);

		const quizesComponent = await screen.findByTestId("main");

		expect(quizesComponent).toBeInTheDocument();

		expect(screen.getByText("word1")).toBeInTheDocument();
		expect(screen.getByText("meaning1")).toBeInTheDocument();
		expect(screen.getByText("1/2")).toBeInTheDocument();
	});
});
