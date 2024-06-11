import { fireEvent, render, screen, within } from "@testing-library/react";
import QuizSetList from "./QuizSetList";
import { quizSets } from "../../mock/data";
import { BrowserRouter, useNavigate } from "react-router-dom";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: () => mockedUsedNavigate,
}));

const renderComponent = () => {
	render(
		<BrowserRouter>
			<QuizSetList quizSets={quizSets} />
		</BrowserRouter>
	);

	const input = screen.getByPlaceholderText("세트 필터링");
	const sets = screen.getByTestId("quiz-sets");
	const set = screen.getAllByTestId("set-list")[0];
	return { input, sets, set };
};
describe("퀴즈 세트 목록 페이지 데이터 없는 경우", () => {
	test("퀴즈 리스트 렌더링 목록 없는 경우 비어있음", () => {
		render(
			<BrowserRouter>
				<QuizSetList quizSets={[]} />
			</BrowserRouter>
		);
		expect(screen.getByText("비어있음")).toBeInTheDocument();
	});
});

describe("퀴즈 세트 목록 페이지 데이터 있는 경우", () => {
	test("퀴즈 세트 목록 컴포넌트 렌더링", () => {
		const { input, sets, set } = renderComponent();
		expect(input).not.toBeNull();
		expect(sets).toBeInTheDocument();

		expect(within(set).getByText("퀴즈세트1")).toBeInTheDocument();
		expect(within(set).getByText("author1")).toBeInTheDocument();
		expect(within(set).getByTestId("set-length")).toBeInTheDocument();
	});

	test("퀴즈 세트 클릭, useNavigate 호출", () => {
		const { set } = renderComponent();

		fireEvent.click(set);
		expect(mockedUsedNavigate).toHaveBeenCalled();
		mockedUsedNavigate.mockRestore();
	});

	test("퀴즈 세트 클릭, 링크 이동", () => {
		const navigate = useNavigate();
		const { set } = renderComponent();

		fireEvent.click(set);
		expect(navigate).toHaveBeenCalledWith("/quiz/1");
	});
});
