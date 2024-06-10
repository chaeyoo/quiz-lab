import { render, screen } from "@testing-library/react";
import List from "./list";

describe("퀴즈 세트 목록 페이지", () => {
	test("퀴즈 세트 데이터 없을 때, 비어있음 표시", () => {
		render(<List quizSets={[]} />);
		expect(screen.getByText(/비어/i)).toBeInTheDocument();
	});
});
