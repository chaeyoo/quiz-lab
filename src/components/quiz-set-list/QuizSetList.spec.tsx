import {
render,
	screen,
} from "@testing-library/react";
import QuizSetList from "./QuizSetList";

import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();


const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: () => mockedUsedNavigate,
}));

const renderComponent = () => {
	render(
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<QuizSetList />
			</BrowserRouter>
		</QueryClientProvider>
	);

	const input = screen.getByPlaceholderText("세트 필터링");
	const sets = screen.getByTestId("quiz-sets");
	const set = screen.getAllByTestId("set-list")[0];
	return { input, sets, set };
};

describe("퀴즈 세트 목록 페이지 데이터 없는 경우", () => {
	test("퀴즈 리스트 렌더링 목록 없는 경우 비어있음", () => {
		render(
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<QuizSetList />
				</BrowserRouter>
			</QueryClientProvider>
		);
		expect(screen.getByText("비어있음")).toBeInTheDocument();
	});
});

