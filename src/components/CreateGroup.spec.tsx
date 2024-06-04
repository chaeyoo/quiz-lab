import { render, screen } from "@testing-library/react";
import { CreateGroup } from "./CreateGroup";
import userEvent from "@testing-library/user-event";

// 실패하는 테스트 케이스 만들기
const renderComponent = () => {
	render(<CreateGroup />);
	const input = screen.getByPlaceholderText("2022 제주도 여행");
	const saveButton = screen.getByText("저장");
	const errorMessage = screen.queryByText("그룹 이름을 입력해주세요.");
	return { input, saveButton, errorMessage };
};
describe("그룹 생성 페이지", () => {
	test("그룹 이름 입력 컴포넌트 렌더링 되는가", () => {
		const { input, saveButton } = renderComponent();

		// todo: input component
		expect(input).not.toBeNull();
		// todo: save button
		expect(saveButton).not.toBeNull();
	});

	test('그룹 이름을 입력하지 않고 "저장" 버튼 클릭 시, 에러 메시지 노출', async () => {
		const { saveButton, errorMessage } = renderComponent();
		await userEvent.click(saveButton);
		expect(errorMessage).not.toBeNull();
	});

	test('그룹 이름을 입력 후, "저장" 버튼을 클릭 시, 저장 성공', async () => {
		const { input, saveButton, errorMessage } = renderComponent();

		await userEvent.type(input, "예시 그룹명");
		await userEvent.click(saveButton);

		expect(errorMessage).toBeNull();
	});
});
