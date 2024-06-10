import { render, screen } from "@testing-library/react";
import AddMemebers from "./AddMembers";
import userEvent from "@testing-library/user-event";

const renderComponent = () => {
	render(<AddMemebers />);
	const input = screen.getByTestId("input");
	const saveButton = screen.getByText("저장");
	return { input, saveButton };
};

describe("그룹 멤버 추가 페이지", () => {
	test("그룹 멤버 입력 컴포넌트가 렌더링 되는가?", () => {
		const { input, saveButton } = renderComponent();
		expect(input).not.toBeNull();
		expect(saveButton).not.toBeNull();
	});

	test("그룹 멤버 입력하지 않고 저장 버튼 클릭 시, 에러 메시지 노출", async () => {
		const { saveButton } = renderComponent();
		await userEvent.click(saveButton);
		const errorMsg = await screen.findByText(
			"그룹 멤버들의 이름을 입력해주세요."
		);
		expect(errorMsg).toBeInTheDocument();
	});

	test("그룹 멤버 입력한 후 저장 버튼 클릭 시, 저장 성공", async () => {
		const { input, saveButton } = renderComponent();
		await userEvent.type(input, "채형 홍근 오콩");
		await userEvent.click(saveButton);
		const errorMsg = screen.queryByText("그룹 멤버들의 이름을 입력해주세요.");
		expect(errorMsg).toBeNull();
	});
});
