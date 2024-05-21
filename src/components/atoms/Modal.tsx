interface IModal {
	toggle: (open: boolean) => void;
	open: boolean;
}
export default function Modal(props: IModal) {
	const { toggle, open } = props;
	return (
		<div className="flex justify-center items-center fixed left-0 right-0 top-0 bottom-0 bg-gray-900 bg-opacity-40">
			<div className="w-1/2 p-2 rounded-md bg-white h-90">{"모달 내용"}
            <button className="bg-" onClick={() => toggle(!open)}>클릭</button></div>
			
		</div>
	);
}
