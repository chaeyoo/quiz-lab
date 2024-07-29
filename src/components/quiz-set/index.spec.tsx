import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import QuizSet from ".";

const queryClient = new QueryClient();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

jest.mock("./info", () => () => <div>QuizSetInfo Component</div>);
jest.mock("./skeleton", () => () => <div>QuizSetSkeleton</div>);

describe("QuizSet Component Tests", () => {
  test("should render QuizSet component with correct id parameter from route", async () => {
    require("react-router-dom").useParams.mockReturnValue({ id: "123" });

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <QuizSet />
        </MemoryRouter>
      </QueryClientProvider>
    );

    const quizSetElement = await screen.findByTestId("quiz-set");
    expect(quizSetElement).toBeInTheDocument();
  });

  test("should display an error message when id parameter is missing from the route", async () => {
    require("react-router-dom").useParams.mockReturnValue({ id: undefined });
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <QuizSet />
        </MemoryRouter>
      </QueryClientProvider>
    );

    const errorElement = await screen.findByText("error");
    expect(errorElement).toBeInTheDocument();
  });
});
