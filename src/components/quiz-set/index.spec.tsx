import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import QuizSet from ".";
const queryClient = new QueryClient();
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: () => mockedUsedNavigate,
}));

jest.mock("./info", () => () => <div>QuizSetInfo Component</div>);
jest.mock("./skeleton", () => () => <div>QuizSetSkeleton</div>);

beforeEach(() => {
	jest.useFakeTimers();
});

afterEach(() => {
	jest.runOnlyPendingTimers();
	jest.useRealTimers();
});

describe("QuizSetList page", () => {
	test("render quiz set component", () => {
		render(
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<QuizSet />
				</BrowserRouter>
			</QueryClientProvider>
		);

		expect(screen.getByText("error")).toBeInTheDocument();
	});
});

describe("QuizSet Component", () => {
	test("renders QuizSet with provided id", async () => {
		render(
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<Routes>
						<Route path="/:id" element={<QuizSet />} />
					</Routes>
				</BrowserRouter>
			</QueryClientProvider>
		);

		// Mock URL to simulate navigation
		window.history.pushState({}, "Test page", "/1");
	});
});
