import {
	fireEvent,
	render,
	screen,
	within,
	waitFor,
} from "@testing-library/react";
import QuizSetList from "./QuizSetList";
import { getQuizSetList } from "../../remote/quizes";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import {
	collection,
	doc,
	getDocs,
	getFirestore,
	setDoc,
} from "firebase/firestore";
import { IQuizSet } from "../../types/quiz";
const {
	REACT_APP_API_KEY,
	REACT_APP_AUTH_DOMAIN,
	REACT_APP_PROJECT_ID,
	REACT_APP_STORAGE_BUCKET,
	REACT_APP_MESSAGING_SENDER_ID,
	REACT_APP_APP_ID,
	REACT_APP_MEASUREMENT_ID,
} = process.env;
// Firebase 초기화
const firebaseConfig = {
	// Firebase 프로젝트 설정 정보
	// 실제 Firestore 프로젝트 설정 정보를 여기에 넣어주세요.
	apiKey: REACT_APP_API_KEY,
	authDomain: REACT_APP_AUTH_DOMAIN,
	projectId: REACT_APP_PROJECT_ID,
	storageBucket: REACT_APP_STORAGE_BUCKET,
	messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
	appId: REACT_APP_APP_ID,
	measurementId: REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

// 모의 데이터 설정
const mockQuizSets: IQuizSet[] = [
	{
		id: 1,
		name: "Quiz Set 1",
		length: 5,
		author: "Author 1",
		createdAt: "2024-06-17",
		quizes: [],
	},
	{
		id: 2,
		name: "Quiz Set 2",
		length: 10,
		author: "Author 2",
		createdAt: "2024-06-18",
		quizes: [],
	},
];

beforeEach(async () => {
	// Firestore에 모의 데이터 삽입
	const quizSetsCollection = collection(firestore, "QUIZ");

	await Promise.all(
		mockQuizSets.map(async (quizSet) => {
			const docRef = doc(quizSetsCollection, quizSet.id.toString());
			await setDoc(docRef, quizSet);
		})
	);
});

afterEach(async () => {
	// Firestore 모의(mock) 초기화
	// 각 테스트 후 Firestore의 데이터를 초기화합니다.
	const quizSetsCollection = collection(firestore, "QUIZ");

	// 모든 문서 삭제
	const querySnapshot = await getDocs(quizSetsCollection);
	querySnapshot.forEach(async (doc) => {
		await doc.ref.delete();
	});
});

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: () => mockedUsedNavigate,
}));

const renderComponent = () => {
	render(
		<BrowserRouter>
			<QuizSetList />
		</BrowserRouter>
	);

	const input = screen.getByPlaceholderText("세트 필터링");
	const sets = screen.getByTestId("quiz-sets");
	const set = screen.getAllByTestId("set-list")[0];
	return { input, sets, set };
};

describe("퀴즈 데이터 firebase getDocs 테스트", () => {
	test("fetches quiz sets from Firestore", async () => {
		const { items, lastVisible } = await getQuizSetList();

		// 데이터 검증
		expect(items.length).toBe(mockQuizSets.length);
		expect(items[0].name).toBe(mockQuizSets[0].name);
		expect(items[1].name).toBe(mockQuizSets[1].name);

		// 특정 데이터가 UI에 나타나는지 확인
		render(<QuizSetList items={items} />);

		await waitFor(() => {
			expect(screen.getByText("Quiz Set 1")).toBeInTheDocument();
			expect(screen.getByText("Quiz Set 2")).toBeInTheDocument();
		});
	});
});
describe("퀴즈 세트 목록 페이지 데이터 없는 경우", () => {
	test("퀴즈 리스트 렌더링 목록 없는 경우 비어있음", () => {
		render(
			<BrowserRouter>
				<QuizSetList />
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
