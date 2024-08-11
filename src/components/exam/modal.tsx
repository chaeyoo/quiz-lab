import React from "react";
import ReactDOM from "react-dom";
import { modalMsg } from "./exam";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	message: modalMsg;
	correct: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, message, correct }) => {
	if (!isOpen) return null;

	const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};
	const { msg, word, mean, select } = message;
	return ReactDOM.createPortal(
		<div
			className="fixed inset-0 bg-_gray bg-opacity-70 flex justify-center items-center"
			onClick={handleOverlayClick}
		>
			<div className=" flex flex-col bg-_medium-gray rounded-lg shadow-lg max-w-sm mx-auto w-[200px]">
				<div
					className={`h-[35px] ${
						correct ? "bg-_br-green" : "bg-_br-red "
					} rounded-t-lg content-center px-2 text-xs font-semibold`}
				>
					{msg}
				</div>
				{correct && (
					<div className="h-[50px] content-center text-center">{word}</div>
				)}
				{!correct && (
					<div className="px-3 py-2">
						<div className="h-[40px] content-center text-center">{mean}</div>
						
						<div className="text-_br-green text-xs font-semibold">정답</div>
						<div className="h-[40px] text-center">{word}</div>

						<div className="text-_br-red text-xs font-semibold">
							입력하신 답
						</div>
						<div className="h-[40px] text-center">{select}</div>

						<button
							className="w-full py-2 text-xs bg-_purple text-white rounded"
							onClick={onClose}
						>
							계속하기
						</button>
					</div>
				)}
			</div>
		</div>,
		document.body
	);
};

export default Modal;
