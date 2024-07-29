import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import QuizSetInfo from "./info";
import { IQuizSet } from "../../types/quiz";
import useQuizSet from "../../hooks/useQuizSet";
import { useNavigate } from "react-router-dom";

jest.mock("../../hooks/useQuizSet", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("QuizSetInfo Component", () => {
  test("returns null when data is not available", () => {
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

  test("renders quiz set info when data is available", async () => {
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

  test("calls navigate when back icon is clicked", () => {
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
});
