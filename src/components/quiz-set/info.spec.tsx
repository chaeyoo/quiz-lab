import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import QuizSetInfo from "./info";
import { IQuizSet } from "../../types/quiz";
import useQuizSet from "../../hooks/useQuizSet";
import { useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import NoDataInteractive from "../no-data";
const queryClient = new QueryClient();
jest.mock("../../hooks/useQuizSet", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const renderComponent = (id: number, quizSet: IQuizSet) => {
  render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <QuizSetInfo id={id} />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe("QuizSetInfo Component Tests", () => {
  test("should render nothing when quiz set data is not available", () => {
    (useQuizSet as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <QuizSetInfo id={123} />
      </MemoryRouter>
    );

    expect(screen.queryByTestId("header")).toBeNull();
  });

  test("should display quiz set information when data is successfully fetched", async () => {
    const mockQuizSet: IQuizSet = {
      name: "Sample Quiz Set",
      user: { nick_name: "User1" },
      quiz: [
        { seq: 1, word: "word1", meaning: "meaning1", star: true },
        { seq: 2, word: "word2", meaning: "meaning2", star: false },
      ],
      created_at: "2024-07-28T00:00",
      modified_at: "2024-07-28T00:00",
      id: 1,
    };

    (useQuizSet as jest.Mock).mockReturnValue({
      data: [mockQuizSet],
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <QuizSetInfo id={1} />
      </MemoryRouter>
    );

    expect(await screen.findByText("Sample Quiz Set")).toBeInTheDocument();
    expect(screen.getByText("User1")).toBeInTheDocument();
    expect(screen.getByText("2 단어")).toBeInTheDocument();
    expect(screen.getByText("word1")).toBeInTheDocument();
    expect(screen.getByText("meaning1")).toBeInTheDocument();
    expect(screen.getByText("word2")).toBeInTheDocument();
    expect(screen.getByText("meaning2")).toBeInTheDocument();
  });

  test("should navigate to the home page when the back icon is clicked", () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    const mockQuizSet: IQuizSet = {
      name: "Sample Quiz Set",
      user: { nick_name: "User1" },
      created_at: "2024-07-28T00:00",
      modified_at: "2024-07-28T00:00",
      id: 1,
      quiz: [],
    };

    (useQuizSet as jest.Mock).mockReturnValue({
      data: [mockQuizSet],
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <QuizSetInfo id={1} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId("back-icon"));
    expect(mockNavigate).toHaveBeenCalledWith(`/`);
  });

  test("should render NoDataInteractive when quizSet.quiz is empty", async () => {
    const mockQuizSet: IQuizSet = {
      id: 1,
      name: "Sample Quiz Set",
      user: { nick_name: "User1" },
      quiz: [],
      created_at: "2024-07-28T00:00:00Z",
      modified_at: "2024-07-28T00:00:00Z",
    };

    (useQuizSet as jest.Mock).mockReturnValue({
      data: [mockQuizSet],
      isLoading: false,
      error: null,
    });

    renderComponent(1, mockQuizSet);
    expect(screen.getByText("비어 있음")).toBeInTheDocument();
  });

  test("should not render NoDataInteractive when quizSet.quiz has data", async () => {
    const mockQuizSet: IQuizSet = {
      id: 1,
      name: "Sample Quiz Set",
      user: { nick_name: "User1" },
      quiz: [{ seq: 1, word: "word1", meaning: "meaning1", star: true }],
      created_at: "2024-07-28T00:00:00Z",
      modified_at: "2024-07-28T00:00:00Z",
    };

    (useQuizSet as jest.Mock).mockReturnValue({
      data: [mockQuizSet],
      isLoading: false,
      error: null,
    });

    renderComponent(1, mockQuizSet);
    expect(screen.queryByText("비어 있음")).toBeNull();
  });
});
