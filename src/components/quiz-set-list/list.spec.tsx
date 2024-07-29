import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import List from "./list";
import { fetchQuizSets } from "../../api/quiz";
import { IQuizSet } from "../../types/quiz";

const queryClient = new QueryClient();
const renderComponent = (query: string) => {
  render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <List query={query} />
      </BrowserRouter>
    </QueryClientProvider>
  );
};
const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock("../../api/quiz", () => ({
  fetchQuizSets: jest.fn(),
}));

describe("List Component Tests", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    const mockData: IQuizSet[] = [
      {
        id: 1,
        name: "Quiz Set 1",
        created_at: "2024-07-28T00:00:00Z",
        modified_at: "2024-07-28T00:00:00Z",
        quiz: [{ word: "example", meaning: "예시", seq: 1, star: false }],
        user: { nick_name: "User1" },
      },
      {
        id: 2,
        name: "Quiz Set 2",
        created_at: "2024-07-28T00:00:00Z",
        modified_at: "2024-07-28T00:00:00Z",
        quiz: [{ word: "example", meaning: "예시", seq: 1, star: false }],
        user: { nick_name: "User1" },
      },
    ];

    (fetchQuizSets as jest.Mock).mockResolvedValue(mockData);
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test("should correctly display quiz sets with their details", async () => {
    renderComponent("");

    await waitFor(() => {
      expect(screen.getByText("Quiz Set 1")).toBeInTheDocument();
    });

    const userElements = await screen.findAllByText("User1");

    expect(userElements).toHaveLength(2);
    userElements.forEach((element) => expect(element).toBeInTheDocument());
  });

  test("should navigate to the correct URL when a quiz set is clicked", async () => {
    renderComponent("");

    await waitFor(() => {
      expect(screen.getByText("Quiz Set 1")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Quiz Set 1"));

    expect(mockedUsedNavigate).toHaveBeenCalledWith("/1");
  });

  test("should call fetchQuizSets with the updated query prop when query prop changes", async () => {
    renderComponent("test");
    await waitFor(() => {
      expect(fetchQuizSets).toHaveBeenCalledWith("test");
    });
    (fetchQuizSets as jest.Mock).mockClear();

    renderComponent("new-query");
    await waitFor(() => {
      expect(fetchQuizSets).toHaveBeenCalledWith("new-query");
    });
  });
});
