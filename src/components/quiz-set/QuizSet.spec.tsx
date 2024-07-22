import { fireEvent, render, screen, within } from "@testing-library/react";
import QuizSet from ".";
import { BrowserRouter, useNavigate } from "react-router-dom";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: () => mockedUsedNavigate,
}));

const renderComponent = () => {
	render(
		<BrowserRouter>
		</BrowserRouter>
	);
	const set = screen.getByTestId("quiz-set");
	return { set };
};
describe("퀴즈 세트 페이지 데이터 없는 경우", () => {
	test("퀴즈 데이터 없는 경우, 안내 문구 노출", () => {
		render(<QuizSet  />);
		expect(screen.getByText(/존재하지 않는 세트/i)).toBeInTheDocument();
	});
});

describe("퀴즈 세트 페이지 데이터 있는 경우", () => {
	test("퀴즈 세트 컴포넌트, header 렌더링", () => {
		const { set } = renderComponent();
		expect(set).toBeInTheDocument();

		expect(within(set).getByTestId("back-icon")).toBeInTheDocument();
		expect(within(set).getByTestId("menu-icon")).toBeInTheDocument();
	});

	test("퀴즈 세트 인트로 렌더링", () => {
		const { set } = renderComponent();

		const intro = within(set).getByTestId("intro");
		expect(intro).toBeInTheDocument();

		expect(within(intro).getByText("퀴즈세트1")).toBeInTheDocument();
		expect(within(intro).getByText("author1")).toBeInTheDocument();
		expect(within(intro).getByText("30단어")).toBeInTheDocument();
	});

	test("퀴즈 낱말카드, 학습버튼 렌더링", () => {
		const { set } = renderComponent();

		const quizStudy = within(set).getByTestId("quiz-study");
		expect(quizStudy).toBeInTheDocument();

		expect(within(quizStudy).getByText("낱말카드")).toBeInTheDocument();
		expect(within(quizStudy).getByText("학습하기")).toBeInTheDocument();
	});

	test("퀴즈 단어 목록 렌더링", () => {
		const { set } = renderComponent();

		const wordList = within(set).getByTestId("word-list");
		expect(wordList).toBeInTheDocument();
	});
});

describe("퀴즈 데이터 렌더링", () => {
	test("퀴즈 데이터 10개 렌더링", () => {
		const { set } = renderComponent();
		const wordList = within(set).getByTestId("word-list");
		const res = within(wordList).getAllByTestId("word");
		expect(res.length).toBe(10);
	});
});

describe("퀴즈 세트 아이콘 기능", () => {
	test("뒤로가기 아이콘 클릭 시, 퀴즈세트 목록 화면으로 이동", () => {
		const navigate = useNavigate();
		const { set } = renderComponent();
		expect(set).toBeInTheDocument();

		const backBtn = within(set).getByTestId("back-icon");
		fireEvent.click(backBtn);
		expect(navigate).toHaveBeenCalledWith("/");
	});
});
