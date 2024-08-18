import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Quizes from "./quizes";
import * as quizStoreModule from "../../store/useQuizStore";
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: () => mockNavigate,
}));

jest.mock("../../store/useQuizStore", () => ({
	useCardStore: jest.fn(),
}));

const mockedUseCardStore = quizStoreModule.useCardStore as jest.MockedFunction<
	typeof quizStoreModule.useCardStore
>;

const mockQuizes = [
	{ word: "apple", meaning: "사과", seq: 1, star: false },
	{ word: "banana", meaning: "바나나", seq: 2, star: false },
	{ word: "cherry", meaning: "체리", seq: 3, star: false },
	{ word: "date", meaning: "대추", seq: 4, star: false },
];

describe("Quizes Component", () => {
	const mockAdd = jest.fn();
	const mockUpKnown = jest.fn();
	const mockUpIng = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		mockedUseCardStore.mockImplementation((selector) =>
			selector({
				quiz: [],
				known: 0,
				ing: 0,
				add: mockAdd,
				upKnown: mockUpKnown,
				upIng: mockUpIng,
			} as any)
		);
	});

	test("renders quizes component correctly", () => {
		render(
			<BrowserRouter>
				<Quizes id={1} quizes={mockQuizes} />
			</BrowserRouter>
		);

		expect(screen.getByTestId("header")).toBeInTheDocument();
		expect(screen.getByText("1/4")).toBeInTheDocument();
		expect(screen.getByText("apple")).toBeInTheDocument();
	});

	test("navigates to result page after last card", async () => {
		render(
			<BrowserRouter>
				<Quizes id={1} quizes={mockQuizes} />
			</BrowserRouter>
		);

		const card = screen.getByText("apple");

		for (let i = 0; i < mockQuizes.length; i++) {
			fireEvent.touchStart(card, { touches: [{ clientX: 500 }] });
			fireEvent.touchEnd(card, { changedTouches: [{ clientX: 0 }] });
		}

		await act(async () => {
			await new Promise((resolve) => setTimeout(resolve, 600));
		});

		expect(mockNavigate).toHaveBeenCalledWith("/1/card/result");
	});

	test("updates progress bar", () => {
		render(
			<BrowserRouter>
				<Quizes id={1} quizes={mockQuizes} />
			</BrowserRouter>
		);

		const progressBar = screen.getByTestId("progress-bar");
		expect(progressBar).toHaveStyle("width: 0%");

		const card = screen.getByText("apple");
		fireEvent.touchStart(card, { touches: [{ clientX: 500 }] });
		fireEvent.touchEnd(card, { changedTouches: [{ clientX: 0 }] });

		expect(progressBar).toHaveStyle("width: 25%");
	});
});
