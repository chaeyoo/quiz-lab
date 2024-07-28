import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import List from "./list";
import { IQuizSet } from "../../types/quiz";
import useQuizSetList from "../../hooks/useQuizSetList";

jest.mock("../../hooks/useQuizSetList", () => ({
	__esModule: true,
	default: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
	useNavigate: () => mockNavigate,
}));

const queryClient = new QueryClient();
const renderComponent = () => {
	render(
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<List query="" />
			</BrowserRouter>
		</QueryClientProvider>
	);

	const input = screen.getByText("에 만듦");

	return { input };
};

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: () => mockedUsedNavigate,
}));

beforeEach(() => {
	jest.useFakeTimers();
});

afterEach(() => {
	jest.runOnlyPendingTimers();
	jest.useRealTimers();
});

describe("QuizSetList page", () => {
	const mockData: IQuizSet[] = [
		{
			id: 1,
			name: "Quiz Set 1",
			created_at: "2024-07-28T00:00:00Z",
			modified_at: "2024-07-28T00:00:00Z",
			quiz: [{ word: "example", meaning: "예시", seq: 1, star: false }],
			user: { nick_name: "User1" },
		},
		{
			id: 2,
			name: "Quiz Set 2",
			created_at: "2024-07-28T00:00:00Z",
			modified_at: "2024-07-28T00:00:00Z",
			quiz: [{ word: "example", meaning: "예시", seq: 1, star: false }],
			user: { nick_name: "User1" },
		},
	];
	test("renders loading state", () => {
		(useQuizSetList as jest.Mock).mockReturnValue({
			data: null,
			isLoading: true,
			error: null,
		});
	});
});
