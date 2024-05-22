import { IoClose } from "react-icons/io5";
interface IModal {
	toggle: (open: boolean) => void;
	open: boolean;
	content: React.ReactNode;
}
export default function Modal(props: IModal) {
	const { toggle, open, content } = props;
	return (
		<div className="flex justify-center items-center fixed left-0 right-0 top-0 bottom-0 bg-gray-900 bg-opacity-40">
			<div className="flex flex-col items-end flex-shrink-0 min-w-96 w-1/2 p-2 rounded-md bg-white h-90">
				<IoClose className="hover:text-green-900" fontSize={22} onClick={() => toggle(!open)} />
				{content}
			</div>
		</div>
	);
}
