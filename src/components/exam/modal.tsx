import React from "react";
import ReactDOM from "react-dom";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	message: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, message }) => {
	if (!isOpen) return null;

	const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		// 모달 외부 클릭 시 닫기
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return ReactDOM.createPortal(
		<div
			className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center"
			onClick={handleOverlayClick}
		>
			<div className=" flex  flex-col bg-_medium-gray p-6 rounded-lg shadow-lg max-w-sm mx-auto">
				<p className="text-lg">{message}</p>
				<button
					className="mt-4 px-4 py-2 bg-_purple text-white rounded"
					onClick={onClose}
				>
					계속하기
				</button>
			</div>
		</div>,
		document.body
	);
};

export default Modal;
