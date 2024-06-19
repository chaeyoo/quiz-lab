import {
render,
	screen,
} from "@testing-library/react";
import QuizSetList from "./QuizSetList";
// import { getQuizSetList } from "../../remote/quizes"; //임포트 하면 에러남 TODO: Jest에서 firestore 데이터 가져오는 부분  추가
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

// describe("퀴즈 데이터 firebase getDocs 테스트", () => {
// 	test("fetches quiz sets from Firestore", async () => {
// 		const { items, lastVisible } = await getQuizSetList();
// 		console.log(items, "items");
// 		console.log(lastVisible, "lastVisible");
// 	});
// });
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

// describe("퀴즈 세트 목록 페이지 데이터 있는 경우", () => {
// 	test("퀴즈 세트 목록 컴포넌트 렌더링", () => {
// 		const { input, sets, set } = renderComponent();
// 		expect(input).not.toBeNull();
// 		expect(sets).toBeInTheDocument();

// 		expect(within(set).getByText("퀴즈세트1")).toBeInTheDocument();
// 		expect(within(set).getByText("author1")).toBeInTheDocument();
// 		expect(within(set).getByTestId("set-length")).toBeInTheDocument();
// 	});

// 	test("퀴즈 세트 클릭, useNavigate 호출", () => {
// 		const { set } = renderComponent();

// 		fireEvent.click(set);
// 		expect(mockedUsedNavigate).toHaveBeenCalled();
// 		mockedUsedNavigate.mockRestore();
// 	});

// 	test("퀴즈 세트 클릭, 링크 이동", () => {
// 		const navigate = useNavigate();
// 		const { set } = renderComponent();

// 		fireEvent.click(set);
// 		expect(navigate).toHaveBeenCalledWith("/quiz/1");
// 	});
// });
