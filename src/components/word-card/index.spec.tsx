import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import QuizWordCard from ".";

const queryClient = new QueryClient();

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useParams: jest.fn(),
}));

jest.mock("./card", () => () => <div>Quiz Card Component</div>);
jest.mock("./skeleton", () => () => <div>Skeleton</div>);

describe("Word Card Component Tests", () => {
	test("should render QuizWordCard component with correct id parameter from route", async () => {
		require("react-router-dom").useParams.mockReturnValue({ id: "1" });

		render(
			<QueryClientProvider client={queryClient}>
				<MemoryRouter>
					<QuizWordCard />
				</MemoryRouter>
			</QueryClientProvider>
		);

		const quizSetElement = await screen.findByTestId("word-card");
		expect(quizSetElement).toBeInTheDocument();
	});

	test("should display an error message when id parameter is missing from the route", async () => {
		require("react-router-dom").useParams.mockReturnValue({ id: undefined });

		render(
			<QueryClientProvider client={queryClient}>
				<MemoryRouter>
					<QuizWordCard />
				</MemoryRouter>
			</QueryClientProvider>
		);

		const errorElement = await screen.findByText("error");
		expect(errorElement).toBeInTheDocument();
	});
});
