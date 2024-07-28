import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import QuizSetList from ".";

import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { convertStr } from "../../lib/convertStr";
import { debounce } from "lodash";
import { Suspense } from "react";
import QuizSetsSkeleton from "./skeleton";
const queryClient = new QueryClient();
const renderComponent = () => {
	render(
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<QuizSetList />
			</BrowserRouter>
		</QueryClientProvider>
	);

	const input = screen.getByPlaceholderText("세트 필터링");

	return { input };
};

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: () => mockedUsedNavigate,
}));

jest.mock("../../lib/convertStr", () => ({
	convertStr: jest.fn((str) => encodeURIComponent(str).replace(/%20/g, "+")),
}));

jest.mock("./list", () => ({ query }: { query: string }) => (
	<div>{`List Component: ${query}`}</div>
));

beforeEach(() => {
	jest.useFakeTimers();
});

afterEach(() => {
	jest.runOnlyPendingTimers();
	jest.useRealTimers();
});

describe("QuizSetList page", () => {
	test("render QuizSetList test", () => {
		const { input } = renderComponent();
		expect(screen.getByText(/Quizlab/i)).toBeInTheDocument();
		expect(input).toBeInTheDocument();
	});

	test("function call after input change", async () => {
		const { input } = renderComponent();
		fireEvent.change(input, { target: { value: "퀴즈세트" } });
		jest.advanceTimersByTime(700);

		await waitFor(() => expect(convertStr).toHaveBeenCalledWith("퀴즈세트"));
	});

	test("debounce function delays execution", () => {
		const mockCallback = jest.fn();
		const debouncedFunction = debounce(mockCallback, 700);

		debouncedFunction();
		expect(mockCallback).not.toHaveBeenCalled();

		jest.advanceTimersByTime(700);
		expect(mockCallback).toHaveBeenCalled();
	});

	test("shows skeleton loader while fetching data", () => {
		render(
			<Suspense fallback={<QuizSetsSkeleton />}>
				<QuizSetList />
			</Suspense>
		);
		expect(screen.getByText(/List Component/i)).toBeInTheDocument();
	});
});
