import { render, screen, within } from "@testing-library/react";
import { quizSets } from "../../mock/data";
import QuizSet from "./QuizSet";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: () => mockedUsedNavigate,
}));

const renderComponent = () => {
	let quizSet = quizSets[0];
	render(<QuizSet quizSet={quizSet} />);
	const set = screen.getByTestId("quiz-set");
	return { set };
};
describe("퀴즈 세트 페이지 데이터 없는 경우", () => {
	test("퀴즈 데이터 없는 경우, 안내 문구 노출", () => {
		render(<QuizSet quizSet={null} />);
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
