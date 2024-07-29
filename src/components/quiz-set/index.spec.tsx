import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import QuizSet from ".";

// QueryClient 인스턴스 생성
const queryClient = new QueryClient();

// useParams 모킹 설정
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

// 모킹된 컴포넌트
jest.mock("./info", () => () => <div>QuizSetInfo Component</div>);
jest.mock("./skeleton", () => () => <div>QuizSetSkeleton</div>);

describe("QuizSet Component", () => {
  test("renders QuizSet component with id parameter", async () => {
    require('react-router-dom').useParams.mockReturnValue({ id: "123" });

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <QuizSet />
        </MemoryRouter>
      </QueryClientProvider>
    );

    // 요소를 찾기 위해 findByTestId 사용
    const quizSetElement = await screen.findByTestId("quiz-set");
    expect(quizSetElement).toBeInTheDocument();
  });

  test("renders error when id parameter is missing", async () => {
    require('react-router-dom').useParams.mockReturnValue({ id: undefined });
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <QuizSet />
        </MemoryRouter>
      </QueryClientProvider>
    );

    // 'error' 텍스트를 찾기 위해 findByText 사용
    const errorElement = await screen.findByText("error");
    expect(errorElement).toBeInTheDocument();
  });
});
